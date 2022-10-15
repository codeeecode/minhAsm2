const express = require('express')
const ToyModel = require('../models/ToyModel')
const router = express.Router()

//URL: localhost:1000/toy
router.get('/', (req, res) => {
    ToyModel.find((err, data) => {
        if (!err) {
            //res.send(data)
            //render ra trang index ở thư mục views/student
            res.render('toy/index', { toy: data })
        }
    })
})

router.get('/delete/:id', (req, res) => {
    ToyModel.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Delete toy succeed !");
            //var message = "Delete student succeed !";
            //redirect về trang /student (URL không phải view)
            res.redirect("/toy");
        }
    })
})

//render ra form ADD
router.get('/add', (req, res) => {
    res.render("toy/new");
})

//nhận & xử lý dữ liệu từ form ADD
router.post('/add', (req, res) => {
    var toy = new ToyModel(req.body)
    toy.save((err) => {
        if (!err) {
            console.log("Add toy succeed !")
            res.redirect("/toy")
        }
    })
})


//render ra form EDIT
router.get('/edit/:id', (req, res) => {
    ToyModel.findById(req.params.id, (err, data) => {
        if (!err) {
            //render ra file: update.hbs (trong thư mục views/student)
            //gửi kèm dữ liệu của object student để load vào form edit
            //student (tên) , data (dữ liệu)
            res.render("toy/update", { toy: data })
        }
    })
})

//nhận & xử lý dữ liệu từ form EDIT
router.post('/edit/:id', (req, res) => {
    var id = req.params.id;
    var toy = req.body;
    ToyModel.findByIdAndUpdate(id, toy, (err) => {
        if (!err) {
            console.log("Update toy succeed !")
            res.redirect("/toy")
        }
    })
})

router.get('/detail/:id', (req, res) => {
    ToyModel.findById(req.params.id, (err, toy) => {
        if (!err) {
            res.render('toy/info', { toy: toy })
        }
    })
})
module.exports = router