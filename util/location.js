const axios = require('axios');

require('dotenv').config();

const HttpError = require('../models/http-error');

const API_KEY = process.env.MAPBOX_API_KEY;



const getCoordsForAddress = async address => {
    const params = {
        auth: API_KEY,
        locate: address,
        json: '1'
    }
    const response = await axios.get('https://geocode.xyz',{params});
    console.log(response.data);
    const data = response.data;
    if(data.error) {
        const error = new HttpError('Could not find location for the specified address!');
        throw error;
    }
    const coordinates = [data.longt,data.latt];
    return coordinates;
}

exports.getCoordsForAddress = getCoordsForAddress;
