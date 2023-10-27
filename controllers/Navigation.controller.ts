const fs = require('node:fs');
const createPath = require('../helpers/createPath');

class NavigationController {
    constructor() {
        this.navigationRouter = this.navigationRouter.bind(this);
        this.getBundle = this.getBundle.bind(this);
        this.getStyles = this.getStyles.bind(this);
        this.getMainPage = this.getMainPage.bind(this);
        this.getAuthentificationPage = this.getAuthentificationPage.bind(this);
        this.getLoginPage = this.getLoginPage.bind(this);
        this.getSigninPage = this.getSigninPage.bind(this);
    };

    getMainPage(req:Request, res:Response) {
        fs
            .createReadStream(createPath('MainPage.html', '..', 'Frontend'), { encoding: 'utf-8' })
            .pipe(res);
    };

    getAuthentificationPage(req:Request, res:Response) {
        fs
            .createReadStream(createPath('AuthentificationPage.html', '..', 'Frontend'), { encoding: 'utf-8' })
            .pipe(res);
    };

    getLoginPage(req:Request, res:Response) {
        fs
            .createReadStream(createPath('LoginPage.html', '..', 'Frontend'), { encoding: 'utf-8' })
            .pipe(res);
    };

    getSigninPage(req:Request, res:Response) {
        fs
            .createReadStream(createPath('SigninPage.html', '..', 'Frontend'), { encoding: 'utf-8' })
            .pipe(res);
    };

    getBundle(req: Request, res:Response) {
        console.log(req.url, 'js');
        fs
            .createReadStream(createPath('script.js', '..', 'Frontend'), { encoding: 'utf-8' })
            .pipe(res);
    };

    getStyles(req: Request, res:Response) {
        console.log(req.url, 'css');
        fs
            .createReadStream(createPath('style.css', '..', 'Frontend'), { encoding: 'utf-8' })
            .pipe(res);
    };

    navigationRouter(req:Request, res:Response) {
        switch(req.url) {
            case '/': {
                this.getAuthentificationPage(req, res);
                break;
            };
            case '/chat': {
                this.getMainPage(req, res);
                break;
            };
            case '/login': {
                this.getLoginPage(req, res);
                break;
            };
            case '/signin': {
                this.getSigninPage(req, res);
                break;
            };
            case '/style.css': {
                this.getStyles(req, res);
                break;
            };
            case '/script.js': {
                this.getBundle(req, res);
                break;
            };
            default: {
                res.end();
                break;
            };
        };
    };
};

module.exports = NavigationController;