const { engine } = require('express-handlebars');

function templatesEngine(app){
    app.engine('hbs', engine({
        extname: '.hbs',
        helpers: {
            sum(a, b){
                return a + b;
            },

            equal(a, b){
                return a == b;
            },

            convertDate(date){
                const [year, month, day] = date.split('-');
                const formattedDate = `${day}-${month}-${year}`;
                return formattedDate;
            }
        }
    }));
}

module.exports = templatesEngine;