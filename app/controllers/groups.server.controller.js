const Group = require('mongoose').model('Group');

exports.create = function(req, res, next){
    const group = new Group(req.body);

    group.save((err) => {
        if(err){
            return next(err);
        }else{
            res.status(200).json(group);
        }
    });
};

exports.list = function(req, res, next){
    Group.find({}, (err, groups) => {
        if(err){
            return next(err);
        }else{
            res.status(200).json(groups);
        }
    });
};

exports.read = function(req, res){
    res.json(req.group);
};

exports.groupByID = function(req, res, next, id){
    Group.findOne({
        _id: id
    }, (err, group) =>{
        if(err){
            return next(err);
        }else{
            req.group = group;
            next();
        }
    });
};

exports.update = function(req, res, next){
    Group.findByIdAndUpdate(req.group.id, req.body, {
        'new': true
    }, (err, group) => {
        if(err){
            return next(err);
        }else{
            res.status(200).json(group);
        }
    });
};

exports.delete = function(req, res, next){
    req.group.remove(err => {
        if(err){
            return next(err);
        }else{
            res.status(200).json(req.group);
        }
    })
};
