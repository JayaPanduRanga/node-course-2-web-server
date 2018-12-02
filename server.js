const cExpress = require('express');
const cHbs = require('hbs');
const cDash = require('lodash');
const cFs = require('fs');
var app = cExpress();

cHbs.registerPartials(__dirname + "/views/partials")
app.set('view engine', 'hbs');
console.log(__dirname);
app.use(cExpress.static(__dirname + "/public/help.html"));

app.use((request, response, next) => {
    var now = new Date().toString();
    var log = `${now}: ${request.method}- ${request.url}`;
    console.log(log);
    cFs.appendFile('Server.log', (log + '\n'), (error) => {
        if (error) {
            console.log("Error Occured");
        }
    });
    next();
});

cHbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

cHbs.registerHelper('screamIT', (text) => {
    return cDash.toUpper(text);
});

app.get('/', (request, response) => {
    response.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website'
    });
});
app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About Me'
    });
    // response.send('About has been sent');
});

app.get('/bad', (request, response) => {
    response.send({
        errormessage: 'This is a bad request.'
    });
});

app.listen(3000, () => {
    console.log("Server is ready now at port 3000");
});
