const users = require('../../app/controllers/users.server.controller');
const passport = require('passport');

module.exports = function(app){
    app.route('/api/auth/signup').post(users.signup);
    app.route('/api/auth/signin').post(users.signin);
    app.route('/api/auth/signout').get(users.signout);

    //app.route('/users')
    //    .post(users.create)
    //    .get(users.list);

    //app.route('/users/:userId')
    //    .get(users.read)
    //    .put(users.update)
    //    .delete(users.delete);

    //app.param('userId', users.userByID);
}

//module.exports = function(app) {
//    app.route('/signup')
//        .get(users.renderSignup)
//        .post(users.signup);
//    app.route('/signin')
//        .get(users.renderSignin)
//        .post(passport.authenticate('local', {
//            successRedirect: '/',
//            failureRedirect: '/signin',
//            failureFlash: true
//        }));
//    app.get('/signout', users.signout);
//};
