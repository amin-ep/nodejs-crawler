import { createObjectCsvWriter } from 'csv-writer';
import Website from '../models/Website';

export const createCsv = async (filter: string[]) => {
  const fileName: string = 'public/websites.csv';
  const data = await Website.find().select(filter.join(' '));
  const header = filter.map(field => ({
    id: field,
    title: field.charAt(0).toUpperCase() + field.slice(1),
  }));
  const csvWriter = await createObjectCsvWriter({
    path: fileName,
    encoding: 'utf-8',
    header: header,
  });

  await csvWriter.writeRecords(data.map(web => web.toObject()));
  return fileName;
};
