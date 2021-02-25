import React from 'react'

function User ({ details }) {
  if (!details) {
    return <h3>Fetching current User details...</h3>
  }

  return (
    <div className='user container'>
      <span className='userName'>{details.name.toUpperCase()}&nbsp;</span>
      <span>{details.email.toLowerCase()}</span>
    </div>
  )
}

export default User
