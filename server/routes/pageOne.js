import express from "express";
import serverConfig from "../../bin/config";
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('pageOne', { title: serverConfig.appName });
});

export default router;
