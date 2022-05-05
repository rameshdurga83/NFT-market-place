import {combineReducers} from 'redux';
import kryptoBirdzData from './kryptoBirdReducer';

const rootReducer = combineReducers(
    {kryptoBirdzData}
);

export default rootReducer;