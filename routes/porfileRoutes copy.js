const express = require('express')
const router = express.Router()
const {
  getProfileByUserId,
  getProfileById,
  updatedProfile
} = require('../controllers/profileController')
const { protect } = require('../middleware/authMiddleware')

const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

// Configuration
cloudinary.config({
  cloud_name: 'disyammlp',
  api_key: '742911561294192',
  api_secret: 'Lp6jbKIKIbRdz4s3pOI8JFUxGQU'
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'demo',
  allowedFormats: ['jpg', 'png'],
  transformation: [{ width: 500, height: 500, crop: 'limit' }]
})
const parser = multer({ storage: storage })

router.route('/:id').get(getProfileById).put(parser.single('image'), protect, updatedProfile)
router.route('/users/:userid').get(getProfileByUserId)

module.exports = router
