import React, { useContext } from 'react'
import TodoContext from '../Context/TodoContext'
import { Button } from '@mui/material'

const Show_Todo = () => {
  const {data,setData} =useContext(TodoContext)
  const deletetodo=(item)=>{
    const alldata=data.filter((i,ind)=>item!==i)
    setData(alldata)
  }
  return (
   <>
    <div className='text-center'>Show_Todo</div>
    <div className="container">
      <div className="row">
        <div className="col-8 d-block">
        <ul className='list-group'>
        <li className='list-group-item text-center'>Todo List</li>
      </ul>
      <ul className='list-group'>
       {data?.map((item,ind)=>{
        return(
          <li className='list-group-item' key={ind}>{item} <button onClick={()=>deletetodo(item)}>Delete</button></li>
        )
       })}
      </ul>
        </div>
      </div>
    </div>

   </>
  )
}

export default Show_Todo