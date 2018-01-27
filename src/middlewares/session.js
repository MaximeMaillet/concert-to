
require('dotenv').config();

const fs = require('fs');
const uuidv4 = require('uuid/v4');
const session = require('express-session');
var FileStore = require('session-file-store')(session);

const options = {
  path: 'sessions',
  expiryDate: new Date( Date.now() + 60 * 60 * 1000 ),
};

module.exports.use = session({
  secret: 'mySecret',
  cookie: { httpOnly: false },
  saveUninitialized: true,
  resave: false,
  store: new FileStore(options),
});

// module.exports.use = (req, res, next) => {
//   console.log('called');
//   console.log(req.method+req.url);
//   const sessionID = req.universalCookies.get('sessionID');
//   // if(!sessionID) {
//   //   console.log(req.method);
//   //   console.log(req.url);
//   //   console.log('ok');
//   //   const id = uuidv4();
//   //   // req.universalCookies.set(
//   //   //   'sessionID',
//   //   //   id,
//   //   //   {
//   //   //     path: '/',
//   //   //     maxAge: options.expiryDate,
//   //   //     secure: false,
//   //   //     httpOnly: false,
//   //   //   }
//   //   // );
//   //   req.session = saveFileSession(id, {
//   //     "name": "bonjour"
//   //   });
//   // } else {
//   //   console.log(`Cookie : ${sessionID}`);
//   //   req.session = getFileSession('test');
//   // }
//
//   next();
// };

function getFileSession(sessionID) {
  return require(`${options.path}${sessionID}.json`);
}

function saveFileSession(sessionID, session) {
  fs.writeFile(`${process.cwd()}/${options.path}/${sessionID}.json`, session, (err) => {
    if(err) {
      console.log(err);
    }
    console.log('done');
  });
  return session;
}