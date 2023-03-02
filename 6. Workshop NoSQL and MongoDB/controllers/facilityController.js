const { createFacility } = require('../services/facilityService');

const facilityController = require('express').Router();

facilityController.get('/host', async (req, res) => {
    // show creation form
    res.render('createFacility', {
        title: 'Create New Facility',
    });
});

facilityController.post('/host', async (req, res) => {
    try {
        await createFacility(req.body.label, req.body.iconUrl);
        res.redirect('/catalog');
    } catch (error) {
        res.render('createFacility', {
            title: 'Create New Facility',
            error: error.message,
        });
    }
});

module.exports = facilityController;
