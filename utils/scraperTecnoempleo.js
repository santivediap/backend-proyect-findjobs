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
        
        await page.waitForTimeout(2000);

        // Esperamos al input de busqueda
        let searchText = await page.waitForXPath(`//*[@id="te"]`);
        await searchText.type("puppeteer");
      
        await page.waitForXPath(`//*[@class="btn btn-warning btn-block mb-3 font-weight-medium"]`, {
          visible: true,
        });
      
        const [search] = await page.$x(`//*[@class="btn btn-warning btn-block mb-3 font-weight-medium"]`);
        if (search) {
          await search.click();
        }

        await page.waitForSelector(".bg-white.col-12.col-sm-12.col-md-12.col-lg-9 > .p-2.border-bottom.py-3.bg-white > .row.fs--15 > .col-10.col-md-9.col-lg-7 > h3 > a")

        const tmpurls = await page.$$eval(".bg-white.col-12.col-sm-12.col-md-12.col-lg-9 > .p-2.border-bottom.py-3.bg-white > .row.fs--15 > .col-10.col-md-9.col-lg-7 > h3 > a", data => data.map(a=>a.href))

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

        const jobSpecificData = page.$$eval(".list-unstyled.mb-0.fs--15 > .list-item.clearfix.border-bottom.py-2", data => {
            let offerData = {}

            for(let i = 0; i < data.length; i++) {
                let fixedData = data[i].innerText.split("\n")
                offerData[fixedData[1]] = fixedData[0]
            }

            return offerData
        })

        const jobDescriptionData = page.$eval(".fs--16.text-gray-800", data => {
            let offerData = {}

            offerData["Description"] = data.innerText

            return offerData
        })

        const jobTitleData = page.$eval(".h3.h5-xs.mb-2", data => {
            let offerData = {}

            offerData["Title"] = data.innerText

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