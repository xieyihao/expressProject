import express from "express";
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('example', { title: 'Express' });
});

export default router;
// module.exports = router;
