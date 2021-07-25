const express = require("express");
const mongoose = require("mongoose");
const ipQuestion = require("./model/Ip_questions");
const IPQuestionBank = require("./model/Ip_questions");


require("dotenv/config");

const app = express();

app.use(express.json())

app.get("/",(req,res) => {

    IPQuestionBank.find().then(result=>{
        res.status(200).json({
        IPQuestionBank : result
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err.body
        })
    })
    
    
console.log("get request")
})

app.post("/enter_question",async (req,res) => {
    try {
        let questions = req.body
        questions.map(async (ques) => {
            const myQuestionBank = new IPQuestionBank(ques);
            await myQuestionBank.save();
            if(ques == questions[questions.length - 1]){
                res.send({
                    success : "you successfully entered your questions"
                })
            }
        })
    } catch (e) {
        
        console.log(e);
        res.send({
            error:e.body
        });
    }
})

mongoose.connect(
    process.env.DB_CONNECTION_STRING,{
        useUnifiedTopology : true , useNewUrlParser: true
    },(req,res)=>{
        console.log("Database is connected ");
    }
);

app.listen(process.env.PORT || 3000,()=>{
    console.log("listening to 3000");
})