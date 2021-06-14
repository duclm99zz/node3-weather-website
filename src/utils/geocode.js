const request = require('request')


const geocode = (address) => new Promise( (resolve,reject) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?limit=2&access_token=pk.eyJ1IjoiZHVjbG05OSIsImEiOiJja3Bub2FjaHkxY3p5Mm9uMnd6bmJlbm1oIn0.bdvWovpeTeQejvh_EHbosg';
    
    request({url: url, json: true} , (error, resposne) => {
        if(error) {
            reject('Rejected request');
        }else if(resposne.body.features.length === 0){
            reject('Unable to find location')
        }
        else{
            resolve({
                latitude: resposne.body.features[0].center[1],
                longitude: resposne.body.features[0].center[0],
                location: resposne.body.features[0].place_name
            })
        }
    })
})

module.exports = geocode;