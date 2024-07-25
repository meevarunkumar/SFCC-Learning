'use strict';
 
var server = require('server');
var base = module.superModule;
server.extend(base);
 
server.append('SubmitRegistration',function (req, res, next) {
        var registrationForm = server.forms.getForm('profile');
        var phoneBusiness = registrationForm.customer.phoneBusiness.value;
        var middlename = registrationForm.customer.middlename.value;
        if (registrationForm.valid) {
            var registrationFormObj = {
                phoneBusiness: phoneBusiness,
                middlename:middlename
            };
            res.setViewData(registrationFormObj);
        }    
        this.on('route:BeforeComplete', function (req, res) {
            var registrationForm = res.getViewData();            
            var login = registrationForm.email;
            var CustomerMgr = require('dw/customer/CustomerMgr');
            var customer = CustomerMgr.getCustomerByLogin(login);
            var customerProfile = customer.getProfile();
            var Transaction = require('dw/system/Transaction');
            if (registrationForm.validForm) {
                Transaction.wrap(function () {
                    customerProfile.phoneBusiness = registrationForm.phoneBusiness;
                    customerProfile.custom.middleName=registrationForm.middlename;
                });
            }
        });
        return next();
    }
);
module.exports = server.exports();