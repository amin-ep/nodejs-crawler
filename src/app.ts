import express, { Express, Request, Response } from 'express';
import crawlWebsite from './crawler';
import websiteRouter from './routes/websiteRoutes'
const app: Express = express();

app.get('/crawl', async (req: Request, res: Response) => {
  await crawlWebsite();
  res.status(201).json({
    status: 'success',
    message: 'data added successfully!'
  })
});

app.use('/api/v1/websites', websiteRouter)

export default app;
