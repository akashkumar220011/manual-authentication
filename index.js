const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose')

app.use(express.urlencoded());

app.use(cookieParser());

// set static file
app.use(express.static('./assets'));

//using layouts
app.use(expressLayouts);


//extract styles and script from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// use express router
app.use('/', require('./routes'));

// setup a view engine
app.set('view engine', 'ejs');
app.set('views', './views');



//port listen
app.listen(port, function(err){
    if(err){
        console.log("error is running the server", err);
    }

    console.log("yehh it is running on port", port);
});
