const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const morgan = require("morgan");
const { engine } = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const route = require('./routes');
const db = require("./config/db");
const templatesEngine = require('./utils/handlebars');
const cloudinary = require('cloudinary');
const multer = require('multer');

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

// middleware
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());
// app.use(bodyParser.json());


app.use(session({
    secret: '123456', // Khóa bí mật để ký session ID cookie
    resave: false, // Không lưu session nếu không có thay đổi
    saveUninitialized: true, // Lưu session mới ngay cả khi không có dữ liệu
    cookie: { 
        secure: false,
        maxAge: 60 * 60 * 1000 
    } // Thiết lập cookie (secure: true chỉ cho HTTPS)
}));


// TEMPLATE ENGINE
templatesEngine(app);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'))

// MORGAN LOGGER
// combined
app.use(morgan('tiny'));

// const router = express.Router();
// router.get('', function(req, res, next){
     
// });

// Route
route(app);

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));