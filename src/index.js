const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const morgan = require("morgan");
const { engine } = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const route = require('./routes');
const db = require("./config/db");

// connect db
db.connect();

// static path
app.use(express.static(path.join(__dirname, 'public')));

// middleware
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());

app.use(session({
    secret: '123456', // Khóa bí mật để ký session ID cookie
    resave: false, // Không lưu session nếu không có thay đổi
    saveUninitialized: true, // Lưu session mới ngay cả khi không có dữ liệu
    cookie: { secure: false } // Thiết lập cookie (secure: true chỉ cho HTTPS)
}));

// TEMPLATE ENGINE
app.engine('hbs', engine({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'))

// MORGAN LOGGER
app.use(morgan('combined'));

// Route
route(app);

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));