import React, {Component} from 'react';
import './Trello.css';

class Trello extends Component{
    constructor(props){
        super(props);
        this.state={
            taskName: '',
            status: 'Open'
        }
        this.handleChange = this.handleChange.bind(this);
        this.searchTask = this.searchTask.bind(this);
        this.showAll = this.showAll.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this)
    }

    searchTask(e){
        e.preventDefault();
        this.props.search(this.state.taskName)
        this.setState({
            taskName: ''
        })
    }

    handleChangeStatus(e,id_task) {
        let updateStatus ={
            id: id_task,
            status: e.target.value
        }
        this.props.changeStatus(updateStatus);
    }

    showAll(){
        this.props.all();
    }

    handleChange(e){
        this.setState({
            taskName: e.target.value
        })
    }

    render(){
        const listStatus = this.props.status.map((stat,i)=>{
            return(
                <option className={'text-white border-0'} key={i} value={stat}>{stat}</option>
            )
        })
        const listTasks = this.props.todos.map(task=>{
            let className = 'bg-light';
            let bg = 'bg-light'
            switch(task.status){
                case 'Open':
                className = 'card text-white bg-success mb-3';
                bg = 'text-white bg-success';
                break;

                case 'Completed':
                className = 'card text-white bg-info mb-3'
                bg = 'text-white bg-info';
                break;

                case 'In-Progress':
                className = 'card text-white bg-primary mb-3'
                bg = 'text-white bg-primary';
                break;

                case 'Archived':
                className = 'card text-white bg-warning mb-3'
                bg = 'text-white bg-warning';
                break;

                default:
                className = 'bg-light';
                bg = 'text-white bg-success';
            }
            return(
                <div className={'col-md-4 text-center'} key={task._id}>
                    <div className={className}>
                        <div className="card-header border-0">
                            <select className={"custom-select border-0"+bg} onChange={(e)=>this.handleChangeStatus(e,task._id)}>
                            <option>Change status</option>
                                {listStatus}
                            </select>
                            {task.status}
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{task.title}</h5>
                            <p className="card-text">{task.description}.</p>
                            <small>
                                {task.userVirtual ? task.userVirtual.map(user=>{
                                return (
                                    <div key={user._id}>
                                        <b style={{color:'#000000'}}>
                                            {user.name}
                                        </b>
                                    </div>
                                    )
                                }):null
                                }
                            </small>
                        </div>
                    </div>
                </div>
            )
        })
        return(
            <div className={'Trello container'}>
                <form onSubmit={this.searchTask}>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Search task by name" required onChange={this.handleChange} value={this.state.taskName}/>
                        <small className="form-text text-muted">Enter here task name please.</small>
                    </div>
                    <button type="submit" className="btn  btn-outline-primary">Search</button>
                    <button type="button" className="btn ml-3 btn-outline-success" onClick={this.showAll}>Show all</button>
                </form>
                <p className={'lead text-center'}>List of tasks</p>
                <div className={'row'}>
                    {listTasks}
                </div>
            </div>
        )
    }
}

export default Trello;