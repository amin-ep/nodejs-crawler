import { Request, Response } from 'express';
import Website from '../models/Website';

export const getAllWebsites = async (req: Request, res: Response) => {
    try {
        const websites = await Website.find();

        res.status(200).json({
            status: 'success',
            result: websites.length,
            data: {
                websites
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: "something went wrong!"
        })
    }
}

export const getWebsitesPerCityStats = async (req: Request, res: Response) => {
    try {
        const stats = await Website.aggregate([
            {
                $group: {
                    _id: '$province',
                    numWebsites: { $sum: 1 },
                    avgStars: { $avg: '$stars' },
                }
            }
        ])
        res.status(200).json({
            status: 'success',
            data: {
                stats
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: "something went wrong!"
        });
    }
}
