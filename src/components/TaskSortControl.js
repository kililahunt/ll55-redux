import React, { Component } from 'react'

class TaskSortControl extends Component {

    constructor(props) {
      super(props);
    
      this.state = {
        mainFilter : {
            by : 'name',
            status : 1
        }
      };
    }

    onMainFilter = (by, status) => {
        var filter = {
            by : by,
            status : status
        }
        this.setState({
            mainFilter : filter
        });
        this.props.onMainFilter(filter);
    }

	render() {

        var {mainFilter} = this.state;
		return (
			<div>
				
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">

                    <div className="dropdown">
                        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            Filter <span className="fa fa-caret-square-o-down ml-5"></span>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                            <li onClick = {() => this.onMainFilter('name',1)}>
                                <a className = {(mainFilter.by === 'name' && mainFilter.status === 1)?'sort_selected':''}
                                     role="button">
                                            <span className="fa fa-sort-alpha-asc pr-5">
                                                Name A-Z
                                            </span>
                                        </a>
                            </li>
                            <li onClick = {() => this.onMainFilter('name',-1)}>
                                <a className = {(mainFilter.by === 'name' && mainFilter.status === -1)?'sort_selected':''}
                                 role="button">
                                            <span className="fa fa-sort-alpha-desc pr-5">
                                                Name Z-A
                                            </span>
                                        </a>
                            </li>
                            <li role="separator" className="divider"></li>
                            <li onClick = {() => this.onMainFilter('status',1)}> 
                                <a className = {(mainFilter.by === 'status' && mainFilter.status === 1)?'sort_selected':''}
                                    role="button">Active Status</a>
                            </li>
                            <li onClick = {() => this.onMainFilter('status',-1)}>
                                <a className = {(mainFilter.by === 'status' && mainFilter.status === -1)?'sort_selected':''} 
                                 role="button">Deactive Status</a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
		);
	}
}

export default TaskSortControl;