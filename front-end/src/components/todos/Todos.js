import React, {Component} from 'react';
import './Todos.css';

class Todos extends Component{
    constructor(props){
        super(props);
        this.state={
            status: 'Open',
            title: '',
            description: '',
            _id: '',
            userVirtual: '',
            taskName: '',
            statusFilter: 'Open'
        }
        this.handleChange = this.handleChange.bind(this);
        this.addToDo = this.addToDo.bind(this);
        this.handleChangeFilter = this.handleChangeFilter.bind(this);
    }
    handleChangeStatus(e) {
        this.setState({status: e.target.value});
    }
    handleChangeUser(e) {
        this.setState({userVirtual: e.target.value});
    }
    handleChangeTasks(e) {
        this.setState({taskName: e.target.value});
    }
    handleChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]:value
        })
    }
    asignUser(user,task){
        if(this.state.taskName !== '' && this.state.userVirtual !== ''){
            this.props.asign(user,task)
        }
    }
    removeUserToDo(id){
        this.props.removeUser(id);
    }
    addToDo(e){
        e.preventDefault();
        if(this.state._id){
            this.props.edit(this.state)
        }else{
            this.props.add(this.state);
            this.setState({
                status: 'Open',
                title: '',
                description: '',
                _id: ''
            })
        }  
    }
    deleteToDo(id){
        this.props.delete(id);
    }
    editToDo(id){
        fetch(`http://localhost:8000/todos/${id}`)
      .then(res=>res.json())
      .then(data=>{
        this.setState({
            status: data.message.status,
            title: data.message.title,
            description: data.message.description,
            _id: data.message._id
        })
      })
      .catch(err=>{
        console.log(err)
      })
    }
    handleChangeFilter(e){      
        this.props.filterTasks(e.target.value)
        this.setState({
            statusFilter: this.props.todos.status
        })
        console.log(this.state.statusFilter)
    }
    render(){
        const listTasks = this.props.todos.map(task=>{
            return(
                <option key={task._id} value={task.title}>{task.title}</option>
            )
        })
        const listUsers = this.props.users.map(user=>{
            return(
                <option key={user._id} value={user.name}>{user.name}</option>
            )
        })
        const listStatus = this.props.status.map((stat,i)=>{
            return(
                <option key={i} value={stat}>{stat}</option>
            )
        })
        const listStatusFilter = this.props.status.map((stat,i)=>{
            return(
                <option key={i} value={stat}>{stat}</option>
            )
        })
        const listToDos = this.props.todos.map(toDo=>{
            return(
                <tr key={toDo._id}>
                    <td>{toDo.title}</td>
                    <td>{toDo.creation_date}</td>
                    <td>{toDo.status}</td>
                    <td>{toDo.userVirtual ? toDo.userVirtual.map(user=>
                        (
                                <div key={user._id}>
                                    <i 
                                    style={{color:'#CF0000'}} 
                                    className="fas fa-minus-circle"
                                    onClick={()=>{this.removeUserToDo(toDo._id)}}
                                    >
                                    </i>
                                    &nbsp;
                                    <b style={{color:'#000000'}}>
                                        {user.name}
                                    </b>
                            </div>
                            )
                        ):null}
                    </td>
                    <th>
                        <i className="far fa-edit" onClick={()=>{this.editToDo(toDo._id)}} style={{color:'#001C96'}}></i>
                            &nbsp; &nbsp; &nbsp;
                        <i className="fas fa-trash" onClick={()=>{this.deleteToDo(toDo._id)}} style={{color:'#CF0000'}}></i>
                    </th>
                </tr>
            )
        })
        return(
            <div className='Todos container-fluid'>
                <div className={'row'}>
                    <div className={'col md-6'}>
                        <p className="lead">To Do Form</p>   
                        <form onSubmit={this.addToDo}>
                            <div className="form-group">
                                <input type="text" name={'title'} className="form-control" placeholder="Enter title" required onChange={this.handleChange} value={this.state.title}/>
                            </div>
                            <div className="form-group">
                                <input type="text" name={'description'} className="form-control" placeholder="Enter description" required onChange={this.handleChange} value={this.state.description}/>
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <label className="input-group-text">Status</label>
                                </div>
                                <select onChange={this.handleChangeStatus.bind(this)} className="custom-select" value={this.state.status}>
                                    {listStatus}
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">Save &nbsp;<i className="far fa-save"></i></button>
                        </form>
                    </div>
                    <div className={'col md-6'}>
                    <p className={'lead'}>Assigning and removing tasks to a user</p>
                        <form className={'mx-auto'}>
                            <div className={'row text-center'}>
                                <table className="table table-borderless table-responsive mx-auto">
                                <thead>
                                    <tr>
                                    <th scope="col">Task</th>
                                    <th scope="col">User</th>
                                    <th scope="col">Asign</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>
                                        <select onChange={this.handleChangeTasks.bind(this)} className="custom-select">
                                            <option>Select To Do</option>                                            
                                            {listTasks}
                                        </select>
                                    </td>
                                    <td>
                                        <select onChange={this.handleChangeUser.bind(this)} className="custom-select">
                                            <option>Select User</option>
                                            {listUsers}
                                        </select>
                                    </td>
                                    <td>
                                        <i style={{color:'#001C96'}} className="fas fa-plus-circle mt-2" onClick={()=>{this.asignUser(this.state.userVirtual, this.state.taskName)}}></i>
                                    </td>
                                    </tr>
                                </tbody>
                                </table>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={'row mt-3'}>
                <hr></hr>
                    <div className={'col-md-12'}>
                    <p className={'lead text-center'}>List of To Dos</p>
                        <div className={'row'}>
                            <select onChange={this.handleChangeFilter.bind(this)} className="custom-select" defaultValue={this.state.statusFilter}>  
                                <option value={'All'}>All</option>
                                {listStatusFilter}
                            </select>
                        </div>
                        <div className={'table-responsive'}>
                            <table className="table table-hover mt-2">
                                <thead className={'shadow-lg p-3 mb-5 bg-white rounded'}>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Creation Date</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">User</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {listToDos}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
}

export default Todos;