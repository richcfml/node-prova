const environments = require('../../app/controllers/environments.server.controller');

module.exports = function(app){
    app.route('/environments')
        .post(environments.create)
        .get(environments.list);

    app.route('/environments/:environmentId')
        .get(environments.read)
        .put(environments.update)
        .delete(environments.delete);

    app.param('environmentId', environments.environmentByID);
}
