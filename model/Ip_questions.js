const mongoose = require("mongoose");

const IPQuestionBank = new mongoose.Schema({
    q : String,
    a : String,
    b : String,
    c : String,
    d : String,

});

module.exports = mongoose.model("ipQuestion" , IPQuestionBank );