import React, { Component } from 'react';
import TaskSearchControl from './TaskSearchControl';
import TaskSortControl from './TaskSortControl';

class TaskControl extends Component {
	render() {
		return (
			<div>
				<TaskSearchControl onSearch = {this.props.onSearch}/>
				<TaskSortControl onMainFilter = {this.props.onMainFilter}/>
            </div>
		);
	}
}

export default TaskControl;