const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');
var ObjectID = require('mongodb').ObjectID; 

const ENUM = {
    "1": {"invoice_number": 1},
    "2": {"distributor_address": 1},
    "3": {"customer_location": 1},
    "4": {"product_code": 1}
}

// @route   GET api/invoices
// @desc    Get current invoices
// @access  Public
router.get('/', async (req,res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    try{
        // res.json(req.user.id)

        let invoice = [];

        if( req.query.search != "4" ){
            invoice = await Invoice.find().sort(ENUM[req.query.search]);
        }else{
            invoice = await Invoice.aggregate([
                { $unwind: "$items" },
                { $sort: { "items.order": 1 } },
                { $group: { _id: "$_id", items: { $push: "$items" } } }
            ]);
        }

        res.json(invoice);

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
} );

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const Invoice = require('../models/Invoice');
// var ObjectID = require('mongodb').ObjectID; 

// const ENUM = {
//     "1": {"invoice_number": 1},
//     "2": {"distributor_address": 1},
//     "3": {"customer_location": 1},
//     "4": {"line_item.$[].product_code": 1}
// }

// // @route   GET api/invoices
// // @desc    Get current invoices
// // @access  Public
// router.get('/', async (req,res) => {

//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
//     res.setHeader('Access-Control-Allow-Credentials', true); // If needed

//     try{
//         // res.json(req.user.id)

//         let invoices = [];


//         invoices = await Invoice.find()
            
//             // let invoices = Invoice.aggregate([
//             //     { $unwind: "$line_item" },
//             //     { $sort: ENUM[req.query.search] },
//             //     { $group: { _id: "$_id", line_item: { $push: "$line_item" } } }
//             // ])
        

//         res.json(invoices);

//     }catch(err){
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// } );

// module.exports = router;
