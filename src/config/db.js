const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(`${process.env.DB_CONNECT}/go-phim`);
    console.log("Connect successfully!!!");
  } catch (error) {
    console.log("Connect failure!!!");
  }
}

module.exports = {
  connect,
};
