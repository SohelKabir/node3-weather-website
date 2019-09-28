const request = require('request')

// const forecast = (x,y, callback) => {
//     const url = 'https://api.darksky.net/forecast/2b24910d22c1373d4b795f2a49e497e9/'+ x +','+ y +'?units=si'
//      request({url: url, json:true},(error, response) => {
    
//             if (error) {
//                 callback('Unable to connect loation service', undefined)
                
//             }else if(response.body.error){
//                 callback('Unable to find loation, try another search',undefined)
//             }
        
//              else {
//                  callback(undefined, 'It is currently ' +response.body.currently.temperature + ' degree out. There is a '+ response.body.currently.precipProbability+ ' % of rain.') 
//         }
            
//         })
// }

///Destructured version and shorthand ES6 object property





const forecast = (x,y, callback) => {
    const url = 'https://api.darksky.net/forecast/2b24910d22c1373d4b795f2a49e497e9/'+ x +','+ y +'?units=si'
     request({url, json:true},(error, {body}) => {
    
            if (error) {
                callback('Unable to connect loation service', undefined)
                
            }else if(body.error){
                callback('Unable to find loation, try another search',undefined)
            }
        
             else {
                 callback(undefined, body.daily.data[0].summary + 'It is currently ' +body.currently.temperature + 
                 ' degree out. There is a '+ body.currently.precipProbability+ ' % of rain. \n Highest temparature will be: ' +body.daily.data[0].temperatureHigh +
                 ' degree, lowest temparature :  '+  body.daily.data[0].temperatureLow + '  degree.')
        }
            
        })
}





module.exports = forecast