import React from 'react'
import ReactDOM from 'react-dom';

import './Modal.scss';

export const Modal = ({children}) => {

  return ReactDOM.createPortal(
    <>
      <div className="overlay"/>
        <div className="wrapper">
            {children}
        </div>
    </>,
    document.getElementById('app_modal')
  )
}