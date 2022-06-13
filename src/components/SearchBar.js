import React, { useState } from 'react'
import logo from '../logo.png'

function SearchBar({ setList, filterList, setAutoRefresh }) {
    const [inputValue, setInputValue] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        // console.log('handleSubmit: setKeyword(inputValue): inputValue:', inputValue)
        setList(inputValue)
        setAutoRefresh(true)
    }
    
    function handleChange(e) {
        setInputValue(e.target.value)
        // setData(data => data.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase())))
        filterList(e.target.value)
        setAutoRefresh(e.target.value ? false : true)
    }

  return (
    <nav className="navbar">
        <div className="nav-main">
            <div className="logo">
                <a href="/"><img src={logo} alt="logo" /></a>
                <a href="/"><h2>Coin Monitor</h2></a>
            </div>
            <form onSubmit={handleSubmit} >
                <input type="text" autoFocus placeholder="Filter by coin name or ticker symbol" value={inputValue} onChange={handleChange} />
            </form>
        </div>
    </nav>
  )
}

export default SearchBar