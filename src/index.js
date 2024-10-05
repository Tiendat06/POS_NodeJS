const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const morgan = require("morgan");
const { engine } = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const redisStore = require('connect-redis').default;
const {createClient} = require('redis');
const route = require('./routes');
const db = require("./config/db");
const templatesEngine = require('./utils/handlebars');
const cloudinary = require('cloudinary');
const multer = require('multer');
const method_override = require('method-override');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
var paypal = require('paypal-rest-sdk');

// dotenv
dotenv.config();

// paypal
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': process.env.CLIENT_ID,
    'client_secret': process.env.CLIENT_SECRET
});

// cloudinary
cloudinary.v2.config({
    cloud_name: 'dervs0fx5',
    api_key: '195853691687668',
    api_secret: '9b46KOOdA5y-Sc-C-KALItR1f3o',
    secure: true,
});

// connect db
db.connect();

// static path
app.use(express.static(path.join(__dirname, 'public')));

// middleware, use to send JSON to server
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());
// app.use(bodyParser.json());

const redisClient = createClient({
    url: `redis://${process.env.REDIS_HOST}:6379`
});
redisClient.connect().catch(err => console.log(err));

// session middleware
app.use(session({
    store: new redisStore({client: redisClient}),
    secret: '123456', // Khóa bí mật để ký session ID cookie
    resave: false, // Không lưu session nếu không có thay đổi
    saveUninitialized: true, // Lưu session mới ngay cả khi không có dữ liệu
    cookie: { 
        secure: false,
        maxAge: 60 * 60 * 1000 
    } // Thiết lập cookie (secure: true chỉ cho HTTPS)
}));

// rest method api
app.use(method_override('_method'));


// TEMPLATE ENGINE
templatesEngine(app);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'))

// MORGAN LOGGER
// combined
app.use(morgan('tiny'));

// config nodemailer

// const router = express.Router();
// router.get('', function(req, res, next){
//
// });

// Route
route(app);

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));

// AfqyHnzZEZIZwM9lRyIWs_TyukXIWxbTW9Kv39eCPk_0Ox51oJgdgWmo33FNqZ85X2LPlpEYYCpVZM2a