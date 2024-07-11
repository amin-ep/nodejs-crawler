import { Request, Response } from 'express';
import Website from '../models/Website';

export const getAllWebsites = async (req: Request, res: Response) => {
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
};

export const deleteAllWebsites = async (req: Request, res: Response) => {
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
};

export const getWebsitesPerCity = async (req: Request, res: Response) => {
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
};

export const getWebsitesByStarRating = async (req: Request, res: Response) => {
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
};
