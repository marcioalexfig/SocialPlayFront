import axios from 'axios';
import _ from 'lodash';
import baseConf from '../configurations/config.js';
import Instagram from 'node-instagram';

//https://www.instagram.com/developer/clients/manage/?registered=SocialPlay

axios.defaults.withCredentials = false;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = false
axios.defaults.baseURL = baseConf.remoteServer.baseURL;

// Create a new instance.
//https://www.instagram.com/developer/authentication/



//https://www.instagram.com/oauth/authorize/?client_id=fb169e09762246d3a850fbe58269f1a2&redirect_uri=http://matec.mobi&response_type=code
function geraAccessToken(){
    let code = ''
    axios.get("https://www.instagram.com/oauth/authorize/?client_id=fb169e09762246d3a850fbe58269f1a2&redirect_uri=http://matec.mobi&response_type=code")
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
}

export function getVideos() {
    return (dispatch) => {
        dispatch({ type: "FETCH_VIDEOS" });
        const instagram = new Instagram({
            clientId: 'fb169e09762246d3a850fbe58269f1a2',
            clientSecret: 'bcb887d69c8142c580d5e6682203b946',
            accessToken: geraAccessToken(),
          });
        instagram.get('users/self', (err, data) => {
            console.log(data);
            dispatch({ type: "FETCH_VIDEOS_FULFILLED", payload: data });
            if(err){
                console.log(err)
                dispatch({ type: "FETCH_VIDEOS_REJECTED", payload: err });
            }
        });
        
        
    }
}

export function done() {
    return (dispatch) => {
        dispatch({ type: 'FETCH_DONE' });
    }
}