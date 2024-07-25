'use strict'
 
var server = require('server');
 
server.get('Show', function(req, res, next) {
 
    var contentMgr = require('dw/content/ContentMgr');
    var content = contentMgr.getContent('ecommerce_info')
 
    res.render('contentAsset', {content:content});
    next();
});
 
module.exports = server.exports();

