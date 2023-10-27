const checkUser = require('../functions/User/checkUser');
const postUser = require('../functions/User/postUser');
const getAllUsers = require('../functions/User/getAllUsers');
const getUserById = require('../functions/User/getUserById');
const putUser = require('../functions/User/putUser');
const deleteUser = require('../functions/User/deleteUser');

class UserController {
    constructor() {
        this.userRouter = this.userRouter.bind(this);
        this.checkUser = checkUser.bind(this);
        this.postUser = postUser.bind(this);
        this.getAllUsers = getAllUsers.bind(this);
        this.getUserById = getUserById.bind(this);
        this.putUser = putUser.bind(this);
        this.deleteUser = deleteUser.bind(this);
    };

    userRouter(req:Request, res:Response) {
        const uri = req.url.split('/');

        switch(req.method) {
            case 'POST': {
                if(uri[3] === 'auth') this.checkUser(req, res);
                else this.postUser(req, res);
                break;
            };
            case 'GET': {
                if(
                    uri.length === 3 ||
                    (uri.length === 4 && uri[uri.length-1] === '')
                ) this.getAllUsers(req, res);
                else this.getUserById(req, res, uri[uri.length-1]);
                break;
            };
            case 'PUT': {
                this.putUser(req, res, uri[uri.length-1]);
                break;
            };
            case 'DELETE': {
                this.deleteUser(req, res, uri[uri.length-1]);
                break;
            };
            default: {
                res.end();
                break;
            };
        };
    };
};

module.exports = UserController;