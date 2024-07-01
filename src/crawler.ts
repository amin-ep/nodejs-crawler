import axios, { AxiosResponse } from 'axios';
import * as cheerio from 'cheerio';

// Refactor me
export default async function crawlWebsite() {
  try {
    for (let pageIndex: number = 2; pageIndex <= 4; pageIndex++) {
      const url: string = `https://enamad.ir/DomainListForMIMT/Index/${pageIndex}`;
      const res: AxiosResponse = await axios.get(url);
      const html = await res.data;
      const $ = cheerio.load(html);
      for (let rowIndex = 1; rowIndex <= 30; rowIndex++) {
        const rows = $(`div#Div_Content > div:nth-child(${rowIndex})`);
        rows.each((i, el) => {
          (async () => {
            const name: string = $(el)
              .find('div.col-sm-12.col-md-3')
              .text()
              .trim();
            const domain: string = $(el)
              .find('col-sm-12 col-md-2')
              .first()
              .text();
            const stars: number = $(el)
              .find('col-sm-12 col-md-2')
              .children('img').length;
            console.log('name:', name);
            console.log('domain:', domain);
            console.log('stars:', stars);
          })();
        });
      }
    }
  } catch (err) {
    console.error(err, '💣');
  }
}

// province: document.querySelector("#Div_Content > div:nth-child(1) > div:nth-child(4)")
// name: document.querySelector("#Div_Content > div:nth-child(2) > div.col-sm-12.col-md-3")
