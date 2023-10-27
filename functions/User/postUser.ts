const bodyParser = require('../../helpers/bodyParser');
const checkValidationForData = require('../../helpers/checkValidationForData');
const db = require('../../db');

const postUser = (req:Request, res:Response) => {
    bodyParser(req)
        .then(<T>(resp:T) => {
            const { name, login, password } = resp;
            if(checkValidationForData(name, login, password)) {
                db  
                    .query(`
                        insert into Users(name, login, password) values($1, $2, $3);
                    `, [name, login, password])
                    .then(() => {
                        res.writeHeader(202);
                        res.write(JSON.stringify({
                            message: 'User created',
                        }));
                        res.end();
                    });
            } else {
                res.writeHeader(400);
                res.write(JSON.stringify({
                    message: 'Not valid data',
                }));
                res.end();
            };
        })
        .catch((err:Error) => {
            res.writeHeader(500);
            res.write(JSON.stringify(err));
            res.end();
        });
};

module.exports = postUser;