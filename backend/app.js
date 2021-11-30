const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path : './config.env'})
const cors = require('cors');
const cookieParser = require('cookie-parser')
const blogRouter = require('./routes/blogRoutes');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const morgan = require('morgan');

const app = express();



// 
app.use(express.json());
app.use(cookieParser())
app.use(cors());
app.use(morgan('dev'));

app.use('/api/blogs',blogRouter);
app.use('/api/users',userRouter);
app.use('/api/auth',authRouter);

// if (process.env.NODE_ENV === 'production') {
//     console.log("kire")
//     app.use(express.static('build'));
//     app.get('*',(req,res) => {
//         res.sendFile(path.resolve(__dirname,'build','index.html'))
//     })
// }

module.exports = app ;