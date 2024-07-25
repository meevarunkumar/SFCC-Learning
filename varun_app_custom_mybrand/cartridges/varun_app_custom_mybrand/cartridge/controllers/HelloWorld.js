'use strict';

var server = require('server');

server.get('Show', 
    function (req, res, next) {
     var CatalogMgr = require('dw/catalog/CatalogMgr');
    var categories = CatalogMgr.getSiteCatalog().getRoot().getOnlineSubCategories();
 
    res.render('categories', { categories: categories });
    next();
});

server.get('getCustomerGroup', function (req, res, next){
    var CustomerMgr = require('dw/customer/CustomerMgr');
    var customerGroup = CustomerMgr.getCustomerGroups();
    
    res.render("customerGroup",{
        customerGroup: customerGroup
    });
    next();
});
server.get('testingForm', function (req, res, next){

   var testingForm= server.forms.getForm('testing');
   
    res.render("testingForm",{
        testingForm: testingForm
    });
    next();
});

server.get('Start', function (req, res, next){
res.render("contentslottest",{} );
    next();
});
server.get('getPage', function (req, res, next){


   var PageMgr = require('dw/experience/PageMgr');
  var page=  PageMgr.getPage("summersale")
    res.page('homepagex' );
    next();
});

module.exports = server.exports();