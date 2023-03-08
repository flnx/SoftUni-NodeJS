const facilityController = require('express').Router();

const {
    createFacility,
    getAllFacilities,
    addFacilities,
} = require('../services/facilityService');
const { getById } = require('../services/roomService');

facilityController.get('/create', async (req, res) => {
    res.render('createFacility', {
        title: 'Create New Facility',
    });
});

facilityController.post('/create', async (req, res) => {
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

facilityController.get('/:roomId/decorateRoom', async (req, res) => {
    const roomId = req.params.roomId;
    const room = await getById(roomId);

    const facilities = await getAllFacilities();

    facilities.forEach((f) => {
        if ((room.facilities || []).some((rf) => rf._id.toString() == f._id.toString())) {
            f.checked = true;
        }
    });

    res.render('decorate', {
        title: 'Add Facility',
        room,
        facilities,
    });
});

facilityController.post('/:roomId/decorateRoom', async (req, res) => {
    const facilityIds = Object.keys(req.body);

    //? [x] extract the id's from form and add the faacilities to the current room
    await addFacilities(req.params.roomId, facilityIds);

    res.redirect('/facility/' + req.params.roomId + '/decorateRoom');
});

module.exports = facilityController;
