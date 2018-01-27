require('dotenv').config();

module.exports = (req, res, next) => {

  const data = {
    message: req.error.errors[0].message,
  };

  if(process.env.NODE_ENV === 'development') {
    data['error'] = {
      message: req.error.message,
      context: req.error,
    };
  }

  return res.status(422).send(data);
};