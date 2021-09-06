const helper = global.helper;
const express = helper.module.express;
const router = express.Router();
const middlewares = require('../../../middlewares');
const services = require('../../../services');
const rules = require('../../../../rules');
const utilites = require('../../../utilities')
const mapperService = require('../../../services/mapperService')
const safePromise = utilites.safePromise;
const welcome = services.welcome;


router.post('/mapdata', async function (req, res) {
    const body = req.body;
    const [err,result] = await safePromise(mapperService(body))
    if (err) {
        return res.status(500).json({
            message:err
        });
    }
    res.json({
        message:result,
    })
});
module.exports = router;