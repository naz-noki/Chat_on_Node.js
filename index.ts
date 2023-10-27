const MyServer = require('./MyServer');
const cluster = require('node:cluster');
const os = require('node:os');
require('dotenv').config();

const Server = new MyServer();

const CPU:number = os.cpus().length;

cluster.on('exit', () => {
    cluster.fork();
});

if(cluster.isMaster) { 
    for(let i = 0; i < CPU-2; i++) {
        cluster.fork();
    };
} else {

    Server.listen(process.env.PORT);

};