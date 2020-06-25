const request=require('request')

function forecast(latitude,longitude,callback) {

    const url="http://api.weatherstack.com/current?access_key=50b7c19814c9055439befcab0b743c46&query="+ longitude + "," +latitude

    request({url:url,json:true},function(error,{body}){
        if(error){
            callback('unable to fetch connection',undefined)
        }
        else if(body.current.weather_descriptions.length===0){
            callback('oops ! no cities found ',undefined)
        }
        else{
            callback(undefined, '  the temperature is :  '+body.current.temperature+'  *C ' )
             
        }
     })
}




module.exports=forecast