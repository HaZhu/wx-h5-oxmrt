import axios from 'axios';
import qs from 'qs'
import {
    baseUrl
} from './env'
import {
    setStore,
    getStore,
    removeStore,
    urlGet
} from './methods'
const axiosfn = (url = '', data = {}) => {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    let qsData = Object.assign(data,{
        sessionID:getStore('unionid')
    })
    return  axios.post(baseUrl + url, qs.stringify(qsData))
}
export { axiosfn }