const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');
var ObjectID = require('mongodb').ObjectID; 
const mysql = require('mysql');

// @route   GET api/invoices
// @desc    Get invoices
// @access  Public
router.get('/', async (req,res) => {
    try{
        // res.json(req.user.id)
        var con = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "",
          database: "interview"
        });
        const invoices = await con.connect(function(err) {
            if (err) throw err;

            con.query(`SELECT DISTINCT
            invoices.InvoiceNumber AS InvoiceNumber,
            invoices.PurchaseDate AS PurchaseDate,
            invoices.TotalPurchases AS TotalPurchases,
            invoice_line.Qty AS Qty,
            invoice_line.UnitOfMeasure AS UnitOfMeasure,
            invoice_line.UnitPrice AS UnitPrice,
            invoice_line.Weight AS Weight,
            manufacturer.Name AS MName,
            manufacturer.Address AS MAddress,
            manufacturer.Contact AS MContact,
            distributor_location.Name AS DName,
            distributor_location.Address AS DAddress,
            distributor_location.Contact AS DContact,
            customer_location.Name AS CName,
            customer_location.Address AS CAddress,
            customer_location.Contact AS CContact,
            product.Description AS Description, 
            product.ProductCode AS ProductCode 
            FROM invoices 
            LEFT JOIN invoice_line ON invoice_line.InvoiceId = invoices.Id 
            LEFT JOIN product ON product.Id = invoice_line.ProductId
            LEFT JOIN distributor_location ON distributor_location.Id = invoices.DistributorLocationId 
            LEFT JOIN manufacturer ON manufacturer.Id = product.ManufacturerId
            LEFT JOIN customer_location ON customer_location.Id = invoices.CustomerLocationId ORDER BY invoices.Id
            `, function (err, result, fields) {
              if (err) throw err;

                if(!!result && result.length > 0){ 

                    let invoiceObj = {};
                    invoiceObj.line_item = [];

                    for( let i = 0; i < result.length; i++){

                        invoiceObj.invoice_date = result[i].PurchaseDate;
                        invoiceObj.invoice_number = result[i].InvoiceNumber;
                        invoiceObj.customer_name = result[i].CName;
                        invoiceObj.customer_address = result[i].CAddress;
                        invoiceObj.customer_contact = result[i].CContact;
                        invoiceObj.distributor_name = result[i].DName;
                        invoiceObj.distributor_address = result[i].DAddress;
                        invoiceObj.distributor_contact = result[i].DContact;
                        invoiceObj.total_purchases = result[i].TotalPurchases;

                        let breakLoop = result[i].TotalPurchases;
                        let marker = 0;

                        while( breakLoop ){
                            
                            invoiceObj.line_item.push({
                                product_code: result[i+marker].ProductCode,
                                description: result[i+marker].Description,
                                manufacturer_name: result[i+marker].MName,
                                manufacturer_address: result[i+marker].MAddress,
                                manufacturer_contact: result[i+marker].MContact,
                                qty: result[i+marker].Qty,
                                weight: result[i+marker].Weight,
                                unit_of_measure: result[i+marker].UnitOfMeasure,
                                unit_price: result[i+marker].UnitPrice,
                                weight: result[i+marker].Weight
                            });
                            marker++;
                            breakLoop--;
                        }
                        i = i + result[i].TotalPurchases - 1;

                        invoice = new Invoice(invoiceObj);
                        invoice.save();

                        invoiceObj = {};
                        invoiceObj.line_item = [];
                    } 

                }
            });
        });

        res.status(200).send('Migration Complete');
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
} );

module.exports = router;
