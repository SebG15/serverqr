const express = require("express");
const multiparty = require("connect-multiparty");
const TaxiController = require("../contollers/taxi");
const md_auth = require ("../middlewares/authenticated");

const md_upload = multiparty({uploadDir:"./uploads/taxis"});

const api = express.Router();

api.post("/taxi",[md_auth.asureAuth, md_upload], TaxiController.createTaxi);
api.get("/taxis",[md_auth.asureAuth],TaxiController.getTaxis);
api.patch("/taxi/:id",[md_auth.asureAuth,md_upload],TaxiController.updateTaxi);
api.delete("/taxi/:id",[md_auth.asureAuth],TaxiController.deleteTaxi);

module.exports= api;
