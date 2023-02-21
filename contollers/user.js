const User = require("../models/user");
const bcrypt= require("bcryptjs");
const image = require ("../utils/image");
const { findById, findByIdAndUpdate } = require("../models/user");

async function getMe(req, res){
    const{user_id}= req.user;


    const response = await User.findById(user_id);
    if(!response){
        res.status(400).send({msg:"No se encontró el usuario"});

    } else {
        res.status(200).send(response);
    }


    
}

async function getUsers(req, res){

    const {active} = req.query;
    let response =null;

    if(active===undefined){
        response = await User.find();
    } else {
        response = await User.find({active})
    }
    
        res.status(200).send(response);    

}

// Funcion para crear usuarios desde administracion 

async function createUser(req, res){
    const {password}= req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password,salt);    
    const user = new User({...req.body,active:false, password:hashPassword});
    
    if(req.files.avatar){
        const imagePath = image.getFilePath(req.files.avatar);
        user.avatar = imagePath
        
    };
    

    user.save((err, userStored)=>{
        if(err){
            res.status(400).send({msg:"no se creó el usuario"});
        }else{
            res.status(201).send(userStored);
        }

    });

}
//Funcion para actualizar el usuario
async function updateUser(req,res){
    const {id} = req.params;
    const userData = req.body;

    if(userData.password){
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(userData.password,salt);
        userData.password = hashPassword;

    }else {
        delete userData.password;
    }

    if(req.files.avatar){
        const imagePath = image.getFilePath(req.files.avatar);
        userData.avatar = imagePath;
    }

    User.findByIdAndUpdate({_id:id}, userData, (error) =>{
        if(error){
            res.status(400).send({msg:"Error actualizando user"})
        } else{
            res.status(200).send({msg:"Se actualizó el usuario"})
        }
    })

    

}

async function deleteUser (req, res){
    const {id} = req.params;
    User.findByIdAndDelete(id,(error) =>{
        if(error){
            res.status(400).send({msg:"No se pudo eliminar el user"})
        }else{
            res.status(200).send({msg:"Se ha eliminado el user."})
        }
        
    });
}

module.exports={
    getMe,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
}