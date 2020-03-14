import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions';


class TaskItem extends Component {

    onUpdateStatus = () =>{
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDelete = () =>{
        this.props.onDeleteTask(this.props.task.id);
    }

    onUpdate = () =>{
        this.props.onUpdate(this.props.task.id);
    }

	render() {
        var {task, index} = this.props;

		return (
            <tr>
                <td> {index + 1} </td>
                <td> {task.name} </td>
                <td className="text-center">
                    <span 
                        onClick = {this.onUpdateStatus}
                        className= {task.status ? 'label label-success' : 'label label-danger'}>
                                {task.status?'Active':'Deactive'}
                    </span>
                </td>
                <td className="text-center">
                    <button type="button" 
                        className="btn btn-warning"
                        onClick = {this.onUpdate}
                    >
                        <span className="fa fa-pencil mr-5"></span>Edit
                    </button>
                    &nbsp;
                    <button onClick = {this.onDelete} type="button" className="btn btn-danger">
                        <span 
                            className="fa fa-trash mr-5"
                        ></span>Delete
                    </button>
                </td>
            </tr>
	   );
	}
}

const mapStateToProps = (state) => {
    return{};
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus: (id) => dispatch(actions.onUpdateStatus(id)),
        onDeleteTask: (id) => dispatch(actions.onDeleteTask(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
