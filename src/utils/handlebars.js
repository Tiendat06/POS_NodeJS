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
            convertDateTime(dateTime){
                const date = new Date(dateTime);
                // console.log(date);
                return date.toISOString().split('T')[0]; // YYYY-MM-DD
            },
            convertDateTimeVersion2(dateTime){
                const date = new Date(dateTime);

                const day = String(date.getUTCDate()).padStart(2, '0');
                const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
                const year = date.getUTCFullYear();
            
                const hours = String(date.getUTCHours()).padStart(2, '0');
                const minutes = String(date.getUTCMinutes()).padStart(2, '0');
                const seconds = String(date.getUTCSeconds()).padStart(2, '0');
            
                const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
            
                return formattedDateTime;
            },
            objectToJson: function (context) {
                return JSON.stringify(context, null, 2);
            }
        }
    }));
}

module.exports = templatesEngine;