var express = require('express');

var app = express();
var port = process.env.PORT || 5000;

var bookRouter = require('./src/routes/bookRoutes');

app.use(express.static('public'));
app.set('views', 'src/views');
app.set('view engine', 'ejs');


app.use('/Books', bookRouter);

app.get('/', function(req, res){
	res.render('index', {
        title: 'hello from render', 
        nav: [
            { 
                Link:'/Books', 
                Text: 'Books'
            }, 
            {
                Link:'/Authors', 
                Text:'Authors'
            }
        ]});
});

app.listen(port, function(err){
	console.log('running server on port ' + port);
});

//Colors for brackets backgrounds
//41,44,51
//71,72,75
