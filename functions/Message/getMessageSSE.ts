import { EventEmitter } from "stream";
const db = require('../../db');

const getMessageSSE = (req:Request, res:Response, MessagesEvents:EventEmitter) => {
    res.writeHeader(200, {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache',
    });

    MessagesEvents.on('newMessage', () => {
        db
            .query(`
                select message, user_name from Messages order by id desc;
            `)
            .then(<T>(resp:T) => {
                res.write(`data: ${JSON.stringify(resp.rows[0])} \n\n`);
            })
            .catch((err:Error) => {
                res.write(`error: ${JSON.stringify(err)} \n\n`);
            });
    });
};

module.exports = getMessageSSE;