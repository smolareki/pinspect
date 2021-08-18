const express = require("express");
const routes = express.Router();

const productRoute = `/view/product/`

const Commerce = require("./controller/apiCommerce");

//routes.get("/", (request, response) => response.json({"message": "System is up!"}));
routes.get('/:id/product', (req, res) => {
    res.render('pages/index.ejs')
  })

routes.post("/layer", Commerce.GetProduct);




module.exports = routes;