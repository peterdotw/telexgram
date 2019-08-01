const mongoose = require("mongoose");

const MessagesSchema = new mongoose.Schema(
  {
    message: {
      type: String
    },
    author: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Messages = mongoose.model("Messages", MessagesSchema);

module.exports = Messages;
