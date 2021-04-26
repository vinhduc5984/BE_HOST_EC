const mongoose = require('mongoose');

const connectDb = () => {
  mongoose
    .connect(process.env.URI_ACCESS_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('DB connected');
    })
    .catch((err) => console.log(err));
};

module.exports = connectDb;
