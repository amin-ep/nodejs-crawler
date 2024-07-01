import axios, { AxiosResponse } from 'axios';
import * as cheerio from 'cheerio';
import IWebsite from './interfaces/IWebsite'
import Website from './models/Website';

// Refactor me
export default async function crawlWebsite() {
  try {
    for (let pageIndex: number = 2; pageIndex <= 4; pageIndex++) {
      const url: string = `https://enamad.ir/DomainListForMIMT/Index/${pageIndex}`;
      const response: AxiosResponse = await axios.get(url);
      const html = await response.data;
      const $ = cheerio.load(html);
      for (let rowIndex = 1; rowIndex <= 30; rowIndex++) {
        const rows = $(`div#Div_Content > div:nth-child(${rowIndex})`);
        rows.each((i, el) => {
          (async () => {
            const name: string = $(el)
              .find(`div.col-sm-12.col-md-3`)
              .text()
              .trim();
            const domain: string = $(el)
              .find('div:nth-child(2)')
              .first()
              .text().trim();
            const province: string = $(el).find('div:nth-child(5)').text().trim();
            const stars: number = $(el)
              .find('div:nth-child(6) img')
              .length;
            const expirationDate: string = $(el).find('div:nth-child(8)').text().trim();

            const websiteData: IWebsite = {
              name, domain, stars, expirationDate, province
            }

            const checkDataExists = await Website.find();
            if (checkDataExists.length >= 90) {
              console.log(`domain ${domain} is added!`)
            } else {
              await Website.create(websiteData);
            }
          })();
        });
      }
    }
  } catch (err) {
    console.error(err);
  }
}
