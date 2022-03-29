const express = require('express')
const { update } = require('../models/userr')
const router = express.Router()
const User = require('../models/userr')

//get all user
router.get('/', async (req,res)=>{
    
    try{
        const users = await User.find()
        res.json(users)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

//create user
router.post('/',async (req,res)=>{
    const user = new User({
        username: req.body.username,
        password:req.body.password
    })
    try{
        const addUser = await user.save()
        res.status(201).json(addUser)
    }catch(error){
        res.status(400).json({message: error.message})
    }
})

//find user
router.get('/:id', getUser, async (req, res) =>{
    res.json(res.userzz) 
})

//delete
router.delete('/:id', getUser, async (req, res) =>{
    try{
        await res.userzz.remove()
        res.json({message:'Deleted user'})
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//UPDATE
router.patch('/:id', getUser, async (req, res) =>{
    if(req.body.username != null){
        res.userzz.username = req.body.username
    }
    if(req.body.password != null){
        res.userzz.password = req.body.password
    }
    try{
        const updateUser =  await res.userzz.save()
        res.json(updateUser)
    }catch(err){
        res.status(400).json({message:err.message})
    }
})


async function getUser (req, res, next){
    let userzz
    try{
        userzz = await User.findById(req.params.id)
        if(userzz == null){
            return res.status(404).json({message:'cannot find user'})
        }
    }catch(error){
        return res.status(500).json({message:error.message})
    }

    res.userzz = userzz
    next()
}

  

module.exports = router