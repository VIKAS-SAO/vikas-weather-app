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
          title:'weather',
          name:'vikas sao'

      })

 })

 app.get('/help',function(request,response){
    response.render('help',{
        helpText:'this is the help section',
        title:'weather',
          name:'vikas sao'
 
    })

})


app.get('/about',function(request,response){
    response.render('about',{
        title:'weather',
        name:'vikas sao'

    })
})

 

app.get('/weather',function(request,response){
    if(!request.query.address){
       return response.send({error:'entera city name '})
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
        name: 'vikas sao',
        errorMessage: 'Help article not found.'
    })
})

 
 app.listen(port,function(){
     console.log('litenign on port 1000')
 })


 

