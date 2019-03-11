const express = require('express');
const app = express();
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

require('dotenv').config();

const getFilePath = function(filnavn) {
    var directories = ['.', 'mock_data', filnavn];
    return directories.join(path.sep);
};

const allowCrossDomain = function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-XSRF-TOKEN,Location');
    res.setHeader('Access-Control-Expose-Headers', 'Location');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
};

const delayAllResponses = function(millis) {
    return function(req, res, next) {
        setTimeout(next, millis);
    };
};

app.use(allowCrossDomain);
app.use(delayAllResponses(500));
app.use(express.json());

router.get(['/rest/sokerinfo'], (req, res) => {
    const fileName = getFilePath('sokerinfo.json');
    const response = JSON.parse(fs.readFileSync(fileName, 'utf8'));
    res.send(response);
});

router.post('/rest/soknad', (req, res) => {
    const fileName = getFilePath('soknad_sendt.json');
    const response = JSON.parse(fs.readFileSync(fileName, 'utf8'));
    res.send(response);
});

const vedleggUpload = multer({ dest: './dist/vedlegg/' });
router.post('/rest/storage/vedlegg', vedleggUpload.single('vedlegg'), (req, res) => {
    res.setHeader('Location', `http://localhost:8080/foreldrepengesoknad/dist/vedlegg/${req.body.id}`);
    res.sendStatus(201);
});

app.use('', router);

const port = process.env.PORT || 8888;
app.listen(port, () => {
    console.log(`Test-API kjører på port ${port}`);
});
