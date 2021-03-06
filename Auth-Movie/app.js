const path = require('path')
const express = require('express');
const morgan = require('morgan');
const mongoose = require ('mongoose');
const exphbs = require('express-handlebars')
const dotenv = require('dotenv')
const connectDb = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const movieRoutes = require('./routes/movieRoutes')
const cookieParser = require('cookie-parser')
const { CheckUser } = require('./middleware/authMiddleware')



dotenv.config({path: './config/config.env'})

connectDb()

const app = express();
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())
//logging
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//view Engine
app.engine('.hbs', exphbs.engine({defaultLayout: 'base', extname: '.hbs'}))
app.set('view engine','.hbs')


//public 
app.use(express.static(path.join(__dirname, 'public')))


app.use('*', CheckUser)
app.use('/', require('./routes/index'))
app.use(movieRoutes)
app.use(authRoutes)



const PORT = process.env.PORT || 3000 




app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))

