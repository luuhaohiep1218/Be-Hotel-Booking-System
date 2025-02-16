const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(`${process.env.DB_CONNECT}/${process.env.DB_NAME}`);
    console.log(`Connect successfully database ${process.env.DB_NAME}`);
  } catch (error) {
    console.log("Connect failure!!!");
  }
}

module.exports = {
  connect,
};
