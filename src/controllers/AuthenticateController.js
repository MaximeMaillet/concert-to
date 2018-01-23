'use strict';

const user = [
  {name: 'Max', id: 1},
  {name: 'Jo', id: 2},
  {name: 'Alfred', id: 3},
];

module.exports.connect = (req, res, next) => {
  const i = Math.floor(Math.random() * 2);
  console.log(i);
  req.session.user = user[i];
  res.send(req.session.user);
};

module.exports.disconnect = (req, res, next) => {
  req.session.user = null;
  res.sendStatus(200);
};