const db = require('../src/models');
db.sequelize.sync({
  alter: true,
})
  .then(() => {
    console.log('Database synchronized');
    process.exit();
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });