const { Router } = require('express')
const express = require('express')
const { createProfile, deleteProfile, fetchProfiles, searchProfile, fetchAndSort, verifyProfile } = require('../controllers/profile.controller')
const router = express.Router()


router.get('/profiles', fetchProfiles)
router.post('/profile', createProfile)
router.delete('/profile/:_id', deleteProfile)
router.get('/search', searchProfile)
router.post('/profile/verify', verifyProfile)
router.get('/profiles_sort', fetchAndSort)

module.exports = router