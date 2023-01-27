const moongose =require("mongoose");

const MenuSchema =moongose.Schema({
    title: String,
    path: String,
    order: Number,
    active: Boolean,
});

module.exports = moongose.model("Menu",MenuSchema);

