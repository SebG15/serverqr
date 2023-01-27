const Menu = require("../models/menu");


async function createMenu (req,res){
    const menu = new Menu(req.body);
    menu.save((error, menuStored)=>{

        if(error){
            res.status(400).send({msg:"Error creando el menu"});
        } else{
            res.status(200).send(menuStored)
        }
    });
}

async function  getMenus(req, res){
    const {active} = req.query;
    let response =null;

    if(active===undefined){
        response = await Menu.find().sort({order:"asc"});
    } else {
        response = await Menu.find({active}).sort({order:"asc"});
    }
    
         
        
        if(!response){
            res.status(400).send({msg:"No se encontraron menus"});
        } else{
            res.status(200).send(response)
        }
    
}

async function updateMenu(req, res){
    const {id} = req.params;
    const menuData = req.body;
    
    Menu.findByIdAndUpdate({_id: id}, menuData, (error)=>{
        if(error){
            res.status(400).send({msg:"No se pudo actualizar"});

        }else{
            res.status(200).send({msg:"Se actualizó el menu"})
        }
    });
};

async function deleteMenu (req, res){
    const{id} = req.params;
    Menu.findByIdAndDelete(id, (error)=>{
        if(error){
            res.status(400).send({msg:"no se pudo eliminar el menu"})
        } else{
            res.status(200).send({msg:"Se ha eliminado el menu"});
        }
    })
}

module.exports={
    createMenu,
    getMenus,
    updateMenu,
    deleteMenu,
};