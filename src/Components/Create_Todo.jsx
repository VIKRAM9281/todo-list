import * as React from 'react';
import {useState,useContext} from "react"
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Box, Button } from '@mui/material';
import TodoContext from '../Context/TodoContext';
import { useNavigate } from 'react-router-dom';
const Create_Todo = () => {
  const Navigate=useNavigate()
  const [todo,setTodo]=useState("")
  const {data,setData} =useContext(TodoContext)
const HandleAdd=()=>{
  setData([...data,todo])
  Navigate("/Show-todo")
}

  return (
    <>
      <div>Create_Todo</div>
      <Stack
      component="form"
      sx={{
        width: '28ch',
      }}
      spacing={2}
      noValidate
      autoComplete="off"
    >
      <TextField
        hiddenLabel
        id="filled-hidden-label-small"
        defaultValue="Add todo"
        value={todo}
        onChange={(e)=>setTodo(e.target.value)}
        variant="filled"
        size="small"
      />
    </Stack>
  <Box mt={2}>
  <Button variant='outlined'onClick={HandleAdd} >
      Add Todo
    </Button>
  </Box>
    </>
  )
}

export default Create_Todo

