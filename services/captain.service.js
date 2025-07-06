const captainModel = require('../models/captain.model.js');

module.exports.createCaptain = async ({
    firstname, lastname, email, password,
    color, model, number, vehicleType, capacity
})=>{

    if(!firstname || !email || !password || !color || !model || !number || !vehicleType || !capacity){
        throw new Error('All fields are required');
    }

    const captain = await captainModel.create({
       fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate: number,         // map `number` → `plate`
            vehicleType,           // map `vehicleType` → `vehicleType`
            capacity
        }
    });
    console.log(`check model ${captain}`);
    return captain;
}