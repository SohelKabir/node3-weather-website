const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode= require('./utils/geocode')
const forecast= require('./utils/forecast')

const app = express()

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs') //handleber libraray for showing dynamic pages
app.set('views', viewsPath) 
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


 app.get('', (req, res) => {
        res.render('index',{
            title: 'Weather app',
            name: "Sohel Kabir"
        })
 })
 app.get('/about', (req, res) => {
    res.render('about',{
        title: 'Weather app',
        name: "Sohel Kabir"
    })
})
app.get('/help', (req, res) => {
    res.render('help',{
        helpText: 'This is help text',
        title: 'Help',
        name: 'Sohel kabir'
    })
})

// app.get('', (req, res) => {
//     res.send('<h1>Hello Express</h1>')
// })





app.get('/weather', (req, res) => {
    
    if(!req.query.address){
        return res.send({
            error: 'You must provide an Address!'
        })
    }
    const address = req.query.address;

    geocode (address, (error,{latitude, longitude, location} = {} ) => {     ////Destructured in second argument with default parameter
        
    
        if(error){
            return res.send(error) 
        }    
    
        forecast (latitude, longitude,(error, forecastData) => {
            if (error) {
                return res.send(error)      
            }
            
            res.send({
                
                location:location,
                forecast: forecastData,
                address: req.query.address
            })
            
        })
           
    })
    
})

// 404 pages
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sohel',
        errorMessage: 'Help Page not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sohel',
        errorMessage: 'Page not found'
    })
})




app.listen(3000, () => {
    console.log("Server is running !");
    
})


