const EventEmitter = require('node:events');
const postNewMessage = require('../functions/Message/postNewMessage');
const getMessageSSE = require('../functions/Message/getMessageSSE');

const MessagesEvents = new EventEmitter();

class MessageController {
    constructor() {
        this.messageRouter = this.messageRouter.bind(this);
        this.postNewMessage = postNewMessage.bind(this);
        this.getMessageSSE = getMessageSSE.bind(this);
    };

    messageRouter(req:Request, res:Response) {
        switch(req.method) {
            case 'POST': {
                this.postNewMessage(req, res, MessagesEvents);
                break;
            };
            case 'GET': {
                this.getMessageSSE(req, res, MessagesEvents);
                break;
            };
            default: {
                res.end();
                break;
            };
        };
    };
};

module.exports = MessageController;