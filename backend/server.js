const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path : './config.env'})
const app = require('./app');

const DatabaseConnection = async () => {
    await mongoose.connect(process.env.DATABASE);
    console.log("Database is Connected")
}
DatabaseConnection();

const port = 3020 || process.env.PORT ;

const host  = process.env.HOST || '127.0.0.1' ;

app.listen(port, host , () => {
    console.log(host);
    console.log(`${port} is running`);
});

