import React from 'react'
import { useState } from 'react';
import {UserProvider, UserConsumer} from '../store/contexts/UserContext'

const UserPage = function () {
  let [newName, setNewName] = useState('')
  return (
    <UserConsumer>
      { (user) => (
        <div>
          <label>{user.state.name}</label>
          <input value={newName} onChange={(e) =>setNewName(e.target.value)} />
          <button onClick={() => user.dispatch({state: {name: newName}, type: 'set'})}>Change Name</button>
        </div>
      )}
    </UserConsumer>
  )
}


const DevPage = function () {
  return (
    <div>
      <UserProvider>
        <h1>This is the DEV Page</h1>
        <UserPage />
      </ UserProvider>
    </div>
  )
}



export default DevPage
