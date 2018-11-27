import React, {Component} from 'react';
import './Users.css';

class Users extends Component{
    //Constructor for initialize states of component
    constructor(props){
        super(props);
        this.state={
            name: '',
            lastname : '',
            _id: ''
        }
    }
    //Handle inputs by change (form)    
    handleChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }
    //Handle of submit form
    handleSubmit(e){
        e.preventDefault();
        this.props.createUser(this.state)
        this.setState({
            name:'',
            lastname:''
        })

    }
    //Function to edit a user
    editUser(id){
        fetch(`http://localhost:8000/user/${id}`)
      .then(res=>res.json())
      .then(data=>{
        this.setState({
            name: data.message.name,
            lastname: data.message.lastname,
            _id: data.message._id
        })
      })
      .catch(err=>{
        console.log(err)
      })
    }
    //Function to dele user
    deleteUser(id){
        this.props.deleteUser(id)
    }

    render(){
        //START Iteration functions, for iterate arrays and show data en html (users)
        const listUsers = this.props.users.map(user=>{
            return(
                <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.lastname}</td>
                    <th>
                        <i className="far fa-edit" onClick={()=>{this.editUser(user._id)}} style={{color:'#001C96'}}></i>
                            &nbsp; &nbsp; &nbsp;
                        <i className="fas fa-trash" onClick={()=>{this.deleteUser(user._id)}} style={{color:'#CF0000'}}></i>
                    </th>
                </tr>
            )
        })
        //END Iteration functions, for iterate arrays and show data en html (users)
        return(
            <div className='Users container text-center'>
                <div className={'row'}>
                    <div className={'col-md-6 text-center mx-auto'}>
                        <p className={'lead'}>Add new user</p>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <div className="form-group">
                                <input type="text" className="form-control" name='name' placeholder="Enter name" onChange={this.handleChange.bind(this)} value={this.state.name} required/>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" name='lastname' placeholder="Enter lastname" onChange={this.handleChange.bind(this)} value={this.state.lastname} required/>
                            </div>
                            <button type="submit" className="btn btn-outline-primary">Save &nbsp;<i className="far fa-save"></i></button>
                        </form>
                    </div>
                    <div className={'col-md-6'}>
                        <div className={'table-responsive'}>
                            <table className="table table-hover mt-2">
                                <thead className={'shadow-lg p-3 mb-5 bg-white rounded'}>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Lastname</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listUsers}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

//Exporting component
export default Users;