
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const route = require('./src/routes');
const router = require('./src/routes/customer.Route');

require('./src/config/db')()

const app = express();
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(morgan("dev"))

app.use('/api_customer',route);
app.use('/bill_api',route);
app.use('/paypal_api',route);
app.get('/', (req, res) => res.sendFile(__dirname + "/index.html"));

app.use('/freightcost',route);

app.use('/financial',route);

app.use('/promotion',route);
app.use('/servicepackage',route);

app.use('/statistic',route);

const port = process.env.PORT;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.listen(port,()=>console.log(`http://localhost:${port}`))
