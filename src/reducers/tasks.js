import * as types from './../constants/ActionTypes';

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = ( data ? data : [] );


var s4 = () =>
	{
		return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
	}

var generateID = () =>
{
	return s4() + s4() + '-' + s4(); 
}

var findIndex = (id, state) => {
   		var tasks = state;
   		var result = -1;
   		tasks.forEach((task, index) => {
   			if (task.id === id) {
   				result = index;
   			}
   		});
   		return result;
}


var myReducer = (state = initialState, action) => {
	var index = -1;
	switch(action.type) {
		case types.LIST_ALL:
			return state;

		case types.SAVE_TASK:
			var task = {
				id : action.task.id,
				name: action.task.name,
				status: action.task.status
			};
			if (!task.id) {
				task.id = generateID();
				state.push(task);
			} else {
				index = findIndex(task.id, state);
				state[index] = task;
			}
			localStorage.setItem('tasks', JSON.stringify(state));
			return [...state];

		case types.UPDATE_STATUS_TASK:
			index = findIndex(action.id, state);
			state[index] = {
				...state[index],
				status : !state[index].status
			}
			return [...state];

		case types.DELETE_TASK:
			index = findIndex(action.id, state);
			state.splice(index, 1);
			localStorage.setItem('tasks', JSON.stringify(state));
			return [...state];
		default: return state;
	}
};


export default myReducer;