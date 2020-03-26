export default function reducer(state={
    usuarios: [],
    usuario: {},
    nwstate: '',
    error: null
}, action){
    switch(action.type){
        case 'FETCH_USUARIOS':{
            return {
                ...state,
                nwstate: 'FETCHING',
                error: null
            }
        }

        case 'FETCH_ROTAS_REJECTED':{
            return {
                ...state,
                nwstate: 'REJECTED',
                error: action.payload
            }
        }

        case 'FETCH_USUARIOS_FULFILLED':{
            return {
                ...state,
                nwstate: 'FETCHED',
                usuarios: action.payload
            }
        }

        case "FETCH_USUARIO":{
            return {
                ...state, 
                nwstate: 'FETCHING'
            };
        }
        
        case "FETCH_USUARIO_REJECTED":{  
            return {
                ...state,
                nwstate: "REJECTED",
                error: action.payload
            }
        }

        case "FETCH_USUARIO_FULFILLED":{
            return {
                ...state,
                nwstate: 'FETCHED',
                usuario: action.payload
            }
        }

        case "FETCH_DONE":{
            return {
                ...state,
                nwstate: 'DONE'
            }
        }

        default:{
            return state
        }
    }
}