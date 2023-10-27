import { useState } from 'react';
import './App.css';
import TodoContext from './Context/TodoContext';
import All_Path from './Path/All_Path';

function App() {
  const [data,setData]=useState([]) //store the all Todo list data
  return (
    <div className="App">
      <TodoContext.Provider value={{data,setData}} >
        <All_Path/>
      </TodoContext.Provider>
    </div>
  );
}

export default App;
