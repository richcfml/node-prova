const terminals = require('../../app/controllers/terminals.server.controller');

module.exports = function(app){
    app.route('/terminals')
        .post(terminals.create)
        .get(terminals.list);

    app.route('/terminals/:terminalId')
        .get(terminals.read)
        .put(terminals.update)
        .delete(terminals.delete);

    app.param('terminalId', terminals.terminalByID);
}
