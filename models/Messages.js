const mongoose = require("mongoose");

const MessagesSchema = new mongoose.Schema(
  {
    message: {
      type: String
    },
    sender: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Messages = mongoose.model("Messages", MessagesSchema);

module.exports = Messages;
