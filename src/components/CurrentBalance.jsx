import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext';

const CurrentBalance = ({user}) => {
  const { content } = useContext(AuthContext);
  const language = localStorage.getItem("lan");
  return (
    <div className='rounded-3 py-3 px-2 px-sm-4 currentBalance d-flex align-items-center justify-content-between'>
      <h5 className="fw-bold">{content?.balance}</h5>
      <h5 className="fw-bold d-inline">{user.balance && Number(user.balance).toLocaleString()} 
        <small className='ms-2 fw-semibold'>MMK</small> </h5>
    </div>
  )
}

export default CurrentBalance
