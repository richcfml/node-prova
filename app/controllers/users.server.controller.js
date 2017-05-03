const Role = require('mongoose').model('Role');
const Group = require('mongoose').model('Group');
const User = require('mongoose').model('User');
const passport = require('passport');

function getErrorMessage(err) {
    let message = '';
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Username already exists';
            break;
        default:
            message = 'Something went wrong';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }
    return message;
};

exports.signin = function(req, res, next) {
     passport.authenticate('local', function(err, user, info) {
       if (err || !user) {
         res.status(400).send(info);
       } else {
         // Remove sensitive data before login
         user.password = undefined;
         user.salt = undefined;
         req.login(user, function(err) {
           if (err) {
             res.status(400).send(err);
           } else {
            res.json(user);
            }
        });
    }
    })(req, res, next);
};

exports.renderSignin = function(req, res, next) {
    if (!req.user) {
        res.render('signin', {
            title: 'Sign-in Form',
            messages: req.flash('error') || req.flash('info')
        });
    } else {
        return res.redirect('/');
    }
};

exports.signup = function(req, res) {
  const user = new User(req.body);
  user.provider = 'local';
  user.save((err) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
});
} else {
      // Remove sensitive data before login
      user.password = undefined;
      user.salt = undefined;
      req.login(user, function(err) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(user);
        }
}); }
}); };

exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
};

exports.create = function(req, res, next){
	const user = new User(req.body);

 	user.save((err) => {
 		if(err){
 			return next(err);
 		}else {
 			res.status(200).json(user);
 		}
 	});
};

exports.list = function(req, res, next){
	User.find({}, 'firstName lastName fullName email role group', {
		skip: 0,
		limit: 10
	}, (err, users) => {
		if(err){
			return next(err);
		}else{
			res.status(200).json(users);
		}
	});
};

exports.read = function(req, res){
	res.json(req.user);
};

exports.userByID = function(req, res, next, id){
	User.findOne({
		_id: id
		},(err, user) => {
			if(err){
				return next(err);
			}else {
				req.user = user;
				next();
			}
	});
};

exports.update = function(req, res, next){
	User.findByIdAndUpdate(req.user.id, req.body, {
		'new': true
	}, (err, user) => {
		if(err){
			return next(err);
		}else{
			res.status(200).json(user);
		}
	});
};

exports.delete = function(req, res, next){
	req.user.remove(err => {
		if(err){
			return next(err);
		}else {
			res.status(200).json(req.user);
		}
	});
};

exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).send({ message: 'User is not logged in' });
    }
    next();
};
