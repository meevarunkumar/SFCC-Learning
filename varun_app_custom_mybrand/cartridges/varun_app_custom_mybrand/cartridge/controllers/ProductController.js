'use strict';
 
var server = require('server');
var URLUtils = require('dw/web/URLUtils');
var ProductSearchModel = require('dw/catalog/ProductSearchModel');
var CatalogMgr = require('dw/catalog/CatalogMgr');
/**
 * This controller is responsible for displaying categories and retrieving products based on the selected category.
 */
 
server.get('ShowCategories', function (req, res, next) {
   
    var categories = CatalogMgr.getSiteCatalog().getRoot().getOnlineSubCategories();
 
    res.render('categories', { categories: categories });
    next();
});
 
module.exports = server.exports();