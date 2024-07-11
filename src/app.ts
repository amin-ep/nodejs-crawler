import express, { Express, Request, Response } from 'express';
import { createCsv } from './utils/csvWriter';
import { graphqlHTTP } from 'express-graphql';
import schema from './graphql/schema';
import resolver from './graphql/resolver';
import Website from './models/Website';
import crawl from './utils/crawler';
import {
  deleteAllWebsites,
  getAllWebsites,
  getWebsitesByStarRating,
  getWebsitesPerCity,
} from './controller/controller';

const app: Express = express();

// GRAPHQL

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
  })
);

// CRAWLING ENAMAD AND ADDING TO DATABASE

app.post('/crawl', crawl);

// GET ALL WEBSITES
app.route('/websites').get(getAllWebsites).delete(deleteAllWebsites);

// CREATING CSV FILE
app.get('/export-csv', async (req: Request, res: Response) => {
  try {
    const filter = req.query.fields as string;
    const file = await createCsv(filter.split(','));
    res.status(200).send(file);
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'download failed!',
    });
  }
});

// GET WEBSITES GROUPED BY STARRATING
app.get('/star', getWebsitesByStarRating);
// GET WEBSITES PER CITY
app.get('/city', getWebsitesPerCity);

export default app;
