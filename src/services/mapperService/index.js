const helper = global.helper;
const config = helper.config;
const utilites = require('../../utilities');
const safePromise = utilites.safePromise;
const logger = utilites.logger;
const knex = require('../../../models/knex').knexConn;
const log = logger('welcome.service');



function mapperService(body) {
    return new Promise(async function (resolve, reject) {
        const { name, age, email,gender, phone, ...restBody } = body;
        const [insertErr, success] = await safePromise(knex.insert({
            name: name,
            age: age,
            email: email,
            gender: gender,
            phone: phone
        }).table('userTable'))
        if (insertErr) {
            return reject("could not insert data please try again")
        }
        const keys = Object.keys(restBody);
        let restRows = []
        keys.forEach(function (key) {
            const value = restBody[key];
            const obj = {
                user_id: success[0],
                item_name: key,
                item_value: value
            }
            restRows.push(obj);
        })
        const [err, response] = await safePromise(knex('userInfo').insert(restRows))
        if(err){
            return reject("something went wrong")
        }
        resolve("data inserted successfully")
    })
}

module.exports = mapperService;