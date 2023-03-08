const { getById, updateRoom, deleteRoom } = require('../services/roomService');

const roomController = require('express').Router();

roomController.get('/:id/edit', async (req, res) => {
    const roomId = req.params.id;
    const room = await getById(roomId);

    const isOwner = room.owner?.toString() == req.user._id;

    if (!req.user || !isOwner) {
        return res.redirect('/auth/login');
    }

    res.render('edit', {
        title: 'Edit Accomodation',
        room,
    });
});

roomController.post('/:id/edit', async (req, res) => {
    const roomId = req.params.id;

    const room = await getById(roomId);

    const isOwner = room.owner?.toString() == req.user._id;

    if (!req.user || !isOwner) {
        return res.redirect('/auth/login');
    }

    try {
        const room = await updateRoom(roomId, req.body);

        res.redirect(`/catalog/${room._id}`);
    } catch (err) {
        req.body._id = roomId;

        res.render('edit', {
            error: err.message,
            room: req.body,
        });
    }
});

roomController.get('/:id/delete', async (req, res) => {
    const roomId = req.params.id;
    const room = await getById(roomId);

    const isOwner = room.owner?.toString() == req.user._id;

    if (!req.user || !isOwner) {
        return res.redirect('/auth/login');
    }

    res.render('delete', {
        title: 'Delete Room',
        room,
    });
});

roomController.post('/:id/delete', async (req, res) => {
    const roomId = req.params.id;
    const room = await getById(roomId);

    const isOwner = room.owner?.toString() == req.user._id;

    if (!req.user || !isOwner) {
        return res.redirect('/auth/login');
    }

    try {
        await deleteRoom(roomId);
        res.redirect('/catalog');
    } catch (err) {
        res.render('delete', {
            title: 'Delete Room',
            room, v
        });
    }
});

module.exports = roomController;
