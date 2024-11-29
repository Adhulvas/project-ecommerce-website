import React from 'react'
import { useNavigate } from 'react-router-dom'

export const ErrorPage = () => {

  const navigate = useNavigate()
  return (
    <div>
      <h1>404 Not Found</h1>
      <h2 onClick={()=>navigate('/')}>Go Back To Home</h2>
    </div>
  )
}
