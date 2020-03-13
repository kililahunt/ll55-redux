import React, { Component } from 'react';
import TaskItem from './TaskItem';
import { connect } from 'react-redux';

class TaskList extends Component {

    constructor(props) {
      super(props);
    
      this.state = {
        filterName : '',
        filterStatus : -1,       
      };
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.props.onFilter(
            name ==='filterName' ? value : this.state.filterName, 
            name ==='filterStatus' ? value : this.state.filterStatus);
        this.setState({
            [name] : value
        });
    }

	render() {

        var {tasks} = this.props;

        var ele = tasks.map((task, index) => {
            return <TaskItem
                key= {task.id} 
                index = {index}
                task = {task}
                onDelete = {this.props.onDelete}
                onUpdate = {this.props.onUpdate}
            />
        });

		return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th className="text-center">ID</th>
                        <th className="text-center">Name</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input 
                                type="text" 
                                className="form-control" 
                                name = "filterName"
                                onChange = {this.onChange}
                            />
                        </td>
                        <td>
                            <select 
                                className="form-control"
                                name = "filterStatus"
                                onChange = {this.onChange}
                            >
                                <option value= {-1}>All</option>
                                <option value= {0}>Deactive</option>
                                <option value= {1}>Active</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>

                    {ele}

                </tbody>
            </table>
			
	   );
	}
}

const mapStateToProps = (state) => {
    return {
        tasks : state.tasks
    }
};

export default connect(mapStateToProps, null)(TaskList);
