const { query } = require("express");
const Taxi = require("../models/taxi");

const image = require("../utils/image")


async function createTaxi(req,res){
    const taxi = new Taxi(req.body);
    //const imagePath = image.getFilePath(req.files.foto);
    //taxi.foto = imagePath;   

    //taxi.path = `QrTaxi-${imagePath.slice(6,14)}`;

    if(req.files.foto){
        const imagePath = image.getFilePath(req.files.foto);
        taxi.foto = imagePath;   

        taxi.path = `QrTaxi-${imagePath.slice(6,14)}`;
        
       
        
    };

    taxi.save((error,taxiStored)=>{
        if(error){
            // Hay que hacer una validación de que ya ha sido creado el taxi
            res.status(400).send({msg:"NO se ha podido guardar la informacion"})
        } else{
            res.status(200).send(taxiStored)
        }
    });

}


function getTaxi ( req, res){
    const { page = 1, limit =10 } = req.query;

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: {created_at:"desc"},
    };
    Taxi.paginate({},options, (error, taxis)=>{
        if(error){
            res.status(400).send({msg:"Error al obtener los taxis"})
        } else{
            res.status(200).send(taxis)
        }

    });

    
}



function updateTaxi(req, res){
    const {id} = req.params;
    const taxiData = req.body;
    //Validacion de actualizacion de imagen
    if(req.files.foto){
        const imagePath = image.getFilePath(req.files.foto);
        taxiData.foto = imagePath;
    }

    Taxi.findByIdAndUpdate({_id: id},taxiData,(error)=>{
        
        if(error){
            res.status(400).send({msg:"No se pudo actualizar el taxi"})
        } else{
            res.status(200).send({msg:"Se actualizaron los datos del taxi"})
        }
    } );
}

function deleteTaxi(req,res){
    const {id}= req.params;
    Taxi.findByIdAndDelete(id,(error)=>{
        if(error){
            res.status(400).send({msg:"No se pudo eliminar el taxi"});
            
        }else{
            res.status(200).send({msg:"Se eliminó el taxi"});
        }
    });
}

function getTaxis(req,res){
    const {path} = req.params;
    Taxi.findOne({path}, (error, taxiStored) =>{
        if(error){
            res.status(500).send({msg:"Error en el server"})
        } else if (!taxiStored){
            res.status(400).send({msg:"No se encontró el usuario"})
        } else{
            res.status(200).send({taxiStored})
        }

    })
}

module.exports = {
    createTaxi,
    //getTaxis,
    getTaxi,
    updateTaxi,
    deleteTaxi,
    getTaxis

};