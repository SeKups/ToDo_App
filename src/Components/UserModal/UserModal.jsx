import React, { useContext, useState } from 'react'
import { AppContext } from '../Context/AppContext'

import { Modal } from '../Modal/Modal'

import './UserModal.scss'

export const UserModal = ({ onCreateUser, onLogUser, setOpen }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [age, setAge] = useState('')
  const [isSignUpView, setIsSignUpView] = useState(true)

  const ctx = useContext(AppContext)

  const handleSignUp = () => {
    onCreateUser({name: name, email: email, password: password, age: age})

    clearModal()
  }

  const handleSignIn = () => {
    onLogUser({email: email, password: password})

    clearModal()
  }

  const clearModal = () => {
    setEmail('');
    setName('');
    setPassword('')
    setAge('')
    setOpen(false)
  }

  return (
    <Modal setOpen={setOpen}>
      {isSignUpView ? (
        <div className="contentWrapper">
          <p className="sectionTitle">Sign up</p>
          <p>Name</p>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <p>Email</p>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <p>Password</p>
          <input value={password} onChange={(e) => setPassword(e.target.value)} />
          <p>Age</p>
          <input value={age} onChange={(e) => setAge(e.target.value)} />
          <div className="buttonsContainer">
            <button onClick={handleSignUp}>Submit</button>
            <button onClick={clearModal}>Cancel</button>
            {ctx.isUserExist ? 'Username or email exist' : ''}
            <p>or <span onClick={() => setIsSignUpView(false)}>Log In</span></p>
          </div>
        </div>
      ) : (
        <div>
          <p className="sectionTitle">Sign in</p>
          <p>Email</p>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <p>Password</p>
          <input value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className="buttonsContainer">
            <button onClick={handleSignIn}>Submit</button>
            <button onClick={clearModal}>Cancel</button>
            {ctx.invalidEmailOrPassword ? 'Email or password is invalid' : ''}
            <p>or <span onClick={() => setIsSignUpView(true)}>Sign Up</span></p>
          </div>
        </div>
      )}
    </Modal>
  )
}