var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var {stockclient} = require('./stockclient') 

var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', function(req, res){
    res.redirect("/home");
})

//Get home view
router.get('/', function(req, res){
    res.render('home');
});

//function to deposit quantity in server
router.post('/deposit', function(req, res) {
    var userId = req.body.userId;
    var stock = req.body.quantity;
    var stockclient1 = new stockclient(userId); 
    stockclient1.deposit(quantity);    
    res.send({message:"quantity "+ quantity +" successfully added"});
});

//function to request quantity to wholesaler
router.post('/request', function(req, res) {
    var userId = req.body.userId;
    var beneficiary = req.body.beneficiary;
    var quantity = req.body.quantity;
    var client = new stockclient(userId);
    client.request(beneficiary, quantity);    
    res.send({ message:"quantity "+ quantity +" requested to " + beneficiary});
});

//function to transfer quantity to retailer
router.post('/transfer', function(req, res) {
    var userId = req.body.userId;
    var beneficiary = req.body.beneficiary;
    var quantity = req.body.quantity;
    var client = new stockclient(userId);
    client.transfer(beneficiary, quantity);    
    res.send({ message:"quantity "+ quantity +" successfully added to " + beneficiary});
});

router.post('/stock', function(req, res){
    var userId = req.body.userId;
    var client = new stockclient(userId);
    var getYourStock = client.stock();
    console.log(getYourStock);
    getYourStock.then(result => {res.send({ stock: result, message:"quantity " + result + " available"});});
})
module.exports = router;
