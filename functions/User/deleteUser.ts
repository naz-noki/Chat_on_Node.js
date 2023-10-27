const db = require('../../db');

const deleteUser = (req:Request, res:Response, id:string) => {
    db  
        .query(`
            delete from Users where id = $1
        `, [Number(id)])
        .then(() => {
            res.writeHeader(202);
            res.write(JSON.stringify({
                message: 'User deleted'
            }));
            res.end();
        })
        .catch((err:Error) => {
            res.writeHeader(404);
            res.write(JSON.stringify(err));
            res.end();
        });
};

module.exports = deleteUser;