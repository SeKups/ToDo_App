import {createContext} from 'react'

export const defaultContext = {
  isLightTheme: true,
  isRegisteredOrLogged: false,
  isUserExist: false,
  invalidEmailOrPassword: false
}

export const AppContext = createContext(defaultContext)
