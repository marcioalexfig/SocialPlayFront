export default function reducer(state={
    SSO: {},
    nwstate: '',
    error: null
}, action){
    switch (action.type){
        case "FETCH_SSO":{
            return {
                ...state, 
                nwstate:'FETCHING'
            }
        }
        
        case "FETCH_SSO_REJECTED":{  
            return {
                ...state,
                nwstate: 'REJECTED',
                error: action.payload
            }
        }

        case "FETCH_SSO_FULFILLED":{
            return {
                ...state,
                nwstate: 'FETCHED',
                SSO: action.payload
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