const bodyParser = require('../../helpers/bodyParser');
const db = require('../../db');

const checkUser = (req:Request, res:Response) => {
    bodyParser(req)
        .then(<T>(resp:T) => {
            const { login, password } = resp;
            db
                .query(`
                    select * from Users where login = $1 and password = $2;
                `, [login, password])
                .then(<U>(resp:U) => {
                    if(resp.rows.length !== 0) {
                        res.writeHeader(200);
                        res.write(JSON.stringify({
                            message: 'User authorized',
                            data: resp.rows[0],
                        }));
                        res.end();
                    } else {
                        res.writeHeader(401);
                        res.write(JSON.stringify({
                            message: 'User not authorized',
                        }));
                        res.end();
                    };
                });
        })
        .catch((err:Error) => {
            res.writeHeader(500);
            res.write(JSON.stringify(err));
            res.end();
        });
}; 

module.exports = checkUser;