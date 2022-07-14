import React, { useContext, useEffect, useState } from 'react'
import clsx from 'clsx'

import { ListItem } from '../ListItem/ListItem'
import { UserModal } from '../UserModal/UserModal'
import { AppContext } from '../Context/AppContext'

import './ToDoList.scss'

export const ToDoList = ({
  setTaskView,
  isTaskView,
  toggleThemeChange,
  tasks = [],
  onDelete,
  onToggleTask,
  onCreateUser,
  onLogUser,
  onAddTask,
  time
}) => {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const ctx = useContext(AppContext)

  const token = localStorage.getItem('token')
  const isTokenInvalid = token === 'undefined' || token === '' || token === undefined || token === null

  const toDoTask = tasks.filter((task) => !task.completed)
  const doneTask = tasks.filter((task) => task.completed)

  useEffect(() => {
    if (isTokenInvalid) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [])

  const onEnter = (e) => {
    if (e.key === 'Enter') {
      onAddTask(inputValue);
      setInputValue('')
    }
  }

  const submitTask = () => {
    onAddTask(inputValue)
    setInputValue('')
  }

  return(
    <div className={clsx('container', !ctx.isLightTheme && 'darkContainer')}>
      {(ctx.isRegisteredOrLogged || token) && (
        <>
          <div className="header">
            <div className="actionsButtons">
              <button onClick={() => setTaskView(true)}>
                Tasks
              </button>
              <div className="spacer" />
              <button onClick={() => setTaskView(false)}>
                Done
              </button>
              <div className="spacer" />
              <button onClick={toggleThemeChange}>
                Change Theme
              </button>
              <div className="spacer" />
              <span className="timer">{time}</span>
            </div>
          </div>
          <div className="content">
            {isTaskView && (
              <div className='userInput'>
                <input
                  onKeyPress={onEnter}
                  placeholder='ENTER TASK'
                  onChange={(e) => setInputValue(e.target.value)}
                  value={inputValue}
                  type='text'
                  className="listInputNewTask"
                  maxLength="255"
                  max="255"
                />
                <div className='addButton' onClick={submitTask}>ADD</div>
              </div>
            )}
            <div className="itemsContainer">
              {isTaskView ? (
                <div>
                  <h1 className="sectionTitle">TO DO</h1>
                  {toDoTask.map((task, index) => (
                    <ListItem
                      key={task._id}
                      id={task._id}
                      isDone={task.completed}
                      description={task.description}
                      onDelete={onDelete}
                      onToggleTask={onToggleTask}
                    />
                  ))}
                </div>
              ) : (
                <div>
                  <h1 className="sectionTitle">Done</h1>
                  {doneTask.map((task, index) => (
                    <ListItem
                      key={task._id}
                      id={task._id}
                      isDone={task.completed}
                      description={task.description}
                      onDelete={onDelete}
                      onToggleTask={onToggleTask}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

        </>
      )}
      {(!ctx.isRegisteredOrLogged || isTokenInvalid) && (
        <button className="signButton" onClick={() => setOpen(!open)}>
          Sign Up / Sign In
        </button>
      )}
      {open && (
        <UserModal onLogUser={onLogUser} onCreateUser={onCreateUser} setOpen={() => setOpen(!open)} />
      )}
    </div>
  )
}