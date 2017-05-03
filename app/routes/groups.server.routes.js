const groups = require('../../app/controllers/groups.server.controller');

module.exports = function(app){
    app.route('/groups')
        .post(groups.create)
        .get(groups.list);

    app.route('/groups/:groupId')
        .get(groups.read)
        .put(groups.update)
        .delete(groups.delete);

    app.param('groupId', groups.groupByID);
}
