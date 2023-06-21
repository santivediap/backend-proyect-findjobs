const puppeteer = require("puppeteer");

const scrapOfferData = async (url) => {

    try {

        const scrapedData = []

        // Arrancamos pupeteer
        const browser = await puppeteer.launch({
          headless: true,
          defaultViewport: null,
          args: ["--start-maximized"],
        });

        // Abrimos nueva pagina
        const page = await browser.newPage();

        // Vamos al link
        await page.goto(url, {
          waitUntil: "networkidle2",
        });

        // await page.waitForTimeout(2000);

        // Esperamos al input de busqueda
        let searchText = await page.waitForSelector('input[placeholder="Profesión, empresa, palabra clave"] ');
        await searchText.type("FullStack");

        await page.waitForSelector('.cc-nb-okagree')
        .then(selector => {
            selector.click();
        })

        // let submit = await page.$eval('input[type="submit"]', search => {
        //     search.click()
        // })
      
        await page.waitForSelector('input[type="submit"]')
        .then(selector => {
            selector.click();
        })

        await page.waitForSelector(".btn.btn-info.btn-sm.btn-block.mb-3")

        const tmpurls = await page.$$eval(".btn.btn-info.btn-sm.btn-block.mb-3", data => data.map(a=>a.href))

        //Quitamos los duplicados
        const urls = await tmpurls.filter((link,index) =>{ return tmpurls.indexOf(link) === index})
    
        console.log("url capuradas",urls)
        // Me quedo con los 20 primeros productos, porque sino es muy largo
        const urls2 = urls.slice(0, 5);
    
        // Filtramos los productos
        // Extraemos el dato de cada producto
        // await extractProductData(urls2[productLink],browser)
    
        console.log(`${urls2.length} links encontrados`);
    
        // Iteramos el array de urls con un bucle for/in y ejecutamos la promesa extractProductData por cada link en el array. Luego pusheamos el resultado a scraped data
        for(productLink in urls2){
            const product = await extractProductData(urls2[productLink],browser)
            scrapedData.push(product)
        }
        
        console.log("scrapedData", "Lo que devuelve mi función scraper", scrapedData.length) 
        
        // cerramos el browser con el método browser.close
        await browser.close()
        // Devolvemos el array con los productos

        return scrapedData
    
    } catch (err) {
        console.log(err);
    }


  };

// Creamos una función para extraer la información de cada producto
const extractProductData = async (url,browser) => {

    try {

        // Abrimos una nueva pestaña
        const page = await browser.newPage()
        // Accedemos al link de cada producto que nos llega por parámetros
        await page.goto(url)

        const jobSpecificData = page.$$eval(".col-xs-6.col-md-4.mb-4", data => {
            let offerData = {}

            for(let i = 0; i < data.length; i++) {
                let fixedData = data[i].innerText.split("\n")

                switch (fixedData[0]) {
                    case "Experiencia mínima":
                        offerData["Experiencia"] = fixedData[1]
                        break;

                    case "Tipo de contrato":
                        offerData[fixedData[0]] = fixedData[1]
                        break;

                    case "Jornada laboral":
                        offerData[fixedData[0]] = fixedData[1]
                        break;

                    case "Salario":
                        offerData[fixedData[0]] = fixedData[1]
                        break;
                }
            }

            return offerData
        })

        const jobDescriptionData = page.$eval(".careerfy-content-with-more", data => {
            let offerData = {}

            offerData["Descripción"] = data.innerText

            return offerData
        })

        const jobTitleData = page.$eval(".font-weight-bold", data => {
            let offerData = {}

            offerData["Título"] = data.innerText

            return offerData
        })

        const jobLocationData = page.$eval(".careerfy-jobdetail-options.pl-0.mt-2 > li > a", data => {
            let offerData = {}

            offerData["Ubicación"] = data.innerText.trim()

            return offerData
        })

        const jobCompanyNameData = page.$eval("a[style='color: #f16421']", data => {
            let offerData = {}

            offerData["Empresa"] = data.innerText.trim()

            return offerData
        })
        
        return jobSpecificData.then(specificData => {
            return jobDescriptionData.then(descriptionData => {
                return jobTitleData.then(titleData => {
                    return jobLocationData.then(locationData => {
                        return jobCompanyNameData.then(companyNameData => {
                            return Object.assign({}, titleData, companyNameData, locationData, specificData, descriptionData)
                        })
                    })
                })
            })
        }) // Devuelve los datos de un producto
    }
    catch(err){
        // Devolvemos el error 
       return {error:err}
    }
}

exports.scrapOfferData = scrapOfferData;