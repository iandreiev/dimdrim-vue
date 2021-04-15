import router from "../router"
import Vue from "vue"

module.exports.toHome = () => {
    router.push({name: 'Home'})
}

module.exports = functions