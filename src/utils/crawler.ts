import { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import * as cheerio from 'cheerio';
import IWebsite from '../interfaces/IWebsite';
import Website from '../models/Website';

async function fetchWebsite(query: number) {
  const url: string = `https://enamad.ir/DomainListForMIMT/Index/${query}`;
  const response: AxiosResponse = await axios.get(url);
  const html: string = await response.data;
  return cheerio.load(html);
}

export default async function crawlWebsite(req: Request, res: Response) {
  try {
    for (let i: number = 2; i <= 4; i++) {
      const $ = await fetchWebsite(i);
      for (let r = 1; r <= 30; r++) {
        const rows = $(`div#Div_Content > div:nth-child(${r})`);
        rows.each((i, el) => {
          (async () => {
            const name: string = $(el)
              .find(`div.col-sm-12.col-md-3`)
              .text()
              .trim();
            const domain: string = $(el)
              .find('div:nth-child(2)')
              .first()
              .text()
              .trim();
            const city: string = $(el).find('div:nth-child(5)').text().trim();
            const starRating: number = $(el).find(
              'div:nth-child(6) img'
            ).length;
            const expirationDate: string = $(el)
              .find('div:nth-child(8)')
              .text()
              .trim();

            const websiteData: IWebsite = {
              name,
              domain,
              starRating,
              expirationDate,
              city,
            };

            const allData = await Website.find();
            const checkDomainAdded = allData.findIndex(
              el => el.domain == domain
            );

            // also we can do this:
            // const checkDomain = await Website.findOne({ domain: domain });

            if (checkDomainAdded < 0) {
              await Website.create(websiteData);
            } else {
              console.log(`domain ${domain} is added!`);
            }
          })();
        });
      }
    }
    res.status(201).json({
      status: 'success',
      message: 'Data added successfully',
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'cannot add data. something went wrong!',
    });
  }
}
