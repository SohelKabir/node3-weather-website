const request = require('request')

// const geocode = (address, callback) => {
//     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoibW5rc25zdSIsImEiOiJjazExMXlkd24wMnR1M29xdnJoaTBlNWRzIn0.XAsAfEg4IsiMvr66UygxIA'

//      request({url: url, json:true},(error, response) => {
    
//             if (error) {
//                 callback('Unable to connect loation service', undefined)
                
//             }else if(response.body.features.length === 0){
//                 callback('Unable to find loation, try another search',undefined)
//             }
        
//              else {
//                  callback(undefined, {
//                  latitude: response.body.features[0].center[1],
//                  longitude : response.body.features[0].center[0],
//                  location: response.body.features[0].place_name
        
           
//             }) 
//         }
            
//         })
// }


//Destructured Version


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoibW5rc25zdSIsImEiOiJjazExMXlkd24wMnR1M29xdnJoaTBlNWRzIn0.XAsAfEg4IsiMvr66UygxIA'

     request({url, json:true},(error, {body}) => {
    
            if (error) {
                callback('Unable to connect loation service', undefined)
                
            }else if(body.features.length === 0){
                callback('Unable to find loation, try another search',undefined)
            }
        
             else {
                 callback(undefined, {
                 latitude: body.features[0].center[1],
                 longitude : body.features[0].center[0],
                 location: body.features[0].place_name
        
           
            }) 
        }
            
        })
}

module.exports = geocode