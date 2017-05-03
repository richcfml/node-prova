const Terminal = require('mongoose').model('Terminal');
const Environment = require('mongoose').model('Environment');
const Group = require('mongoose').model('Group');

exports.create = function(req, res, next){
    const terminal = new Terminal(req.body);

    terminal.save((err) => {
        if(err){
            return next(err);
        }else{
            res.status(200).json(terminal);
        }
    });
};

exports.list = function(req, res, next){
    Terminal.find({}, (err, terminals) => {
        if(err){
            return next(err);
        }else{
            res.status(200).json(terminals);
        }
    });
};

exports.read = function(req, res){
    res.json(req.terminal);
};

exports.terminalByID = function(req, res, next, id){
    Terminal.findOne({
        _id: id
    }, (err, terminal) =>{
        if(err){
            return next(err);
        }else{
            req.terminal = terminal;
            next();
        }
    });
};

exports.update = function(req, res, next){
    Terminal.findByIdAndUpdate(req.terminal.id, req.body, {
        'new': true
    }, (err, terminal) => {
        if(err){
            return next(err);
        }else{
            res.status(200).json(terminal);
        }
    });
};

exports.delete = function(req, res, next){
    req.terminal.remove(err => {
        if(err){
            return next(err);
        }else{
            res.status(200).json(req.terminal);
        }
    })
};
