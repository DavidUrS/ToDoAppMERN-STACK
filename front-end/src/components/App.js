import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Todos from './todos/Todos';
import Users from './users/Users';
import Trello from './trello/Trello';
import Navigation from './navigation/Navigation';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state={
      listStatus:[],
      toDos:[],
      users:[]
    }
  }

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
      console.log(data.message)
      this.getToDos();
    })
    .catch(err=>{
      console.log(err)
    })
  }
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
        console.log(data.message)
        this.getToDos();
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }
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
        console.log(data.message)
        this.getToDos();
      })
      .catch(err=>{
        console.log(err)
      })
  }

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
      console.log(data.message)
      this.getToDos();
    })
    .catch(err=>{
      console.log(err)
    })
  }

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
      console.log(data.message)
      this.getToDos();
    })
    .catch(err=>{
      console.log(err)
    })
  }
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
    })
    .catch(err=>{
      console.log(err)
    })
  }


  componentDidMount(){
    this.getUsers();
    this.getStatus();
    this.getToDos();
  }
  
  
  render() {
    return (
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
          <Route path='/users' component={Users}/>
          
        </Switch>
      </div>
      
      </BrowserRouter>
    );
  }
}

export default App;
