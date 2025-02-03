import { useState } from 'react'

import './App.css'
import Navbar from './components/Navbar'
import Body from './components/body'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='bg-[#1d2023] px-20'>
    <Navbar />
    <Body />
      
      </div>
    </>
  )
}

export default App
