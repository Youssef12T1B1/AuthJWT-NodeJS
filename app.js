const path = require('path')
const express = require('express');
const morgan = require('morgan');
const mongoose = require ('mongoose');
const exphbs = require('express-handlebars')
const dotenv = require('dotenv')
const connectDb = require('./config/db')


dotenv.config({path: './config/config.env'})

connectDb()

const app = express();
//logging
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//view Engine
app.engine('.hbs', exphbs.engine({defaultLayout: 'base', extname: '.hbs'}))
app.set('view engine','.hbs')


//public 
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/index'))


const PORT = process.env.PORT || 3000 



app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
