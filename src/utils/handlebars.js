const { engine } = require('express-handlebars');

function templatesEngine(app){
    app.engine('hbs', engine({
        extname: '.hbs',
        helpers: {
            equal(a, b){
                return a == b;
            }
        }
    }));
}

module.exports = templatesEngine;