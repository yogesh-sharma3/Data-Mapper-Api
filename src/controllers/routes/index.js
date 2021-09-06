const helper  = global.helper;
const express = helper.module.express;
const router  = express.Router();

router.use('/',require(`./welcome`));
router.use('/',require(`./mapper`));
//Write a loader here to avoid adding manual routes.

//index route
router.get('/', (req, res) => {
  res.json({
    ok: 'ok'
  });
});

module.exports = router;