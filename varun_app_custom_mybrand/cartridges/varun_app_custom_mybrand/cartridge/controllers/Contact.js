'use strict';
 
/**
 * @namespace Contact
 */
 
var server = require('server');

 
/**
 * ContactUs-Landing : This endpoint is called to load contact us landing page
 * @name Base/ContactUs-Landing
 * @function
 * @memberof ContactUs
 * @param {middleware} - server.middleware.https
 * @param {category} - sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.get('Landing', server.middleware.https, function (req, res, next) {
    var URLUtils = require('dw/web/URLUtils');
 
    res.render('contact/contact', {
        actionUrl: URLUtils.url('Contact-Submit').toString()
    });
 
    next();
});
 
/**
 * ContactUs-Subscribe : This endpoint is called to submit the shopper's contact information
 * @name Base/ContactUs-Subscribe
 * @function
 * @memberof ContactUs
 * @param {middleware} - server.middleware.https
 * @param {httpparameter} - contactFirstName - First Name of the shopper
 * @param {httpparameter} - contactLastName - Last Name of the shopper
 * @param {httpparameter} - contactEmail - Email of the shopper
 * @param {httpparameter} - contactTopic - ID of the "Contact Us" topic
 * @param {httpparameter} - contactComment - Comments entered by the shopper
 * @param {category} - sensitive
 * @param {returns} - json
 * @param {serverfunction} - post
 */
server.post('Submit', server.middleware.https, function (req, res, next) {
    var Resource = require('dw/web/Resource');
    var CustomObjectMgr = require('dw/object/CustomObjectMgr');
    var Transaction = require('dw/system/Transaction');     
 
    var myForm = req.form;
    if (true) {
        var contactDetails = [myForm.name, myForm.email];
        var contactData=CustomObjectMgr.getCustomObject('contact',myForm.email);

        Transaction.wrap(function(){
        if(!contactData){
             contactData=CustomObjectMgr.createCustomObject('contact',myForm.email);
          }
            contactData.custom.name=myForm.name;
       });
 
        res.json({
            success: true,
            msg: "Hi "+ contactDetails[0] + " we will reach out to  you  soon on " + contactDetails[1]
        });
    } else {
        res.json({
            error: true,
            msg: Resource.msg('subscribe.to.contact.us.email.invalid', 'contactUs', null)
        });
    }
 
    next();
});
module.exports = server.exports();
 
