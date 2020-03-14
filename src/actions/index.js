import * as types from './../constants/ActionTypes';

export const listAll = () => {
	return {
		type : types.LIST_ALL
	}
};

export const onAddTask = (task) => {
	return {
		type: types.ADD_TASK,
		task : task
	}
};

export const onToggleForm = () => {
	return {
		type: types.TOGGLE_FORM
	}
}

export const onOpenForm = () => {
	return {
		type: types.OPEN_FORM
	}
}

export const onCloseForm = () => {
	return {
		type: types.CLOSE_FORM
	}
}

export const onUpdateStatus = (id) => {
	return {
		type: types.UPDATE_STATUS_TASK,
		id
	}
}

export const onDeleteTask = (id) => {
	return {
		type: types.DELETE_TASK,
		id
	}
}