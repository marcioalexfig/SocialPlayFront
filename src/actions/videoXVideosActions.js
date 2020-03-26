import axios from 'axios';
import _ from 'lodash';
import baseConf from '../configurations/config.js';

axios.defaults.withCredentials = false;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.baseURL = baseConf.remoteServer.baseURL;

//console.log(axios.defaults.baseURL)

export function getVideos() {
    try{
    return (dispatch) => {
        dispatch({ type: "FETCH_VIDEOS" });
        let inicio = 0
        let fim = 15
        let perfil = 'aaaa'
        axios.get(`/api/xvideo/videos/i/${inicio}/f/${fim}/p/${perfil}`)
        .then((response) => {
            console.log(response.data)
            dispatch({ type: "FETCH_VIDEOS_FULFILLED", payload: response.data });
        })
        .catch((error) => {
           console.log(error);
           dispatch({ type: "FETCH_VIDEOS_REJECTED", payload: error });
        });
    }
    }catch(err){
        console.log(err)
    }
}

export function done() {
    return (dispatch) => {
        dispatch({ type: 'FETCH_DONE' });
    }
}