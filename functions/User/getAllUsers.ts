const db = require('../../db');

const getAllUsers = (req:Request, res:Response) => {
    db.query(`
        select * from Users;
    `)
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

module.exports = getAllUsers;