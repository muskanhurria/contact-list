const { render } = require('ejs');
const express = require('express');
const port = 8000;
const path = require('path');

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();    //it conatins all functionality of express
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded());
app.use(express.static('assets'));

// app.use(function(req, res, next){
//     req.Myname = "sonal";
//     console.log("Middleware 1 called!!");
//     next();
// });

// app.use(function(req, res, next){
//     console.log("from MW2 ", req.Myname);
//     console.log("Middleware 2 called!!");
//     next();
// });

var contactList = [
    {
        name: "Muskan",
        phone: "9821587139"
    },
    {
        name: "Diya",
        phone: "9818668998"
    },
    {
        name: "Rakhi",
        phone: "111111111"
    }
]

app.get('/', function(req, res){
    // console.log("from GET ", req.Myname);
    // return res.render('home', {
    //     title: "My Contacts",
    //     contact_list: contactList
    // });

    Contact.find({}, function(err, contacts){
        if(err){
            console.log('Error in fetching contacts!!');
            return;
        }
        return res.render('home', {
            title: "My Contacts",
            contact_list: contacts
        });
    });
});

app.get('/practice', function(req, res){
    return res.render('practice', {
        title: "Let us play with EJS"
    });
});

app.post('/create-contact', function(req, res){

    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    // return res.redirect('/');

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){ 
            console.log('Error in creating contact!');
            return;
        }
        console.log('***************', newContact);
        return res.redirect('back');
    });

});

app.get('/delete-contact/', function(req, res){
    // console.log(req.query);
    // let phone = req.query.phone;
    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    // if(contactIndex != -1){
    //     contactList.splice(contactIndex, 1);
    // }
    // return res.redirect('back');

    let id = req.query.id;
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting an object from databse');
            return;
        }
        return res.redirect('back');
    });
    
});

app.listen(port, function(err){
    if(err){
        console.log("there was an error: ", err);
    }

    console.log("Server running on port: ", port);
});