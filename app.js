const express = require('express')
const app = express()
const port = 3001
const path = require('path')
const fileUpload = require('express-fileupload')
const joi = require('joi')
const fs = require('fs')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(fileUpload())

const validateData = (data) => {
    const schema = joi.object({
      title : joi.string().required(),
      category : joi.string().required(),
      description : joi.string().required(),
      registration_fee : joi.number().required(),
      prize : joi.number().required(),
      registration_deadline : joi.string().required()
    })
  
    return schema.validate(data)
}

const validateRegister = (data) => {
    const schema = joi.object({
      name : joi.string().required(),
      age : joi.number().required(),
      phone_number : joi.number().required(),
      gender : joi.string().required()
    })
  
    return schema.validate(data)
}

//database
//category : Seni, Sains, Teknologi, Olahraga 
let competitions = [
    {
        id : 1,
        title : "Lomba Poster", 
        category : "Seni", 
        description : "Lomba poster seru blabalbalbalbalbala", 
        registration_fee : 50000, 
        prize : 2500000, 
        registration_deadline : "24-02-2024", 
        image : "/images/Lomba Poster.jpg"
    },
    {
        id : 2,
        title : "Lomba Story Telling",
        category : "Seni",
        description : "Lomba Story telling mantap keren", 
        registration_fee : 20000,
        prize : 1000000, 
        registration_deadline : "19-02-2024", 
        image : "/images/Lomba Story Telling.jpg"
    },
    {
        id : 3,
        title : "Lomba Lawak",
        category : "Seni",
        description : "Lomba Seru Nih Bro", 
        registration_fee : 500,
        prize : 20000, 
        registration_deadline : "20-03-2024", 
        image : "/images/Lomba Lawak.jpg"
    }
    
]

let registered = [
    {
        id : 1,
        competition_id : 1,
        name : "Alvaro",
        age : 20,
        gender : "Male",
        phone_number : 6282134828682
    },
    {
        id : 2,
        competition_id : 1,
        name : "Asep",
        age : 52,
        gender : "Male",
        phone_number : 612312312
    },
    {
        id : 3,
        competition_id : 2,
        name : "dadang",
        age : 2,
        gender : "Female",
        phone_number : 123123123
    },
]

//get all competitions image ,title, and category 
app.get('/competitions',(req,res) =>{
    const data = [competitions.map(
        comp => ({
            id : comp.id,
            title : comp.title,
            image : comp.image,
            category : comp.category
        })
    )]
    res.status(200).json({
        messages : "Success get all data",
        data : data
    })
})

//add competition to database
app.post('/competitions', (req,res) => {
    let {title,category,description,registration_fee,prize,registration_deadline} = req.body
    const {error} = validateData(req.body)
    if (error) {
        return res.status(400).json({
            messages: error.details[0].message
        })
    }

    const id = competitions.length + 1
    let image = req.files.image
    const filename = `/images/${title}.jpg`

    image.mv(path.join(__dirname,'public',filename))

    const newCompetition = {
        id,
        title,
        category,
        description,
        registration_fee : parseInt(registration_fee),
        prize : parseInt(prize),
        registration_deadline,
        image : filename
    }

    competitions.push(newCompetition)
    console.log(newCompetition)
    res.status(200).json({
        messages: "Success Add Data",
        data: newCompetition
    })
})

//edit competition
app.put('/competitions/:id', (req,res) =>{
    let {title,category,description,registration_fee,prize,registration_deadline} = req.body
    const {error} = validateData(req.body)
    if (error) {
        return res.status(400).json({
            messages: error.details[0].message
        })
    }

    const data = competitions.find(x => x.id == req.params.id)
    
    if (!data){
        return res.status(404).json({
            messages : "Data not found"
        })
    }
    
    
    let image = req.files.image
    const fileNameOld = data.image
    data.title = title
    data.category = category
    data.description = description
    data.registration_fee = registration_fee
    data.prize = prize
    data.registration_deadline = registration_deadline

    if(image){
        try{
            fs.unlinkSync(path.join(__dirname, 'public', fileNameOld))
        }catch(err) {
            console.log(err)
        }
        const filename = `/images/${title}.jpg`
        image.mv(path.join(__dirname, 'public', filename))
        data.image = filename
    }
    res.status(200).json({
        messages: "Success Update Data",
        data: data
      })
})

//delete competition
app.delete('/competitions/:id', (req,res) => {
    const data = competitions.find(x => x.id == req.params.id)
    if (!data){
        return res.status(404).json({
            messages : "Data not found"
        })
    }
    const index = competitions.indexOf(data)
    competitions.splice(index, 1)

    res.status(200).json({
        messages: "Success Delete Data",
        data: data
    })
})

//get competition detail by id (return semua attributes nya)
app.get('/competitions/:id', (req,res) => {
    const data = competitions.find(x => x.id == req.params.id)
    if (!data){
        return res.status(404).json({
            messages : "Data not found"
        })
    }

    console.log(data)
    res.status(200).json({
        messages : `Sucess get data with id : ${req.params.id}`,
        data : data
    })
    
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//register ke lomba    
app.post('/registration/post/:competition_id', (req,res) =>{ 
    const {name,age,gender,phone_number} = req.body
    const {error} = validateRegister(req.body)
    if (error) {
        return res.status(400).json({
            messages: error.details[0].message
        })
    }
    const id = registered.length + 1
    const competition_id = req.params.competition_id

    let newreg = {
        id,
        competition_id,
        name,
        age : parseInt(age),
        gender,
        phone_number : parseInt(phone_number)
    }

    registered.push(newreg)

    res.status(200).json({
        messages: "Success Add Data",
        data: newreg
    })
})

//edit data pendaftar 
app.put('/registration/:id',(req,res) => {
    let {name,age,gender,phone_number} = req.body
    const {error} = validateRegister(req.body)
    if (error) {
        return res.status(400).json({
            messages: error.details[0].message
        })
    }

    const data = registered.find(x => x.id == req.params.id)
    
    if (!data){
        return res.status(404).json({
            messages : "Data not found"
        })
    }

    data.name = name;
    data.age = parseInt(age)
    data.gender = gender
    data.phone_number = parseInt(phone_number)

    res.status(200).json({
        messages: "Success Update Data",
        data: data
      })
})

//get all data pendaftar
app.get('/registration', (req,res) =>{
    let data = registered.map(
        reg => ({
            id : reg.id,
            competition_title : competitions.find(x => x.id == reg.competition_id).title ,
            name : reg.name,
            age : reg.age,
            gender : reg.gender,
            phone_number : reg.phone_number 
        })
    )
    
    res.status(200).json({
        messages : "Success get all data",
        data : data
    })
})

//delete data pendaftar
app.delete('/registration/:id', (req,res) => {
    const data = registered.find(x => x.id == req.params.id)
    if (!data){
        return res.status(404).json({
            messages : "Data not found"
        })
    }

    const index = registered.indexOf(data)
    registered.splice(index, 1)

    res.status(200).json({
        messages: "Success Delete Data",
        data: data
    })
})

app.listen(port , (req,res) =>{
    console.log(`Running on port ${port}`)
})