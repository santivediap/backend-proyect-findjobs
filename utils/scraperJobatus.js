const puppeteer = require("puppeteer");

const scrapOfferData = async (url) => {

    try {

        const scrapedData = []

        // Arrancamos pupeteer
        const browser = await puppeteer.launch({
          headless: false,
          defaultViewport: null,
          args: ["--start-maximized"],
        });

        // Abrimos nueva pagina
        const page = await browser.newPage();

        // Vamos al link
        await page.goto(url, {
          waitUntil: "networkidle2",
        });

        const jobOffer = await page.$(".result.mt-2 > .row > .col-md-12 > .jobtitle > a.out")

        if(jobOffer == null) {
            await browser.close()
            return null
        } else {
            await page.waitForSelector(".result.mt-2 > .row > .col-md-12 > .jobtitle > a.out")

        const tmpurls = await page.$$eval(".result.mt-2 > .row > .col-md-12 > .jobtitle > a.out", data => data.map(a=>a.href))

        //Quitamos los duplicados
        const urls = await tmpurls.filter((link,index) =>{ return tmpurls.indexOf(link) === index})
    
        console.log("url capuradas",urls)
        // Me quedo con los 20 primeros productos, porque sino es muy largo
        const urls2 = urls.slice(0, 6);
    
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
        }
    
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

        const jobSpecificData = page.$$eval(".detail_block", data => {
            let offerData = {}

            for(let i = 0; i < data.length; i++) {
                let fixedData = data[i].innerText.split("\n")

                switch (fixedData[0]) {
                    case "Empresa":
                        offerData["companyName"] = fixedData[1]
                        break;

                    case "Localidad":
                        offerData["location"] = fixedData[1]
                        break;

                    case "Tipo de Contrato":
                        offerData["contract_type"] = fixedData[1]
                        break;

                    case "Salario":
                        offerData["salary"] = fixedData[1]
                        break;
                }
            }

            const {companyName, location, contract_type, salary} = offerData

            const finalData = {location, companyName, contract_type, salary}

            return finalData
        })

        const jobDescriptionData = page.$eval("#description_body", data => {
            let offerData = {}

            offerData["description"] = data.innerText

            return offerData
        })

        const jobTitleData = page.$eval("#offer_title", data => {
            let offerData = {}

            offerData["title"] = data.innerText

            return offerData
        })
        
        return jobSpecificData.then(specificData => {
            return jobDescriptionData.then(descriptionData => {
                return jobTitleData.then(titleData => {
                    return Object.assign({}, titleData, specificData, descriptionData)
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