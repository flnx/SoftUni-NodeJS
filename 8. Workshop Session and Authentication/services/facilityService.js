const Facility = require('../models/Facility');
const Room = require('../models/Room');

async function getAllFacilities() {
    return Facility.find({}).lean();
}

async function createFacility(label, iconUrl) {
    return Facility.create({
        label,
        iconUrl,
    });
}

async function addFacilities(roomId, facilityIds) {
    const room = await Room.findById(roomId).populate('facilities');
    const facilities = await Facility.find({ _id: { $in: facilityIds } });

    // Filter out removed facilities
    const toRemove = room.facilities.filter((f) =>
        facilities.every((x) => x._id.toString() != f._id.toString())
    );

    // Remove room from unchecked facilities
    toRemove.forEach((f) => {
        // Remove Room from Facility

        const roomIndex = f.rooms.findIndex((rId) => rId.toString() == roomId);
        f.rooms.splice(roomIndex, 1);

        // Remove Facility from Room
        const facilityIndex = room.facilities.findIndex(
            (x) => x._id.toString() == f._id.toString()
        );
        
        room.facilities.splice(facilityIndex, 1);
    });

    // Determine new facilities
    const newlyAdded = facilities.filter((f) =>
        room.facilities.every((x) => x._id.toString() != f._id.toString())
    );

    // Add room ref from removed facilities
    newlyAdded.forEach((f) => {
        room.facilities.push(f);
        f.rooms.push(room);
    });

    await room.save();
    await Promise.all(toRemove.map((f) => f.save()));
    await Promise.all(newlyAdded.map((f) => f.save()));
}

module.exports = {
    getAllFacilities,
    createFacility,
    addFacilities,
};
