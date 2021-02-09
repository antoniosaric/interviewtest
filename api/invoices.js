const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');
var ObjectID = require('mongodb').ObjectID;   

// @route   GET api/invoices
// @desc    Get current invoices
// @access  Private
router.get('/', async (req,res) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    try{
        // res.json(req.user.id)
        const invoice = await Invoice.find();

        if(!invoice){
            invoice = []
        }

        res.json(invoice);

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
} );

module.exports = router;
