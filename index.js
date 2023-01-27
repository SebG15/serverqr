const mongoose = require("mongoose");
const { listen } = require("./app");
mongoose.set('strictQuery', false);
const app = require("./app")


const {
    DB_USER,DB_PASSWORD,DB_HOST,IP_SERVER,API_VERSION
} = require("./constants");

const PORT=5050;

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`,
    
     (error)=>{
        if (error) console.log("hay un error, "+error);

        app.listen(PORT,()=>{
            console.log("La conexion es exitosa!, okk =)");
            console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}`)

        });
            
        

        
    }); 
   
