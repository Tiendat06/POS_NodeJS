const { multipleMongooseToObj } = require('../../utils/mongoose');

class ErrorController {
    error(req, res, next){
        var notInMain = true;
        res.render('error/error', {
            notInMain: notInMain
        });
    }

    err500(req, res, next) {
        
    }

    err502(req, res, next){
        res.render('error/502');
    }
}

module.exports = new ErrorController();