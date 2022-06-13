import React, { useEffect, useRef, useState } from 'react'
import CoinList from './CoinList'
import SearchBar from './SearchBar'
import PageSizeSelector from './pageSizeSelector/PageSizeSelector'
import Paginator from './paginator/Paginator'

const DATA_REFRESH_INTERVAL = 10000

function CoinMonitor() {
  const [keyword, setKeyword] = useState('')
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [data, setData] = useState([])
  const [perPage, setPerPage] = useState(10)
  const [page, setPage] = useState(1)
  const interval = useRef(null)
  const allItems = useRef([])

  const queryParam = keyword ? `&ids=${encodeURIComponent(keyword)}` : ''
  const requestURL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd${queryParam}&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=24h%2C7d`
  
  async function fetchData(url) {
      const res = await fetch(url)
      const data = await res.json()
      return data
  }
  
  useEffect(() => {
    console.log('useEffect: keyword:', keyword)
    console.log('useEffect: autoRefresh:', autoRefresh)
    
    if (autoRefresh) {
      fetchData(requestURL).then(data => setData(data))
    
      interval.current = setInterval(() => {
                                            fetchData(requestURL)
                                                    .then(data => {
                                                      setData(data)
                                                      console.log({name: 'Bitcoin', price: data[0].current_price})
                                                      console.log('fetchData() :', new Date().toLocaleTimeString())
                                                    })
                                          }
      , DATA_REFRESH_INTERVAL)
    }

    
    return () => {
      if (interval.current) clearInterval(interval.current)
    }
  }, [requestURL, autoRefresh])

  useEffect(() => {
    const allItemsRequestURL = requestURL.replace('per_page=10', 'per_page=100')

    fetchData(allItemsRequestURL).then(data => allItems.current = data)
  }, [])
  
  function filterList(filterValue) {
    if(filterValue !== '')
      setData(allItems.current.filter(item => item.name.toLowerCase().includes(filterValue.toLowerCase()) || item.symbol.toLowerCase().includes(filterValue.toLowerCase())))
    else {
      setKeyword('')
      console.log('filterList: setKeyword emptyString')
    }
  }

  function setList(searchTerm) {
    const idsArray = searchTerm ? allItems.current
                          .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.symbol.toLowerCase().includes(searchTerm.toLowerCase()))
                          .map(item => item.id)
                          : []
    const keyword = idsArray.join(',')
    setKeyword(keyword)
    console.log('setList: keyword: ', keyword)
  }  

  return (
      <>
          <SearchBar setList={setList} filterList={filterList} setAutoRefresh={setAutoRefresh}/>
          <div className="main-container">
            <PageSizeSelector setPerPage={setPerPage} setAutoRefresh={setAutoRefresh}/>
            <CoinList data={data} setData={setData} setAutoRefresh={setAutoRefresh} />
          </div>
          <Paginator setPage={setPage} itemsPerPage={perPage} setAutoRefresh={setAutoRefresh} setKeyword={setKeyword}/>
      </>
  )
}

export default CoinMonitor