import axios from 'axios';
    import _ from 'lodash';
import baseConf from '../configurations/config.js';

axios.defaults.withCredentials = false;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.baseURL = baseConf.remoteServer.baseURL;

/**
 * Obtem todos os usuarios ativos
 * 
 */
export function getUsuarios() {
    return (dispatch) => {
        dispatch({ type: "FETCH_USUARIOS" });
        axios.get("/api/usuarios")
            .then((response) => {
                dispatch({ type: "FETCH_USUARIOS_FULFILLED", payload: response.data });
            })
            .catch((error) => {
                dispatch({ type: "FETCH_USUARIOS_REJECTED", payload: error });
            });
    }
}

/**
 * Obtem informações do integrante informado
 * 
 * @param {String} id Id do usuario
 */
export function getUsuario(id) {
    return (dispatch) => {
        dispatch({ type: "FETCH_USUARIO" });

        axios.get(`/api/usuario/id/${id}`)
            .then((response) => {
                dispatch({ type: "FETCH_USUARIO_FULFILLED", payload: response.data });
            })
            .catch((error) => {
                dispatch({ type: "FETCH_USUARIO_REJECTED", payload: error });
            });
            
    }
}

/**
 * Insere novo usuario na base de dados
 * 
 * @param {Usuario} usuario 
 */
export function newUsuario(usuario) {
    return (dispatch) => {
        dispatch({ type: "FETCH_USUARIO" });

        axios.post('/api/usuario/save', usuario)
            .then((response) => {
                dispatch({ type: "FETCH_USUARIO_FULFILLED", payload: response.data });
            })
            .catch((error) => {
                dispatch({ type: "FETCH_USUARIO_REJECTED", payload: error });
            })
    }
}

/**
 * Edita usuario
 * 
 * @param {Usuario} usuario 
 */
export function edtUsuario(usuario) {
    return (dispatch) => {
        dispatch({ type: "FETCH_USUARIO" });

        axios.put('/api/usuario/save', usuario)
            .then((response) => {
                dispatch({ type: "FETCH_USUARIO_FULFILLED", payload: response.data });
            })
            .catch((error) => {
                dispatch({ type: "FETCH_USUARIO_REJECTED", payload: error });
            })
    }
}

/**
 * 
 * @param {Filtro} params 
 */
export function findUsuario(params) {
    return (dispatch) => {      
        dispatch({ type: "FETCH_USUARIOS" });

        let p = _.map(params, (v, k) => {
            return v ? `${k}=${v}&` : "";
        }).join("");

        //console.log(p);

        axios.get(`/api/usuarios?${p}`)
            .then((response) => {
                dispatch({ type: 'FETCH_USUARIOS_FULFILLED', payload: response.data });
            })
            .catch((error) => {
                dispatch({ type: 'FETCH_USUARIOS_REJECTED', payload: error })
            });
    }
}

export function done() {
    return (dispatch) => {
        dispatch({ type: 'FETCH_DONE' });
    }
}