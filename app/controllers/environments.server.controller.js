const Environment = require('mongoose').model('Environment');
const Group = require('mongoose').model('Group');

exports.create = function(req, res, next){
    const environment = new Environment(req.body);

    environment.save((err) => {
        if(err){
            return next(err);
        }else{
            res.status(200).json(environment);
        }
    });
};

exports.list = function(req, res, next){
    Environment.find({}, (err, environments) => {
        if(err){
            return next(err);
        }else{
            res.status(200).json(environments);
        }
    });
};

exports.read = function(req, res){
    res.json(req.environment);
};

exports.environmentByID = function(req, res, next, id){
    Environment.findOne({
        _id: id
    }, (err, environment) =>{
        if(err){
            return next(err);
        }else{
            req.environment = environment;
            next();
        }
    });
};

exports.update = function(req, res, next){
    Environment.findByIdAndUpdate(req.environment.id, req.body, {
        'new': true
    }, (err, environment) => {
        if(err){
            return next(err);
        }else{
            res.status(200).json(environment);
        }
    });
};

exports.delete = function(req, res, next){
    req.environment.remove(err => {
        if(err){
            return next(err);
        }else{
            res.status(200).json(req.environment);
        }
    })
};
