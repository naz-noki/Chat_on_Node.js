const http = require('node:http');
const NavigationController = require('./controllers/Navigation.controller');
const UserController = require('./controllers/User.controller');
const MessageController = require('./controllers/Message.controller');

const Navigation = new NavigationController();
const User = new UserController();
const Message = new MessageController();

class MyServer {
    #PORT;

    constructor() {
        this.handlerForServer = this.handlerForServer.bind(this);
        this.listen = this.listen.bind(this);
    };

    handlerForServer(req:Request, res:Response) {
        if(req.url.includes('/api/user')) User.userRouter(req, res);
        else if(req.url.includes('/api/message')) Message.messageRouter(req, res);
        else Navigation.navigationRouter(req, res);
    };

    listen(port:number) {
        this.#PORT = port;
        http
            .createServer(this.handlerForServer)
            .listen(this.#PORT, (err: Error) => {
                if(err) console.log(`Error when starting the app: ${err}`);
                else console.log(`App start on: http://localhost:${this.#PORT}`);
            });
    };
};

module.exports = MyServer; 