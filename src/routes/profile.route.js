const { Router } = require('express')
const express = require('express')
const { createProfile, deleteProfile, fetchProfiles, searchProfile } = require('../controllers/profile.controller')
const router = express.Router()


router.get('/profiles', fetchProfiles)
router.post('/profile', createProfile)
router.delete('/profile/:id', deleteProfile)
router.get('/search', searchProfile)
router.post('/profile/verify')
router.get('/profile?')

module.exports = router