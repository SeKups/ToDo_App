import React, { Component } from 'react';
import { AppContext, defaultContext } from './Context/AppContext'

import { ToDoList } from './ToDoList/ToDoList'

import { TaskServices } from '../Services/TaskServices'

import './App.scss'


const taskSrvc = new TaskServices()

export default class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      items: [],
      time: setInterval(() => this.setState({ time: new Date().toLocaleTimeString() }), 1000),
      done: [],
      temperature: 0,
      isTaskView: true,
      isLightTheme: defaultContext.isLightTheme,
      isRegisteredOrLogged: defaultContext.isRegisteredOrLogged,
      isUserExist: defaultContext.isUserExist,
      invalidEmailOrPassword: defaultContext.invalidEmailOrPassword,
      isOpen: false
    }
  }


  async componentDidMount() {
    const { data } = await taskSrvc.fetchTasks()
    this.setState({ items: data})
  }

  handleThemeChange = () => {
    this.setState({
      isLightTheme: !this.state.isLightTheme
    })
  }

  onCreateUser = async (userParams) => {
    const user = await taskSrvc.registerUser(userParams)
    debugger
    if (typeof user === 'string') {
      this.setState({ isUserExist: !this.state.isUserExist })
    } else this.setState({ isRegisteredOrLogged: !this.state.isRegisteredOrLogged })

  }

  onLogUser = async (userParams) => {
    const user = await taskSrvc.logInUser(userParams)

    if (typeof user === 'string') {
      this.setState({ invalidEmailOrPassword: !this.state.invalidEmailOrPassword })
    } else this.setState({ isRegisteredOrLogged: !this.state.isRegisteredOrLogged })

  }

  onToggleTask = async (id, isDone) => {
    const { data } = await taskSrvc.updateTask(id, isDone)
    const task = {
      _id: data._id,
      description: data.description,
      completed: data.completed
    }
    const items = this.state.items.filter((item) => item._id !== task._id)

    this.setState({
      items: [...items, task]
    });

    if (this.state.items.length === 1 && this.state.isTaskView) {
      alert("Good job!", "You clicked the button!", "success");
    }
  }

  delete = async (id) => {
    const { success } = await taskSrvc.deleteTask(id)

    if (success) {
      const newArray = this.state.items.filter((item) => item._id !== id);
      this.setState({
        items: newArray
      })
    }
  }

  addToList = async (input) => {
    if (input === '') {
      alert('empty input')
    }
    else{
      const { data } = await taskSrvc.addTask({description: input})
      const newItems = this.state.items;

      const item = {
        id: data._id,
        description: data.description,
        completed: data.completed
      }

      newItems.push(item);
      this.setState({
        items: newItems,
        userInput: ''
      })
    }
  }

  render() {
    return (
      <AppContext.Provider
        value={{
          isLightTheme: this.state.isLightTheme,
          isRegisteredOrLogged: this.state.isRegisteredOrLogged,
          isUserExist: this.state.isUserExist,
          invalidEmailOrPassword: this.state.invalidEmailOrPassword
      }}>
        <div  id="app_modal" className='App'  >
          <ToDoList
            setTaskView={(isTaskView) => this.setState({isTaskView: isTaskView})}
            toggleThemeChange={() => this.handleThemeChange()}
            onAddTask={(value)=>this.addToList(value)}
            onDelete={(id) => this.delete(id)}
            onToggleTask={(id, isDone) => this.onToggleTask(id, isDone)}
            onCreateUser={(user) => this.onCreateUser(user)}
            onLogUser={(user) => this.onLogUser(user)}
            tasks={this.state.items}
            isTaskView={this.state.isTaskView}
            time={this.state.time}
          />
        </div>
      </AppContext.Provider>

    )
  }
}
