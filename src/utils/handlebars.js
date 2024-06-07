const { engine } = require('express-handlebars');

function templatesEngine(app){
    app.engine('hbs', engine({
        extname: '.hbs',
        helpers: {
            sum(a, b){
                return a + b;
            },

            minus(a, b){
                return a - b;
            },

            equal(a, b){
                return a == b;
            },

            lessThan(a, b){
                return a < b;
            },

            lessOrEqualThan(a, b){
                return a <= b;
            },

            moreThan(a, b){
                return a > b;
            },

            moreOrEqualThan(a, b){
                return a >= b;
            },

            getArrayLength(array){
                return array.length;
            },

            convertDate(date){
                const [year, month, day] = date.split('-');
                const formattedDate = `${day}-${month}-${year}`;
                return formattedDate;
            },
            converDateTime(dateTime){
                const date = new Date(dateTime);
                return date.toISOString().split('T')[0]; // YYYY-MM-DD
            }
        }
    }));
}

module.exports = templatesEngine;