require('dotenv').config();
const mustacheExpress = require('mustache-express');
var path = require('path');

const configureDevServer = (decoratorFragments) => ({
    before: (app) => {
        app.engine('html', mustacheExpress());
        app.set('views', `${__dirname}/../../../dist/dev`);
        app.set('view engine', 'mustache');
        app.get('/dist/settings.js', (req, res) => {
            res.set('content-type', 'application/javascript');
            res.send(`window.appSettings = {
            REST_API_URL: '${process.env.FORELDREPENGESOKNAD_API_URL}',
            LOGIN_URL: '${process.env.LOGINSERVICE_URL}',
            LOG_VALIDATION: '${process.env.LOG_VALIDATION}',
        };`);
        });
        app.get(/^\/(?!.*dist).*$/, (req, res) => {
            res.render('index.html', Object.assign(decoratorFragments));
        });
    },
    watchContentBase: true,
    quiet: false,
    noInfo: false,
    stats: 'minimal',
    publicPath: '/dist',
});

module.exports = configureDevServer;
