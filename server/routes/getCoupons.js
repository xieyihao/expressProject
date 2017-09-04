/**
 * @desc 领取优惠券
 */

import express from "express";
import serverConfig from "../../bin/config";
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('GetCoupons', { title: serverConfig.appName });
});

export default router;
