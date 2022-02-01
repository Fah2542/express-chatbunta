const express = require('express');
const app = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth')

app.get("/", productController.getProducts);

app.get("/:id",productController.getProductById);

app.get("/name/:name",productController.getProductByName);

app.post("/", auth, productController.addProduct);

app.put("/:id", auth,productController.editWholeProduct);

app.patch("/:id",auth, productController.editProduct);

app.delete("/:id", auth, productController.deleteProduct);

module.exports = app;