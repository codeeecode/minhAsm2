const express = require('express')
const CardModel = require('../models/CardModel')
const router = express.Router()

//URL: localhost:1000/toy
router.get('/', (req, res) => {
    CardModel.find((err, data) => {
        if (!err) {
            //res.send(data)
            //render ra trang index ở thư mục views/card
            res.render('card/index', { card: data })
        }
    })
})

router.get('/delete/:id', (req, res) => {
    CardModel.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Delete card succeed !");
            //var message = "Delete card succeed !";
            //redirect về trang /card (URL không phải view)
            res.redirect("/card");
        }
    })
})

//render ra form ADD
router.get('/add', (req, res) => {
    res.render("card/new");
})

//nhận & xử lý dữ liệu từ form ADD
router.post('/add', (req, res) => {
    var card = new CardModel(req.body)
    card.save((err) => {
        if (!err) {
            console.log("Add card succeed !")
            res.redirect("/card")
        }
    })
})


//render ra form EDIT
router.get('/edit/:id', (req, res) => {
    CardModel.findById(req.params.id, (err, data) => {
        if (!err) {
            //render ra file: update.hbs (trong thư mục views/card)
            //gửi kèm dữ liệu của object card để load vào form edit
            //card (tên) , data (dữ liệu)
            res.render("card/update", { card: data })
        }
    })
})

//nhận & xử lý dữ liệu từ form EDIT
router.post('/edit/:id', (req, res) => {
    var id = req.params.id;
    var card = req.body;
    CardModel.findByIdAndUpdate(id, card, (err) => {
        if (!err) {
            console.log("Update card succeed !")
            res.redirect("/card")
        }
    })
})

router.get('/detail/:id', (req, res) => {
    CardModel.findById(req.params.id, (err, card) => {
        if (!err) {
            res.render('card/info', { card: card })
        }
    })
})



//search function
router.post('/search', (req, res) => {
        CardModel.find({ name: new RegExp(req.body.name, "i") }, (err, data) => {
            if (!err) {
                res.render('card/index', { card: data })
            }
        })
    })
    //sort function
router.get('/sort/asc', (req, res) => {
    CardModel.find()
        .sort({ name: 1 })
        .exec((err, data) => {
            if (!err) {
                res.render('card/index', { card: data })
            }
        })
})
router.get('/sort/desc', (req, res) => {
    CardModel.find()
        .sort({ name: -1 })
        .exec((err, data) => {
            if (!err) {
                res.render('card/index', { card: data })
            }
        })
})

module.exports = router