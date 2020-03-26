import axios from 'axios';
import baseConf from '../configurations/config.js';

axios.defaults.withCredentials = false;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json;application/x-www-form-urlencoded; charset=UTF-8';
axios.defaults.baseURL = baseConf.remoteServer.baseURL;

/**
 * Obtem informações do integrante informado
 * 
 * @param {String} id Id do rota
 */
export function getSSO(id){
    return (dispatch) => {
        dispatch({ type: "FETCH_SSO" });
        
        axios.get(`/api/usuario/SSO/rid/${id}`)
            .then((response) => {
                dispatch({ type: "FETCH_SSO_FULFILLED", payload: response.data });
            })
            .catch((error) => {
                dispatch({ type: "FETCH_SSO_REJECTED", payload: error });
            });
    }
}

export function login(credentials){
    console.log('CREDENTIALS', credentials)
    return (dispatch) => {
        dispatch({ type: "FETCH_SSO" });
        axios.post("/api/usuario/SSO/login", {
            login: credentials.login,
            password: credentials.password,
            perfil: credentials.perfil,
            social: credentials.social
        })
        .then((response) => {
            dispatch({ type: "FETCH_SSO_FULFILLED", payload: response.data });
        })
        .catch((error) => {
            console.log(error)
            dispatch({ type: "FETCH_SSO_REJECTED", payload: error });
        });
    }
}

export function logado(){
    return (dispatch) => {      
        dispatch({ type: "FETCH_USUARIO" });
        axios.get(`/api/usuario/SSO/logado`)
            .then((response) => {
                console.log(response.data)
                let l = {nome:'Marcio Alex'}
                dispatch({ type: 'FETCH_USUARIO_FULFILLED', payload: l });
            })
            .catch((error) => {
                dispatch({ type: 'FETCH_USUARIO_REJECTED', payload: error })
            });
    }
}

export function logout(){
    return (dispatch) => {      
        dispatch({ type: "FETCH_USUARIO" });
        axios.get(`/api/usuario/SSO/logout`)
            .then((response) => {
                dispatch({ type: 'FETCH_USUARIO_FULFILLED', payload: response.data });
            })
            .catch((error) => {
                dispatch({ type: 'FETCH_USUARIO_REJECTED', payload: error })
            });
    }
}

/**
 * 
 */
export function done() {
    return (dispatch) => {
        dispatch({ type: 'FETCH_DONE' });
    }
}