import React from 'react'
import { useFetchData } from '../../hooks/useFetch'

export const ProfilePage = () => {

  const [profile,loading,error] = useFetchData('/user/profile')
  return (
    <div className='mt-20'>ProfilePage</div>
  )
}
