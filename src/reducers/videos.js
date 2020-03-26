export default function reducer(state={
    videos : [],
    video: {},
    nwstate: ''
}, action){
    switch (action.type){
        case "FETCH_VIDEOS":{
            return {
                ...state, 
                nwstate: 'FETCHING', 
                error: null
            };
        }
        
        case "FETCH_VIDEOS_REJECTED":{  
            return {
                ...state,
                nwstate: 'REJECTED',
                error: action.payload
            }
        }

        case "FETCH_VIDEOS_FULFILLED":{
            return {
                ...state,
                nwstate: 'FETCHED',
                videos: action.payload
            }
        }

        case "FETCH_VIDEO":{
            return {
                ...state, 
                nwstate: 'FETCHING'
            };            
        }
        
        case "FETCH_VIDEO_REJECTED":{  
            return {
                ...state,
                nwstate: "REJECTED",
                error: action.payload
            }
        }

        case "FETCH_VIDEO_FULFILLED":{
            return {
                ...state,
                nwstate: 'FETCHED',
                video: action.payload
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