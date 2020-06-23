const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port =process.env.PORT||1000

 const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

 app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

 app.use(express.static(publicDirectoryPath))

 app.get('',function(request,response){
      response.render('index',{
        title:'Weather',
        name:'Vikas Sao'

      })

 })

 app.get('/help',function(request,response){
    response.render('help',{
        helpText:'This is the Help Section',
        title:'Weather',
        name:'Vikas Sao'
 
    })

})


app.get('/about',function(request,response){
    response.render('about',{
        title:'Weather',
        name:'Vikas Sao'

    })
})

 

app.get('/weather',function(request,response){
    if(!request.query.address){
       return response.send({error:'Enter a City Name '})
    }

    
                    geocode(request.query.address,function(error,{latitude,longitude,location}={}){
                        if(error){
                           return response.send({error})
                        }
                        
                        else{
                            forecast(latitude,longitude,function(error,forecastdata){
                                if(error){
                                     return response.send({error}) 
                                }
                                else {
                                    response.send({
                                    forecast: forecastdata,
                                    location,
                                    address: location
                                })
                                
                                }
                            })
                        }
                    } )
     
})













app.get('*', (request, response) => {
    response.render('404', {
        title: '404',
        name: 'Vikas Sao',
        errorMessage: 'Help article not found.'
    })
})

 
 app.listen(port,function(){
     console.log('litenign on port 1000')
 })


 

