
const axios = require('axios');
const captainModel = require('../models/captain.model')

module.exports.getAddressCoordinate = async (address) => {

    const apiKey = process.env.GOOGLE_MAPS_API; // Ensure you have this key in your .env file
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    try {
        const response = await axios.get(url);

        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng,
            };
        } else {
            throw new Error(`Geocoding API error: ${response.data.status}`);
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error.message);
        throw new Error('Failed to fetch coordinates. Please try again.');
    }
};

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;

   const urlOrigin = `https://api.mapbox.com/search/searchbox/v1/retrieve/${origin}?session_token=my-session-1&access_token=${apiKey}`;
    const urlDestination = `https://api.mapbox.com/search/searchbox/v1/retrieve/${destination}?session_token=my-session-1&access_token=${apiKey}`;
    try {
        const resOrigin = await axios.get(urlOrigin);
        const resDestination = await axios.get(urlDestination);
        // ORIGIN
        const { latitude: lat1, longitude: lon1 } =
            resOrigin.data.features[0].properties.coordinates;

        // DESTINATION
        const { latitude: lat2, longitude: lon2 } =
            resDestination.data.features[0].properties.coordinates;

        console.log("origin", lon1, lat1);
        console.log("destination", lon2, lat2);
        const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${lon1},${lat1};${lon2},${lat2}?geometries=geojson&access_token=${apiKey}`;

        const res = await axios.get(url);
        const distance = res.data.routes[0].distance; // in meters
        const duration = res.data.routes[0].duration; // in seconds

        console.log("Driving distance (km):", distance);
        console.log("Driving time (min):", duration);

        return {distance: { value: distance }, duration: { value: duration } };

    } catch (err) {
        console.error(err.response);
        throw err;
    }
}


module.exports.getSuggestion = async (q) => {
    if (!q) {
        throw new Error('query is required')
    }

    const apiKey = process.env.GOOGLE_MAPS_API;

    // const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
    const url = `https://api.mapbox.com/search/searchbox/v1/suggest?q=${encodeURIComponent(q)}&session_token=my-session-1&access_token=${apiKey}`


    try {
        const response = await axios.get(url);

        return response.data.suggestions;

    } catch (err) {
        console.error(err);
        throw new Error(err.message);
    }
}

module.exports.getCaptainInRadius = async(ltd, lng, radius) => {

    const captain = await captainModel.find({
        location:{
            $geoWithin: {
                $centerSphere: [[ltd, lng], radius/6371]
            }
        }
    });
    return captain;
} 
