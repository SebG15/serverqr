const bcrypt = require ("bcryptjs")
const User = require("../models/user.js")
const jwt = require("../utils/jwt")

function register (req, res){
    const{firstname,lastname,password,email} = req.body;
    
    if(!email) res.status(400).send({msg: "El email es obligatorio"});
    if(!password) res.status(400).send({msg: "El password es obligatorio"});


    const user = new User({
        firstname,
        lastname,
        email:email.toLowerCase(),
        password,
        role:"user",
        active: false,
    });
    
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password,salt)
    user.password = hashPassword;

    user.save((error,userStorage)=>{

        if(error){
            res.status(400).send({msg:"Error registrando usuario"});
        } else{
            res.status(200).send(userStorage);
        }

    }) 
    
}

function login(req,res){
    const {email, password}=req.body;

    //if(!email) res.status(400).send({msg:"El email es obligatorio"});
    //if(!password) res.status(400).send({msg:"Password requerido"});

    const emailLowerCase =email.toLowerCase();
    
    User.findOne({email:emailLowerCase}, (err, userStorage)=>{
        // validacion de usuario no registrado
        if (!userStorage){
            res.status(400).send({msg:""})
        }
        else if(err){
            
            
            res.status(500).send({msg:"Error del servidor"})
        } 
        
        
        else{
            bcrypt.compare(password,userStorage.password, (bcryptError, check)=>{

                if(bcryptError){
                    res.status(500).send({msg:"Error en el server"});

                }else if(!check){
                    res.status(400).send({msg:"Error al ingresar, email o contra incorrecta"});

                } else if(!userStorage.active){
                    res.status(401).send({msg:"Usuario inactivo =("});
                }

                else{
                    res.status(200).send({
                        access: jwt.createAccessToken(userStorage),
                        refresh: jwt.createRefreshToken(userStorage)
                    });
                }


            })
            
        }

    })

}
function refreshAccessToken(req, res){
    const {token} = req.body;

    const {user_id} = jwt.decoded(token)
    
    User.findOne({_id:user_id}, (error, userStorage)=>{
        if(error){
            res.status(500).send({msg:"Error en el servidor"});
        }else{
            res.status(200).send({
                accessToken: jwt.createAccessToken(userStorage),
            })
        }
    });
}

module.exports={
    register,
    login,
    refreshAccessToken
}