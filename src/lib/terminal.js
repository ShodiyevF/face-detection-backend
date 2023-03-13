const { error } = require('../config/error.names');
const { uniqRow } = require('./pg');

const request = require('request')

async function requestToTerminal(domain, route, method, body, callback) {    
    var options = {
        uri: domain+route,
        auth: {
            user: 'admin',
            pass: 'pok4747Z',
            sendImmediately: false
        },
        method: method,
        body: JSON.stringify(body)
    };
    
    request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            result = JSON.parse(body)
            return callback(result, false);
        } else {            
            return callback(null, error);;
        }
    });
    
}


async function terminalValidationMiddleware(req, res, next) {
    try {
        const controller = await uniqRow(`select * from controllers where branch_id = $1`, req.body.branch_id)
        
        if (!controller.rows.length) {
            return res.status(300).json({
                status: 300,
                error: error.CONTROLLER_NOT_FOUND,
                message: 'Bu filialda controller topilmadi !',
            });
        }
        
        const requestBody = {
            "AcsEventTotalNumCond":{
                "major": 5,
                "minor": 75
            }
        }
        
        await requestToTerminal(controller.rows[0].controller_url, '/ISAPI/AccessControl/AcsEventTotalNum?format=json', 'POST', requestBody,function(data, err){    
            if (!data) {
                console.log('asdasd');
                return res.status(300).json({
                    status: 300,
                    error: error.CONTROLLER_OFFLINE,
                    message: 'Controller offline holda !, iltimos controller linkini tekshiring',
                });
            } else {
                next()
            }
        })
    } catch (error) {
        next(error);
    }
};
// async function terminalValidationMiddleware(branch_id) {    
//     try {

//     } catch (errorr) {
//         console.log(errorr);
//         if (errorr.message == 'Bad request, answer is empty') {
//             return {
//                 action: true,
//                 status: 300,
//                 error: error.CONTROLLER_OFFLINE,
//                 message: 'Controller offline holda !',
//             };
//         }
//     }
// };

module.exports = {
    requestToTerminal,
    terminalValidationMiddleware
}