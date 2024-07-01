import express, { Express, Request, Response } from 'express';
import crawlWebsite from './crawler';
const app: Express = express();

app.get('/crawl', async (req: Request, res: Response) => {
  await crawlWebsite();
  res.send('requested');
});

export default app;
