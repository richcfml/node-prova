const path = require('path');
const config = require('./config');
const express = require('express');
const morgan = require('morgan');
const compress = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const cors = require('cors');


module.exports = function() {
    const app = express();

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
       app.use(compress());
    }
    //CORS middleware
   var whitelist = [
    'http://localhost:4200',
    ];
    var corsOptions = {
        origin: function(origin, callback){
            var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
            callback(null, originIsWhitelisted);
        },
        credentials: true
    };
    app.use(cors(corsOptions));

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));


    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.static('./public'));
    app.use('/lib', express.static(path.resolve('./node_modules')));

    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/roles.server.routes')(app);
    require('../app/routes/groups.server.routes')(app);
    require('../app/routes/users.server.routes')(app);
    require('../app/routes/environments.server.routes')(app);
    require('../app/routes/terminals.server.routes')(app);



    return app;
};
