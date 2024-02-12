import React from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'

function Imageblend() {
  return (
    <div className='App-container'>
        <div>
        <img src="https://logos-world.net/wp-content/uploads/2021/11/Tata-Logo-500x281.png" alt=""/>
      <Link to='/'>
       <br/>
       <br/>
        <button className='button'>Go Back</button>
        </Link>
        </div>
    </div>
  )
}

export default Imageblend