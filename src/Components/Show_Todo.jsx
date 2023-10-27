import React, { useContext } from 'react'
import TodoContext from '../Context/TodoContext'
import { Button } from '@mui/material'

const Show_Todo = () => {
  const {data} =useContext(TodoContext)
  return (
   <>
    <div>Show_Todo</div>
    <div className="container">
      <div className="row">
        <div className="col-8 d-block">
        <ul className='list-group'>
        <li className='list-group-item'>Todo List</li>
      </ul>
      <ul className='list-group'>
       {data?.map((item,ind)=>{
        return(
          <li className='list-group-item' key={ind}>{item}</li>
        )
       })}
      </ul>
        </div>
        <div className="col-4">
          <Button variant='contained'>Add Todo</Button>
        </div>
      </div>
    </div>

   </>
  )
}

export default Show_Todo