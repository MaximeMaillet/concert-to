require('dotenv').config();

module.exports = (req, res, next) => {

  const data = {};
  let statusCode = req.error.status || 422;

  if(req.error.errors) {
    data.message = req.error.errors[0].message;
  }

  if(process.env.NODE_ENV === 'development') {
    data['error'] = {
      message: req.error.message,
      context: req.error,
    };
  }

  if(!data.message) {
    data.message = req.error.message;
  }

  return res.status(statusCode).send(data);
};