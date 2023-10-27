import { EventEmitter } from "stream";
const db = require('../../db');
const bodyParser = require('../../helpers/bodyParser');
const checkValidationForData = require('../../helpers/checkValidationForData');

const postNewMessage = (req:Request, res:Response, MessagesEvents:EventEmitter) => {
    bodyParser(req)
        .then(<T>(resp:T) => {
            const { message, user_name } = resp;
            if(checkValidationForData(message, user_name)) {
                db
                    .query(`
                        insert into Messages(message, user_name) values($1, $2);
                    `, [message, user_name])
                    .then(() => {
                        res.writeHeader(202);
                        res.write(JSON.stringify({
                            message: 'Add new message'
                        }));
                        res.end();
                        MessagesEvents.emit('newMessage');
                    })
                    .catch((err: Error) => {
                        res.writeHeader(500);
                        res.write(`Error: ${err}`);
                        res.end();
                    });
            } else {
                res.writeHeader(400);
                res.write('Not all data is transferred to the server');
                res.end();
            };
        });
};

module.exports = postNewMessage;