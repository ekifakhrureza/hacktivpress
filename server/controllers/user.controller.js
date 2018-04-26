const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = {
    register(req, res) {
        let username = req.body.username
        let name = req.body.name
        let password = req.body.password

        User.findOne({
            username: username,
        }).then(data => {
            if (data) {
                res.status(202).json({
                    message: 'Username Already Exist'
                })
            }
            else {
                let newUser = new User({
                    username: username,
                    name: name,
                    password: password

                })
                newUser.save()
                    .then(response => {
                        console.log('sukses');

                        res.status(200).json({
                            message: 'query register user success',
                            data: response
                        })
                    }).catch(err => {
                        console.log(err);
                        res.status(500).json({
                            message: 'query register user failed'
                        })
                    })
            }
        }).catch(err => {
            console.log(err);

        })
    },
    login(req, res) {
        let username = req.body.username
        let password = req.body.password

        User.findOne({
            username: username,
        }).then(data => {
            if (data) {
                var result = bcrypt.compareSync(password, data.password);
                if (result) {
                    let payload = {
                        id: data.id,
                        username: data.username,
                        name: data.name,
                    }
                    let token = jwt.sign(payload, process.env.SECRETKEY)
                    res.status(200).json({
                        message: 'query login user success',
                        data: data,
                        id: data.id,
                        username: data.username,
                        name: data.name,
                        token: token,
                    })

                } else {
                    res.status(202).json({
                        message: 'Wrong Username / Password'
                    })
                }
            } else {
                res.status(202).json({
                    message: 'Wrong Username / Password'
                })
            }
        }).catch(err => {
            console.log(err);

            res.status(500).json({
                message: 'Sign in failed'
            })
        })

    }
}