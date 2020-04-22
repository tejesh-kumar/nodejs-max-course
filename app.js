const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const rootDir = require('./util/path');
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();   

app.set('view engine', 'ejs');      // ejs is a registered templating engine to deliver templates.
app.set('views', 'views');        // views in root folder is the place to find dynamic views or templates is registered.

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page not found', path: '/default'});
})

app.listen(3000);    



// ejs templating engine
// <title><%= pageTitle %></title>  // pageTitle contains dynamic content to be displayed. '=' is used in <%= pageTitle %> if we are directly outputting a value in pageTitle otherwise we use <% %>
// <%  %> - We can write normal js code.
// includes folder contains code blocks that need to be used across different ejs templates.
// To render the html code <%- include() %>, prevents cross site scripting attacks also. include('path to file which contains html relative to the file we are importing into') allows html from other files to be included.
// html elements rendered within <%= %> is rendered as text.

