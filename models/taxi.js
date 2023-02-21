// en el curso esta es la seccion de cursos
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const TaxiSchema =mongoose.Schema({
    placa: {
        type: String,
        unique: true,

    },
    empresa : String,
    numeroInterno:String,
    conductor: String,
    activo : Boolean,
    foto : String,
    path: {
        type:String,
        unique: true,
    }
});

TaxiSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Taxi",TaxiSchema);