const jwt = require("../utils/jwt");

function asureAuth(req, res, next) {

    if(!req.headers.authorization){
        return res.status(403).send({msg:"No tiene acceso"});

    }

    const token = req.headers.authorization.replace("Bearer ","");
    
try {

    const payload = jwt.decoded(token);
    const {exp}= payload;
    const currentDate = new Date().getTime();

    if(exp <= currentDate){
        return res.status(400).send({msg:"El token ha expirado =("});

    }
    req.user = payload;
    next();
    
} catch (error) {
    return res.status(400).send({msg:"token invalido"})
    
}

    
};

module.exports={
    asureAuth
};