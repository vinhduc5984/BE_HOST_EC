
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

app.use('/freightcost',route);

app.use('/financial',route);

app.use('/promotion',route);

const port = process.env.PORT;
app.listen(port,()=>console.log(`http://localhost:${port}`))
