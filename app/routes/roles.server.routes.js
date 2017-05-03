const roles = require('../../app/controllers/roles.server.controller');

module.exports = function(app){
    app.route('/roles')
        .post(roles.create)
        .get(roles.list);

    app.route('/roles/:roleId')
        .get(roles.read)
        .put(roles.update)
        .delete(roles.delete);

    app.param('roleId', roles.roleByID);
}
