const _URL = "https://api.opencagedata.com/geocode/v1/json?q="
const _KEY = "&key=e4d9d4ed74874f5bb1da37adffa3a25e"
const axios = require('axios')
let state = {}

module.exports.getLocationAPI = () => {
    navigator.geolocation.getCurrentPosition(this.showPosition)
}

module.exports.showPosition = (pos) => {
    this.getLocation(pos.coords.latitude, pos.coords.longitude)
}

module.exports.getLocation = (lat,lng) =>{
    let options = {
        url: `${_URL}${lat}+${lng}${_KEY}`,
        method:'get'
    }

    axios(options)
    .then(res=>{
        state = res.data
        let obj = {
            country: state.results[0].components.country,
            country_code: state.results[0].components.country_code,
            formatted: state.results[0].formatted,
            iso: state.results[0].components.country_code.toUpperCase(),
        }

        console.log(obj)
        return obj
    })
    .catch(e=>{
        console.error(e)
    })
}