const Role = require('mongoose').model('Role');

exports.create = function(req, res, next){
    const role = new Role(req.body);

    role.save((err) => {
        if(err){
            return next(err);
        }else{
            res.status(200).json(role);
        }
    });
};

exports.list = function(req, res, next){
    Role.find({}, (err, roles) => {
        if(err){
            return next(err);
        }else{
            res.status(200).json(roles);
        }
    });
};

exports.read = function(req, res){
    res.json(req.role);
};

exports.roleByID = function(req, res, next, id){
    Role.findOne({
        _id: id
    }, (err, role) =>{
        if(err){
            return next(err);
        }else{
            req.role = role;
            next();
        }
    });
};

exports.update = function(req, res, next){
    Role.findByIdAndUpdate(req.role.id, req.body, {
        'new': true
    }, (err, role) => {
        if(err){
            return next(err);
        }else{
            res.status(200).json(role);
        }
    });
};

exports.delete = function(req, res, next){
    req.role.remove(err => {
        if(err){
            return next(err);
        }else{
            res.status(200).json(req.role);
        }
    })
};
