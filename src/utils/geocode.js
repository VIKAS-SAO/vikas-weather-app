const request=require('request')

function geocode(address,callback) {

    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'  + address  +  '.json?access_token=pk.eyJ1IjoiYm95YXBhbGVtIiwiYSI6ImNrYmpxMXNhbTByYzcyc3F2cjlqNnJ1aTkifQ.t4r-KUNOeRRoM0yH_LPJ6A&limit=1'
    
    request({url:url,json:true},function(error,{body}){
        if(error){
            console.log('unable to fetch the location')
        }
        else if(body.features.length===0){
            console.log('no cities found') 
        }
        else{
             callback(undefined,{
                latitude:body.features[0].center[0],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })

        }
     })
}




module.exports=geocode