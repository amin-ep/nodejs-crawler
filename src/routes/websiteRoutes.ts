import express, { Router } from 'express';
import { getAllWebsites, getWebsitesPerCityStats } from '../controller/websiteController';
const router: Router = express.Router()

router.route('/').get(getAllWebsites)
router.route('/website-stats').get(getWebsitesPerCityStats)

export default router;