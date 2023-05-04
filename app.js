// Task1: initiate app and run server at 3000
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Cors = require('cors')
const BodyParser = require('body-parser')
const app = express()


dotenv.config();
app.use(Cors())
app.use(BodyParser.json())
app.use(BodyParser.urlencoded({extended:true}))

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
// Task2: create mongoDB connection 

mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser:true})
  .then(() => console.log('MongoDB database connection established successfully'))
  .catch((err) => {
    console.log('Error in MongoDB database connection: ' + err);
  });

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below







//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist', async (req,res) =>{

    try {
        let data = await employeeModel.find()
        res.json(data)
    } 
    catch (error) {
        console.log(error);
    }
    
})



//TODO: get single data from db  using api '/api/employeelist/:id'
app.get('/api/employeelist/:id',async (req,res) =>{
    const id = req.params.id;
    const newData = {
        _id:id
    }
    const data = await employeeModel.find(newData)
    res.json(data)

})


//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist', async (req,res) =>{
    const {name,location,position,salary} = req.body
    var dataBody = {
        name,
        location,
        position,
        salary
    }
    var data= new employeeModel(dataBody)
    data.save()
    res.json({status:"success"})
})





//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete('/api/employeelist/:id',async (req,res) =>{
    const id = req.params.id;
    const newData = {
        _id:id
    }
    const data = await employeeModel.deleteOne(newData)
    res.json(data)

})




//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist',async (req, res) =>{

    const data = await employeeModel.findOneAndUpdate({"_id": req.body._id},req.body)
    res.json("Success")


});

const employeeSchema = new mongoose.Schema(
    {
        name:String,
        location:String,
        position:String,
        salary:Number
    }
)

const employeeModel = mongoose.model(
    "employee" , employeeSchema
)

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

app.listen(3000, ()=>{
    console.log('server is running 3000');
})


