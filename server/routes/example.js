import express from "express";
import serverConfig from "../../bin/config";
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('example', { title: serverConfig.appName });
});

export default router;
// module.exports = router;
