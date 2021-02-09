const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
    invoice:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'invoice'
    },
    invoice_date:{
        type: Date,
        default: Date.now
    },
    invoice_number:{
        type: Number
    },
    customer_name: {
        type: String
    },
    customer_address: {
        type: String
    },
    customer_contact: {
        type: String
    },
    total_purchases: {
        type: Number
    },
    distributor_name: {
        type: String
    },
    distributor_address: {
        type: String
    },
    distributor_contact: {
        type: String
    },
    line_item: [  
        {
            product_code:{
                type: Number 
            },
            description:{
                type: String
            },
            manufacturer_name:{
                type: String
            },
            manufacturer_address:{
                type: String
            },
            manufacturer_contact:{
                type: String
            },
            qty:{
                type: Number,
                default: 0
            },
            weight:{
                type: Number
            },
            unit_of_measure:{
                type: String
            },
            unit_price:{
                type: Number,
                default: 0
            }
        }
    ]
});

module.exports = Invoice = mongoose.model('invoice', InvoiceSchema);