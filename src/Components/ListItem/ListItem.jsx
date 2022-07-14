import React, { useContext } from 'react'
import { AppContext } from '../Context/AppContext'

import clsx from "clsx";

import IconTrash from '../Icons/IconTrush'
import IconCheck from '../Icons/IconCheck'

import './ListItem.scss'

export const ListItem = ({description, onToggleTask = () => {}, onDelete, id, isDone }) => {
  const ctx = useContext(AppContext)

  const handleButtonClick = () => {
    isDone ? onToggleTask(id, false) : onToggleTask(id, true)
  }

  return (
    <div key={id} className={clsx('listItem', !ctx.isLightTheme && 'darkListItem')}>
      <button className={isDone ? 'listItemToggleSelected' : 'listItemToggle'} onClick={handleButtonClick}>{isDone ? <IconCheck size={18} /> : null}</button>
      <span className="description">{description}</span>
      <button className="listItemDeleteButton" onClick={() => onDelete(id)}><IconTrash size={20} /></button>
    </div>
  )
}