import { combineReducers } from 'redux';

import usuarios from './usuarios';
import SSO from './SSO';
import videos from './videos';

export default combineReducers({
    usuarios,
    SSO,
    videos

})
