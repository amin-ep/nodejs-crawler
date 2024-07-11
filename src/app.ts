import express, { Express, Request, Response } from 'express';
import { createCsv } from './utils/csvWriter';
import { graphqlHTTP } from 'express-graphql';
import schema from './graphql/schema';
import resolver from './graphql/resolver';
import Website from './models/Website';
import crawl from './utils/crawler';
import path from 'path';
import fs from 'fs';
import { DownloaderHelper } from 'node-downloader-helper';

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
app
  .route('/websites')
  .get(async (req: Request, res: Response) => {
    try {
      const websites = await Website.find();

      res.status(200).json({
        status: 'success',
        result: websites.length,
        data: {
          websites,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'something went wrong!',
      });
    }
  })
  // DELETE ALL WEBSITES
  .delete(async (req: Request, res: Response) => {
    try {
      await Website.deleteMany();

      res.status(204).json({
        status: 'error',
        data: null,
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: 'something went wrong',
        err,
      });
    }
  });

// CREATING CSV FILE
app.get('/export-csv', async (req: Request, res: Response) => {
  try {
    const filter = req.query.fields as string;
    await createCsv(filter.split(','));
    res.status(200).json({
      status: 'downloaded',
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "download failed!"
    })
  }
});

app.get('/star', async (req: Request, res: Response) => {
  try {
    const stats = await Website.aggregate([
      {
        $group: {
          _id: '$starRating',
          numWebsites: {
            $sum: 1,
          },
          data: {
            $push: '$$ROOT',
          },
        },
      },
      {
        $addFields: {
          starRating: '$_id',
        },
      },
      {
        $project: {
          _id: 0,
          'data.__v': 0,
        },
      },
    ]);
    res.status(200).json({
      data: {
        stats,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.get('/city', async (req, res) => {
  try {
    const stats = await Website.aggregate([
      {
        $group: {
          _id: '$city',
          count: {
            $sum: 1,
          },
          data: {
            $push: '$$ROOT',
          },
        },
      },
      {
        $addFields: {
          city: '$_id',
        },
      },
      {
        $project: {
          _id: 0,
          'data.__v': 0,
        },
      },
    ]);
    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'something went wrong!',
    });
  }
});

export default app;
