import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';


class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			tasks : [],
            isDisplayForm : false,
            taskEditing : null,
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

	componentDidMount() {
		if (localStorage && localStorage.getItem('tasks')) {
			var tasks = JSON.parse(localStorage.getItem('tasks'));
			this.setState({
				tasks : tasks
			});
		}
	}
	


	s4()
	{
		return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
	}

	generateID()
	{
		return this.s4() + this.s4() + '-' + this.s4();
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

    onShowForm = () => {
        this.setState({
            isDisplayForm : true
        });
    }

    onSubmit = (data) => {
        var {tasks} = this.state;
        if (data.id === '')
        {           
            data.id = this.generateID();
            tasks.push(data);
            
        } else 
        {
            var index = this.findIndex(data.id);
            tasks[index] = data;
        };
        this.setState({
                tasks : tasks,
                taskEditing : null
            });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onUpdateStatus = (id) =>{
    	var {tasks} = this.state;
    	var index = this.findIndex(id);
    	if (index !== -1) {
    		tasks[index].status = !tasks[index].status;
    	}
    	this.setState({
    		tasks : tasks
    	});
    	localStorage.setItem('tasks', JSON.stringify(tasks));

    }

    onDelete = (id) =>{
    	var {tasks} = this.state;
    	var index = this.findIndex(id);
    	if (index !== -1) {
    		console.log(index);
    		tasks.splice(index, 1);
    	}
    	this.setState({
    		tasks : tasks
    	});
    	localStorage.setItem('tasks', JSON.stringify(tasks));
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

		var {tasks, isDisplayForm, filter, keyWord, mainFilter} = this.state;
        if (filter) {
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
            }

        if (mainFilter.by === 'name') {
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
        }
        
        var eleForm = (isDisplayForm ?
             <TaskForm 
                onSubmit = {this.onSubmit}
                onCloseForm = {this.onCloseForm}
                taskEditing = {this.state.taskEditing}
                /> : '');
		return (
			<div className="container">
        <div className="text-center">
            <h1>Task Mamagement</h1>
            <hr/>
            
        </div>
        <div className="row">

        		
            <div className= {isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
             	{eleForm}
            </div>

            <div className= {isDisplayForm?'col-xs-8 col-sm-8 col-md-8 col-lg-8': 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick = {this.showTask}
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
                        	onUpdateStatus = {this.onUpdateStatus}
                        	onDelete = {this.onDelete}
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

export default App;
