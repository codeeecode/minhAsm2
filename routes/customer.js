const express = require('express')
const CustomerModel = require('../models/CustomerModel')
const router = express.Router()

//URL: localhost:1000/toy
router.get('/', (req, res) => {
    CustomerModel.find((err, data) => {
        if (!err) {
            //res.send(data)
            //render ra trang index ở thư mục views/student
            res.render('customer/index', { customer: data })
        }
    })
})

router.get('/delete/:id', (req, res) => {
    CustomerModel.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Delete customer succeed !");
            //var message = "Delete student succeed !";
            //redirect về trang /customer (URL không phải view)
            res.redirect("/customer");
        }
    })
})

//render ra form ADD
router.get('/add', (req, res) => {
    res.render("customer/new");
})

//nhận & xử lý dữ liệu từ form ADD
router.post('/add', (req, res) => {
    var customer = new CustomerModel(req.body)
    toy.save((err) => {
        if (!err) {
            console.log("Add customer succeed !")
            res.redirect("/customer")
        }
    })
})


//render ra form EDIT
router.get('/edit/:id', (req, res) => {
    CustomerModel.findById(req.params.id, (err, data) => {
        if (!err) {
            //render ra file: update.hbs (trong thư mục views/student)
            //gửi kèm dữ liệu của object student để load vào form edit
            //student (tên) , data (dữ liệu)
            res.render("customer/update", { customer: data })
        }
    })
})

//nhận & xử lý dữ liệu từ form EDIT
router.post('/edit/:id', (req, res) => {
    var id = req.params.id;
    var toy = req.body;
    CustomerModel.findByIdAndUpdate(id, toy, (err) => {
        if (!err) {
            console.log("Update customer succeed !")
            res.redirect("/customer")
        }
    })
})

router.get('/detail/:id', (req, res) => {
    // (err,data)(customer: data)
    CustomerModel.findById(req.params.id, (err, customer) => {
        if (!err) {
            res.render('customer/info', { customer: customer })
        }
    })
})



//search function
router.post('/search', (req, res) => {
        CustomerModel.find({ name: new RegExp(req.body.name, "i") }, (err, data) => {
            if (!err) {
                res.render('customer/index', { customer: data })
            }
        })
    })
    //sort function
router.get('/sort/asc', (req, res) => {
    CustomerModel.find()
        .sort({ name: 1 })
        .exec((err, data) => {
            if (!err) {
                res.render('customer/index', { customer: data })
            }
        })
})
router.get('/sort/desc', (req, res) => {
    CustomerModel.find()
        .sort({ name: -1 })
        .exec((err, data) => {
            if (!err) {
                res.render('customer/index', { customer: data })
            }
        })
})



module.exports = router