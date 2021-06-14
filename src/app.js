const express = require('express');
const path = require('path');
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')
const app = express();
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname,'../public');
app.use(express.static(publicPath))
app.set('views', __dirname + '/../templates/views');
hbs.registerPartials(path.join(__dirname,'../templates/partial'))

app.set('view engine','hbs');

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather app',
        name: 'Minh Duc',
        footer:'Weather footer'
    })
})
app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About title',
        footer: 'About footer'
    })
})
app.get('/help', (req,res) => {
    res.render('help',{
        title: 'Help page',
        footer: 'Help footer'
    })
})
app.get('/products', (req,res) => {
    console.log(req.query)
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    
    res.send({
        product: []
    })
})

app.get('/weather', (req,res) => {
    
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    else{
        geocode(req.query.address).then( (data) => {
            forecast(data.latitude,data.longitude).then( (forecast_data) => {
                
                
                let temp = forecast_data.temperature;
                let des = forecast_data.weather_descriptions
                
                res.send({
                    forecast:`${des} through the day.It is currently ${temp}`,
                    location: data.location,
                    address: req.query.address
                })
                },(error) => res.send({error})
            ).catch( (err) => res.send({err}) )
            },(err) => res.send({err})
        ).catch( (error) => res.send({error} ))
    }

    
})








app.get('*', (req,res) => {
    res.render('404',{
        errorMessage: 'Not found',
        title: '404',
        footer: 'See you soon'
    })
})
app.get('/help/*', (req,res) => {
    res.render('404', {
        errorMessage: 'Help article ot found',
        title: '404',
        footer: 'See you soon'
    })
})

app.listen(port,() => {
    console.log('Server is up on port ',port)
});