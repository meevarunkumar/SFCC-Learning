'use strict';
 
var server = require('server');
var base = module.superModule;
server.extend(base);

var Resource = require('dw/web/Resource');

server.append('Show',function(req, res, next) {

    var getViewData = res.getViewData();

    var additionalInfo= Resource.msgf('label.input.product.additionalData','forms',null,'is', 'very Good')
    // Add additional info and content asset data to the view data
    res.setViewData({additionalInfo: additionalInfo});  
    next();
})
module.exports = server.exports();