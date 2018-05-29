const express = require('express');

const app = express();
const path = require('path');

const port = 8080;

process.on('uncaughtException', (err) => {
  console.log(err);
});

const tests = `${__dirname}/tests/`;
const testsManual = `${tests}manual/`;
const staticDirectories = [tests, testsManual, `${__dirname}/`];


staticDirectories.forEach((dir) => {
  app.use(express.static(dir));
}, this);

const fileExtensions = ['woff', 'woff2', 'ttf', 'js', 'css', 'png'];

function isFile(url) {
  for (const i in fileExtensions) {
    if (url.indexOf(`.${fileExtensions[i]}`) !== -1) {
      return true;
    }
  }
  return false;
}

function appGet(url) {
  app.get(`${url}*`, (req, res) => {
        // console.log(req.url);
    if (isFile(req.url)) {
      console.log(`${404} ${req.url}`);
      res.status(404).send('Not found');
      return;
    }
    res.sendFile(path.join(`${testsManual}/index.html`));
  });
}

appGet('/');

app.listen(port);

console.log(`App listening on port ${port}`);
