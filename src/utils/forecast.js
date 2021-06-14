
const request = require('request')

const forecast = (latitude,longitude) => new Promise((resolve, reject) => {
    const url = 'http://api.weatherstack.com/current?access_key=a428e66181ca8eb7080639198c0d3689&query='+latitude +','+longitude+'$units=c';


    request({url: url, json : true}, (error,response) => {
        if(error){
            reject('Unable to connect weather service');
        }else if(response.body.error){
            reject('Unable to find location');
        }else{
            resolve({   
                temperature: response.body.current.temperature,
                weather_descriptions: response.body.current.weather_descriptions[0]
            })
        }
    })
})

module.exports = forecast;