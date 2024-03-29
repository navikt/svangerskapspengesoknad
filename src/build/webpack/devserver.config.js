require('dotenv').config();
const path = require('path');
const mustacheExpress = require('mustache-express');

const configureDevServer = (decoratorFragments) => ({
    setupMiddlewares: (middlewares, devServer) => {
        devServer.app.engine('html', mustacheExpress());
        devServer.app.set('views', `${__dirname}/../../../dist/dev`);
        devServer.app.set('view engine', 'mustache');
        devServer.app.get(['/dist/settings.js'], (_req, res) => {
            res.set('content-type', 'application/javascript');
            res.send(`window.appSettings = {
                REST_API_URL: '${process.env.FORELDREPENGESOKNAD_API_URL}',
                LOGIN_URL: '${process.env.LOGINSERVICE_URL}',
                LOG_VALIDATION: '${process.env.LOG_VALIDATION}',
            };`);
        });
        devServer.app.get(/^\/(?!.*dist).*$/, (_req, res) => {
            res.render('index.html', Object.assign(decoratorFragments));
        });

        return middlewares;
    },
    client: {
        logging: 'info',
    },
    devMiddleware: {
        index: true,
        stats: 'minimal',
        publicPath: '/dist',
    },
    static: {
        directory: path.resolve(__dirname, '../../../dist/dev'),
        serveIndex: true,
        watch: true,
    },
});

module.exports = configureDevServer;
