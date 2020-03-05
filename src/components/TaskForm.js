import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions';

class TaskForm extends Component {

    constructor(props) {
      super(props);  
      this.state = {
        id : '',
        name : '',
        status : true
      };
    }

    componentWillMount() {
        
    }
     
    componentWillReceiveProps(nextProps) {
       if (nextProps && nextProps.taskEditing)
        {
        this.setState({
            id : nextProps.taskEditing.id,
            name : nextProps.taskEditing.name,
            status : nextProps.taskEditing.status
        });
        console.log(this.state);
        } else if (!nextProps.taskEditing)
        {
            this.setState({
                id : '',
                name : '',
                status : true
            })
        }
    }

    onHandleClose = () =>{
        this.props.onCloseForm();
    }

    onChange = (event) =>{
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if (name === 'status')
        {
            value = target.value ==='true' ? true : false
        }
        this.setState({
            [name] : value
        });
    }

    onSubmit = (event) =>{
        event.preventDefault();
        this.props.onAddTask(this.state);
        /*this.props.onSubmit(this.state);*/
        this.onClear();
    }

    onClear = () => {
        this.setState({
            name : '',
            status : true
        });
    }

	render() {

        var {id} = this.state;

		return(
			  <div className="panel panel-warning">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            {(id !== '') ? 'Edit Task' : 'Add Task'}
                                <span
                                className = "fa fa-times-circle text-right"
                                onClick = {this.onHandleClose}
                                ></span>
                        </h3>                       
                    </div>
                    <div className="panel-body">
                        <form onSubmit = {this.onSubmit}>
                            <div className="form-group">
                                <label>Name :</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    name = "name"
                                    value = {this.state.name}
                                    onChange = {this.onChange}
                                />
                                    
                            </div>
                            <label>Status :</label>
                            <select 
                                className="form-control" 
                                required="required"
                                name = "status"
                                value = {this.state.status}
                                onChange = {this.onChange}
                                >
                                    <option value={true}>Active</option>
                                    <option value={false}>Deactive</option>
                            </select>
                            <br/>
                            <div className="text-center">
                                <button type="submit" className="btn btn-warning">Save</button>&nbsp;
                                <button onClick = {this.onClear} type="button" className="btn btn-danger">Clear</button>
                            </div>
                        </form>
                    </div>
                </div>
		);
	}
}

const mapDispatchToProps = (dispatch, task) => {
    return {
        onAddTask: (task) => dispatch(actions.onAddTask(task))
    }
}

export default connect(null, mapDispatchToProps)(TaskForm);