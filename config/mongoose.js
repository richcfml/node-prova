const config = require('./config');
const mongoose = require('mongoose');

module.exports = function() {
    const db = mongoose.connect(config.db);

    require('../app/models/role.server.model');
    require('../app/models/group.server.model');
    require('../app/models/user.server.model');
    require('../app/models/environment.server.model');
    require('../app/models/terminal.server.model');

    return db;
};
