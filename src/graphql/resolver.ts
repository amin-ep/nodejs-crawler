import Website from '../models/Website';
import { CityStats } from '../interfaces/IWebsite';

const resolver = {
  getWebsitesPerCity: async () => {
    try {
      return await Website.aggregate<CityStats>([
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
    } catch (err) {
      throw new Error('Error');
    }
  },

  getWebsiteGroupedByStar: async () => {
    try {
      return await Website.aggregate([
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
    } catch (err) {
      console.log(err);
    }
  },
};

export default resolver;
