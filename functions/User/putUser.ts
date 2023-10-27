const bodyParser = require('../../helpers/bodyParser');
const checkValidationForData = require('../../helpers/checkValidationForData');
const db = require('../../db');

const putUser = (req:Request, res:Response, id:string) => {
    bodyParser(req)
        .then(<T>(resp:T) => {
            const { name, login, password } = resp;
                if(checkValidationForData(name, login, password)) {
                    db
                        .query(`
                            update Users set name = $1, login = $2, password = $3 where id = $4
                        `, [name, login, password, Number(id)])
                        .then(<U>(resp:U) => {
                            res.writeHeader(200);
                            res.write(`User with id: ${id} updated`);
                            res.end();
                        });
                } else throw new Error('Not valid data');
        })
        .catch((err:Error) => {
            res.writeHeader(404);
            res.write(JSON.stringify(err));
            res.end();
        });
};

module.exports = putUser