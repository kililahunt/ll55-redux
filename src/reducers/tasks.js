import * as types from './../constants/ActionTypes';

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data;

var myReducer = (state = initialState, action) => {
	switch(action.type) {
		case types.LIST_ALL:
			return state;
		default: return state;
	}
	return state;
};

export default myReducer;