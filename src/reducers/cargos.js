export default function reducer(state={
    cargos : [],
    cargo: {},
    nwstate: ''
}, action){
    switch (action.type){
        case "FETCH_CARGOS":{
            return {
                ...state, 
                nwstate: 'FETCHING', 
                error: null
            };
        }
        
        case "FETCH_CARGOS_REJECTED":{  
            return {
                ...state,
                nwstate: 'REJECTED',
                error: action.payload
            }
        }

        case "FETCH_CARGOS_FULFILLED":{
            return {
                ...state,
                nwstate: 'FETCHED',
                cargos: action.payload
            }
        }

        case "FETCH_CARGO":{
            return {
                ...state, 
                nwstate: 'FETCHING'
            };            
        }
        
        case "FETCH_CARGO_REJECTED":{  
            return {
                ...state,
                nwstate: "REJECTED",
                error: action.payload
            }
        }

        case "FETCH_CARGO_FULFILLED":{
            return {
                ...state,
                nwstate: 'FETCHED',
                cargo: action.payload
            }
        }

        case "FETCH_DONE":{
            return {
                ...state,
                nwstate: 'DONE'
            }
        }

        default:{
            return state;
        }
    }
}