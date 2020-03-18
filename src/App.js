import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';
import {connect} from 'react-redux';
import * as actions from './actions/index'


class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
            isDisplayForm : false,
            filter : {
                name : '',
                status : -1
            },
            keyWord : '',
            mainFilter : 
                {
                by : 'name',
                status : 1
            }
		}
	}
	

    showTask = () =>
    {
        this.setState({
            isDisplayForm: true,
            taskEditing: null
        });
    }

    onCloseForm = () => {
        this.setState({
            isDisplayForm: false
        });
    }

    onToggleForm = () => {
        var { taskEditing } = this.props;
        if (taskEditing && taskEditing.id) {
            this.props.onOpenForm();
        } else {
            this.props.onToggleForm();
        }     
        this.props.onClearTask({
            id: '',
            name: '',
            status: false
        });
    }

    

    onUpdate = (id) => {
        this.onShowForm();
        var index = this.findIndex(id);
        var {tasks} = this.state;
        var taskEditing = tasks[index]
        this.setState({
            taskEditing : taskEditing
        });          
    }

    onFilter = (filtername, filterstatus) => {
        filterstatus = parseInt(filterstatus, 10);
        this.setState ({
            filter : {
                name: filtername.toLowerCase(),
                status : filterstatus
            }
        });
    }

    onMainFilter = (data) => {
        var filter = data;
        this.setState({
            mainFilter : filter
        });
    } 

    onSearch = (keyWord) => {
        this.setState({
            keyWord : keyWord
        });
    }

   findIndex = (id) => {
   		var {tasks} = this.state;
   		var result = -1;
   		tasks.forEach((task, index) => {
   			if (task.id === id) {
   				result = index;
   			}
   		});
   		return result;
   }

	render() {

        /*if (filter) {
            if (filter.name)
            {
                tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(filter.name) !== -1;
                });
            }
            tasks = tasks.filter((task) => {
                if ( filter.status === -1 ) {
                    return task
                } else {
                    return task.status === ((filter.status === 1) ? true : false)
                }
            });
        }

        if (keyWord)
            {
                tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(keyWord) !== -1;
                });
            }*/

        /*if (mainFilter.by === 'name') {
            tasks.sort((a, b) => {
                if (a.name > b.name) return mainFilter.status;
                else if (a.name < b.name) return -mainFilter.status;
                else return 0;
            });
        } else if (mainFilter.by === 'status') {
            tasks.sort((a, b) => {
                if (a.status > b.status) return -mainFilter.status;
                else if (a.status < b.status) return mainFilter.status;
                else return 0;
            });
        }*/

        var {isDisplayForm} = this.props;
        
		return (
			<div className="container">
        <div className="text-center">
            <h1>Task Mamagement</h1>
            <hr/>
            
        </div>
        <div className="row">

        	
            <div className= {isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
             	<TaskForm />
            </div>

            <div className= {isDisplayForm?'col-xs-8 col-sm-8 col-md-8 col-lg-8': 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick = {this.onToggleForm}
                >
                    <span className="fa fa-plus mr-5"></span>Add Task
                </button>

            

             {/*SEARCH*/}
                <div className="row mt-15">
                    <TaskControl 
                        onSearch = {this.onSearch}
                        onMainFilter = {this.onMainFilter}
                    />
                </div>

                <div className="row mt-15">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <TaskList 
                            onUpdate = {this.onUpdate}
                            onFilter = {this.onFilter}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
	);
	}
}

const mapStateToProps = (state) => {
    return {
        isDisplayForm : state.isDisplayForm,
        taskEditing : state.taskEditing
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onToggleForm : () => {
            dispatch(actions.onToggleForm())
        },
        onClearTask: (task) => {
            dispatch(actions.onEditTask(task))
        },
        onOpenForm: () => {
        dispatch(actions.onOpenForm())
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
