'use strict';
 
var server=require('server');
 
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
 
var Transaction = require('dw/system/Transaction');
 
var URLUtils = require('dw/web/URLUtils');  
 
 
// This routing is used to show the register form for Student
server.get('registerForm',function(req,res,next){
 
    var registrationForm = server.forms.getForm('studentForm');
    registrationForm.clear();
    res.render('student/studentRegisterForm',{registrationForm:registrationForm});
    next();
 
});
 
// This routing is used to Saving the student data
server.get('saveRegisterForm',function(req,res,next){
 
    var registrationForm = server.forms.getForm('studentForm');
    var studentData=CustomObjectMgr.getCustomObject('Student',registrationForm.student.email.value);
    Transaction.wrap(function(){
 
    if(!studentData){
         studentData=CustomObjectMgr.createCustomObject('Student',registrationForm.student.email.value);
    }
 
    studentData.custom.id=registrationForm.student.id.value;
    studentData.custom.name=registrationForm.student.name.value;
    studentData.custom.email=registrationForm.student.email.value;
    studentData.custom.dob=registrationForm.student.dob.value;
    studentData.custom.phone=registrationForm.student.phone.value;
 
    });
 
 
    res.render('student/success',{student:studentData})
 
    next();
});
 
 
// This routing is used to show the updating form of student
server.get('edit',function(req,res,next){
 
    var registrationForm = server.forms.getForm('studentForm');
    var studentData=CustomObjectMgr.getCustomObject('Student',req.querystring.email);
 
    res.render('student/updateStudentForm',{
        studentData:studentData,
        registrationForm:registrationForm
    });
 
    next();
 
});
// This routing is used to update the student details
server.get('updateStudent',function(req,res,next){
 
    var registrationForm = server.forms.getForm('studentForm');
    var studentData=CustomObjectMgr.getCustomObject('Student',registrationForm.student.email.value);
    Transaction.wrap(function(){
 
    studentData.custom.name=registrationForm.student.name.value;
    studentData.custom.dob=registrationForm.student.dob.value;
    studentData.custom.phone=registrationForm.student.phone.value;
 
    });
 
 
    res.redirect(URLUtils.url('Student-getAllStudents'));
 
    next();
});
 
// This routing is used to retrive all the student data
server.get('getAllStudents',function(req,res,next){
 
    var studentsIterator = CustomObjectMgr.getAllCustomObjects('Student');
 
    // Step 2: Initialize an empty array to store the students
    var studentsList = [];
   
    // Step 3: Iterate over the retrieved custom objects and store them in the list
    while (studentsIterator.hasNext()) {
        var student = studentsIterator.next();
        studentsList.push(student);
    }
   
    res.render('student/studentList',{studentList:studentsList});
 
    next();
});
 
 
// This routing is used to delete the student data
server.get('delete',function(req,res,next){
    var studentData=CustomObjectMgr.getCustomObject('Student',req.querystring.email);
    Transaction.wrap(function() {
        CustomObjectMgr.remove(studentData);
    });
    res.redirect(URLUtils.url('Student-getAllStudents'));
    next();
 
});
 
module.exports=server.exports();
 