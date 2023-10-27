import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Create_Todo from '../Components/Create_Todo'
import Show_Todo from '../Components/Show_Todo'
import Update_Todo from '../Components/Update_Todo'

const All_Path = () => {
  return (
   <>
   <Routes>
    {/* <Route path='/' element={"Abc"}/> */}
    <Route path='/' element={<Create_Todo/>}/>

    <Route path='/create-todo' element={<Create_Todo/>}/>
    <Route path='/Show-todo' element={<Show_Todo/>}/>
    <Route path='/Update-todo' element={<Update_Todo/>}/>   
   </Routes>
   </>
  )
}

export default All_Path