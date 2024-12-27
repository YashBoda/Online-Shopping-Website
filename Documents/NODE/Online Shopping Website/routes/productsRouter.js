const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");

router.get("/", (req, res) => {
  res.send("Hey [product Router]");
});

router.post("/create", upload.single("image"), async (req, res) => {
  try
  {
        let { name, price, discount, bgcolor, panelcolor, textcolor } =
        req.body;

        let product = await productModel.create({

        image: req.file.buffer,
        name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor

         });


    req.flash('success','Product created succcessfully')
    res.redirect('/owners/admin')
}
catch(err){
    res.send(err.message)
}
});

module.exports = router;
