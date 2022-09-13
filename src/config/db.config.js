const { connect } = require("mongoose");

const connectDB = async () => {
  try {
    await connect(process.env.DB_URI);
    console.log(`Database is successfully connected...`);
  } catch (error) {
    console.log(error);
    process.exit(-1);
  }
};

module.exports = connectDB;
