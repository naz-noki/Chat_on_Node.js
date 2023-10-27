const db = require('../../db');

const getUserById = (req:Request, res:Response, id:string) => {
    db
        .query(`
            select * from Users where id = $1
        `, [Number(id)])
        .then((resp) => {
            res.writeHeader(200);
            res.write(JSON.stringify(resp.rows));
            res.end();
        })
        .catch((err:Error) => {
            res.writeHeader(404);
            res.write(JSON.stringify(err));
            res.end();
        });
};

module.exports = getUserById;