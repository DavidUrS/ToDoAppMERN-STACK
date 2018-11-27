import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Todos from './todos/Todos';
import Users from './users/Users';
import Trello from './trello/Trello';
import Navigation from './navigation/Navigation';
import Notifications, {notify} from 'react-notify-toast';

import './App.css';

class App extends Component {
    //Constructor for initialize states of component
  constructor(){
    super();
    this.state={
      listStatus:[],
      toDos:[],
      users:[]
    }
  }

  //Function to get all users
  getUsers(){
    fetch('http://localhost:8000/user')
    .then(response => response.json())
    .then(data => {
      this.setState({
        users:data.message
      })
    })
    .catch(error => console.error(error))
  }

  //Function to create a new user or edit user (if newUser._id !=='')
  addUser(newUser){
    if(newUser._id){
      fetch(`http://localhost:8000/user/${newUser._id}`,{
        method: 'PUT',
        body: JSON.stringify(newUser),
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json'
        }
      })
      .then(res=>res.json())
      .then(data=>{
        this.getUsers();
        this.getToDos();
        notify.show(data.message,data.type);
      })
      .catch(err=>{
        console.log(err)
      })

    }else{
      fetch(`http://localhost:8000/user`,{
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json'
        }
      })
      .then(res=>res.json())
      .then(data=>{
        this.getUsers();
        this.getToDos();
        notify.show(data.message,data.type);
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }

  //Function to delete a user
  deleteUser(id){
    if(window.confirm('Sure?')){
      fetch(`http://localhost:8000/user/${id}`,{
        method: 'DELETE',
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json'
        }
      })
      .then(res=>res.json())
      .then(data=>{
        this.getUsers();
        this.getToDos();
        notify.show(data.message,data.type);        
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }
  
  //Function to get enum values of status
  getStatus(){
    fetch('http://localhost:8000/todos/status')
    .then(response => response.json())
    .then(data => {
      this.setState({
        listStatus:data.message
      })
    })
    .catch(error => console.error(error))
  }

  //Function to get tasks
  getToDos(){
    fetch('http://localhost:8000/todos')
    .then(response => response.json())
    .then(data => {
      this.setState({
        toDos:data.message
      })
    })
    .catch(error => console.error(error))
  }

  //Function to create new task
  addToDo(toDo){
    fetch('http://localhost:8000/todos',{
      method: 'POST',
      body: JSON.stringify(toDo),
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    })
    .then(res=>res.json())
    .then(data=>{
      this.getToDos();
      notify.show(data.message,data.type);
    })
    .catch(err=>{
      console.log(err)
    })
  }

  //Function to delete a task
  deleteToDo(id_toDo){
    if(window.confirm('Sure?')){
      fetch(`http://localhost:8000/todos/${id_toDo}`,{
        method: 'DELETE',
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json'
        }
      })
      .then(res=>res.json())
      .then(data=>{
        this.getToDos();
        notify.show(data.message,data.type);
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }

  //Function to edit a task
  editToDo(toDo){
    fetch(`http://localhost:8000/todos/${toDo._id}`,{
        method: 'PUT',
        body: JSON.stringify(toDo),
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json'
        }
      })
      .then(res=>res.json())
      .then(data=>{
        this.getToDos();
        notify.show(data.message,data.type);
      })
      .catch(err=>{
        console.log(err)
      })
  }

  //Function to asign user to a task
  asignUser(userVirtual,taskName){
    const asign = {
      userVirtual,
      taskName
    }
    fetch(`http://localhost:8000/todos/asign`,{
      method: 'POST',
      body: JSON.stringify(asign),
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    })
    .then(res=>res.json())
    .then(data=>{
      this.getToDos();
      notify.show(data.message,data.type);
    })
    .catch(err=>{
      console.log(err)
    })
  }

  //Function to remove user from a task
  removeUser(id){
    const remove = {
      id
    }
    fetch(`http://localhost:8000/todos/remove`,{
      method: 'POST',
      body: JSON.stringify(remove),
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    })
    .then(res=>res.json())
    .then(data=>{
      this.getToDos();
      notify.show(data.message,data.type);
    })
    .catch(err=>{
      console.log(err)
    })
  }

  //Function to filter task by status
  filterTasks(status){
    fetch(`http://localhost:8000/todos/status/${status}`)
    .then(response => response.json())
    .then(data => {
      this.setState({
        toDos:data.message
      })
    })
    .catch(error => console.error(error))
  }

  ///Function tu filter task by title
  searchByName(title){
    let searh = {
      title
    }
    fetch(`http://localhost:8000/todos/search`,{
      method: 'POST',
      body: JSON.stringify(searh),
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    })
    .then(res=>res.json())
    .then(data=>{
      this.setState({
        toDos: data.message
      })
    })
    .catch(err=>{
      console.log(err)
    })
  }

  //Function to change task status
  updateStatus(newData){
    fetch(`http://localhost:8000/todos/status`,{
      method: 'POST',
      body: JSON.stringify(newData),
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    })
    .then(res=>res.json())
    .then(data=>{
      this.getToDos();
      notify.show(data.message,data.type);
    })
    .catch(err=>{
      console.log(err)
    })
  }

  //Getting users, status and tasks after the component mounted
  componentDidMount(){
    this.getUsers();
    this.getStatus();
    this.getToDos();
  }
  
  
  render() {
    return (
      //Render the components by routing, and creating de props for pass data to children components
      <BrowserRouter>
      <div>
        <Navigation/>
        <Switch>
          <Route exact path='/' component={(props)=><Todos 
          {...this.props} 
          status={this.state.listStatus}
          add={this.addToDo.bind(this)}
          todos={this.state.toDos}
          delete={this.deleteToDo.bind(this)}
          edit={this.editToDo.bind(this)}
          users={this.state.users}
          asign={this.asignUser.bind(this)}
          removeUser={this.removeUser.bind(this)}
          filterTasks={this.filterTasks.bind(this)}
          />}/>
          <Route path='/trello' component={(props)=><Trello 
          {...this.props} 
          todos={this.state.toDos}
          search={this.searchByName.bind(this)}
          all={this.getToDos.bind(this)}
          status={this.state.listStatus}
          changeStatus={this.updateStatus.bind(this)}
          />}/>
          <Route path='/users' component={(props)=><Users
          {...this.props}
          users={this.state.users}
          createUser={this.addUser.bind(this)}
          deleteUser={this.deleteUser.bind(this)}
          />}/>
          
        </Switch>
        <Notifications options={{zIndex: 200, top: '500px'}}/>

      </div>
      
      </BrowserRouter>
    );
  }
}

//Exporting the component for use in index.js
export default App;
