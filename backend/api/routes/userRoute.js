const express = require('express')
const router = express.Router()

const { AllUsers, OneUser, CreateUser} = require('../../controller/AuthController')

router.route('/').get(AllUsers)
router.route('/').post(CreateUser);
router.route('/:id').get(OneUser)

module.exports = router