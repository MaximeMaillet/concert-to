module.exports.use = (req, res, next) => {
  if(!req.session || !req.session.user) {
    return res.status(401).send({
      message: 'You are not authorized'
    });
  } else {
    next();
  }
};