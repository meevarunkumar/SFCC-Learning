'use strict';

var server = require('server');

var Template = require("dw/util/Template");
var HashMap = require("dw/util/HashMap");
server.get('Page', function (req, res, next){
    
 res.page('summersale' );
    next();
});
server.get('test', function (req, res, next){
    
    var context = new HashMap();
    context.put("productDetails", "productDetails");
    context.put("email", "notifyMe.custom.email");
    var template = new Template("index");
    var content= template.render(context).text;

    res.render('/index', {
        content: content
    });
    next();
});


server.get('Carousel', function (req, res, next){
    
 res.page('newhomepage' );
    next();
});


server.get('Web', function (req, res, next){
    var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
    var svc = LocalServiceRegistry.createService('zipCodeServiceApi',{
        createRequest: function(svc, param) {
            svc.setRequestMethod("GET");
            return"";
        },
        parseResponse : function(svc, responseObject) {
           return responseObject; 
        }
    });
    var result = svc.call();
if(result.status == 'OK') {
   res.render("webServices/zipCodeService",{result:result.status})
} 
});



module.exports = server.exports();