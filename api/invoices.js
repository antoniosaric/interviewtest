const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');
var ObjectID = require('mongodb').ObjectID; 

const ENUMSORT = {"1": {"invoice_number":1},"2": {"distributor_address":1},"3": {"customer_address":1},"4": {"line_item.product_code":1}}

// @route   GET api/invoices
// @desc    Get current invoices
// @access  Public
router.get('/', async (req,res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); 
    res.setHeader('Access-Control-Allow-Credentials', true); 

    try{
        let invoice = [];

        invoice = await Invoice.aggregate([
            { $unwind: "$line_item" },
            { $sort: ENUMSORT[req.query.search] },
        ]);

        res.json(invoice);

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
} );

module.exports = router;

