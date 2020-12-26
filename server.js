const express = require ('express');
const app = express();
const mongoose = require ('mongoose');


require('dotenv').config({path:'./config/.env'})

const port = process.env.PORT;

app.use(express.json());

mongoose.connect(process.env.MONGO_URl, {useNewUrlParser: true, useUnifiedTopology: true})
    .then( ()=>console.log("Database connected"))
    .catch((err)=>console.log(err))

    const Person = require ("./models/Person");

    app.post("/api/add_person", (req,res)=>{
        const {name, age, favoriteFoods } = req.body;
        const newPerson = new Person({name, age, favoriteFoods });
        newPerson
        .save()
        .then((user)=>res.send({msg:"person added",user}))
        .catch((err)=>res.status(404).send({msg:"il y a erreur",err}))
    });

    app.get("/api/persons", (req,res)=>{
        Person.find()
        .then((persons)=>res.send({msg:"get all persons",persons}))
        .catch((err)=>res.status(404).send({msg:"il y a erreur",err}));
    });

    app.get("/api/persons/one", (req,res)=>{
        Person.findOne ({ favoriteFoods: 'pizza' })
        .then((persons)=>res.send({msg:"get persons",persons}))
        .catch((err)=>res.status(404).send({msg:"il y a erreur",err}));
    });

    app.get('/api/persons/:personId', (req,res)=>{
        const id = req.params.personId
        Person.findById(id)
        .then((person)=>
        {if (!person){return res.status(404).send("person not found")}
            res.send({msg:"person by id",person})})
        .catch((err)=>res.send({msh:"une erreur",err}))
    })
    
    app.put('/api/persons/name', (req,res)=>{
        Person.findOneAndUpdate ({ name: 'Hassen'},{age:20}, {new: true})
        .then((person)=>
            res.send({msg:"person updated",person}))
        .catch((err)=>res.status(400).send({msg:"une erreur",err}))
    })

    app.delete('/api/persons/:personId', (req,res)=>{
        const id = req.params.personId
        Person.findByIdAndRemove (id)
        .then((person)=>
            res.send({msg:"person deleted",person}))
        .catch((err)=>res.status(400).send({msg:"une erreur",err}))
    })

    app.delete('/api/persons/per/name', (req,res)=>{
        Person.findOneAndRemove ({name:"Mary"})
        .then((person)=>res.send({msg:"person deleted",person}))
        .catch((err)=>res.status(400).send({msg:"une erreur",err}))
    })


app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})