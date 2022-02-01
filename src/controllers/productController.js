// Import Product Schema
const Product = require('../models/productModel');
exports.getProducts = async (req, res) => {

    //equal to db.products.find();
    Product.find()      // equal to db.products.find();
        .exec((err, result) => {
            res.status(200).json({
                msg: "OK",
                data: result
            });
        });
};

exports.getProductById = async (req, res) => {
    Product.findById(req.params.id)     //find product by id
        .exec((err, result) => {
            res.status(200).json({
                msg: "OK",
                data: result
            });
        });
};

exports.getProductByName = async (req, res) => {
    let productName = req.params.name;
    Product.find({      //find product by a name field, using regular expression
            name: {
                $regex: new RegExp(productName),
                $options: 'i'
            }
        })
        .exec((err, result) => {
            res.status(200).json({
                msg: "OK",
                data: result
            });
        });
};

exports.addProduct = async (req, res) => {
    try {
        // define a new product schema, define data from request body
        let product = new Product({
            name: req.body.name,
            price: req.body.price,
            unit_in_stock: req.body.unit_in_stock
            // no reviews yet for now
        });
        // store result from saving
        let createdProduct = await product.save();
        res.status(200).json({
            msg: "Add a product complete.",
            data: createdProduct
        });
    } catch (err) {
        // if there is an error, it will jump to here
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

exports.editWholeProduct = async (req, res) => {
    let product = {
        name: req.body.name,
        price: req.body.price,
        unit_in_stock: req.body.unit_in_stock
    };
    Product.findByIdAndUpdate(req.params.id, product)       //find by id first, then update the returned document
        .exec((err, result) => {
            Product.findById(req.params.id)
                .exec((err, result) => {
                    // return doc ที่แก้ไขแล้วกลับไป
                    res.status(200).json({
                        msg: "OK",
                        data: result
                    });
                });
        });
};

// สมมติว่าให้ การเพิ่ม Review มาทำใน editProduct
exports.editProduct = async (req, res) => {
    let reviewData = {
        $push: {
            reviews:
            {
                star: req.body.star,
                comment: req.body.comment
            }
        }
    };
    Product.findByIdAndUpdate(req.params.id, reviewData)
        .exec((err, result) => {
            Product.findById(req.params.id)
                .exec((err, result) => {
                    // return doc ที่แก้ไขแล้วกลับไป
                    res.status(200).json({
                        msg: "OK",
                        data: result
                    });
                });
        });
};

exports.deleteProduct = async (req, res) => {
    Product.findByIdAndDelete(req.params.id)        //find product by id, then delete
        .exec((err)=>{
            if(err){
                res.status(500).json({
                    msg: err
                });
            } else{
                res.status(200).json({
                    msg: "Delete complete"
                });
            }
        });
};