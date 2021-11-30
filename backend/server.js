const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path : './config.env'})
const app = require('./app');

const DatabaseConnection = async () => {
    await mongoose.connect(process.env.DATABASE);
    console.log("Database is Connected")
}
DatabaseConnection();

const port = 3015 || process.env.PORT ;

const host  = process.env.IP || 'localhost' ;

app.listen(port, host , () => {
    console.log(host);
    console.log(`${port} is running`);
});

