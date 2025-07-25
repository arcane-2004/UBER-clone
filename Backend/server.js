const http = require('http')
const app = require('./app')
const { initializeSocket } = require('./socket');
const port = process.env.port || 4000;

const server = http.createServer(app);

initializeSocket(server);

server.listen(port, ()=>{
    console.log(`server is running on port http://localhost:${port}`);
});
