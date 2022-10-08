import React, { useEffect, useRef, useState } from 'react'

const SORTING_FIELD = {
    NAME: 'name',
    PRICE: 'current_price',
    DAY_CHANGE: 'price_change_percentage_24h',
    WEEK_CHANGE: 'price_change_percentage_7d_in_currency',
    DAY_VOLUME: 'total_volume',
    MKT_CAP: 'market_cap'
}

const SORTING_STATES = {
    ASCENDING: 'ASCENDING',
    DESCENDING: 'DESCENDING',
    DEFAULT: 'DEFAULT',
    states: ['ASCENDING', 'DESCENDING', 'DEFAULT']
}

const ICON_CLASSNAMES = ['las la-sort-up', 'las la-sort-down', 'las la-sort']

function CoinList({ data, setData, setAutoRefresh }) {
    const [sortingStatus, setSortingStatus] = useState(null)
    const dataHasBeenSorted = useRef(false)
    
    useEffect(() => {
      if (data.length && !dataHasBeenSorted.current) {
        let sortingStatus = {};
        Object.keys(data[0]).forEach((key) => (sortingStatus[key] = 2));
        setSortingStatus(sortingStatus);
      }
    }, [data]);
    

    function handleSorting(field) {
        const sortingState = SORTING_STATES.states[sortingStatus[field]]
        console.log("handleSorting(): field: ", field)
        console.log("handleSorting(): sortingState: ", sortingState)
        let sortedData = null
        switch (sortingState) {
            case SORTING_STATES.DEFAULT:
                sortedData = data.sort((a, b) => typeof a[field] === 'number' ? a[field] - b[field] : (a[field]>b[field] ? 1 : a[field]<b[field] ? -1 : 0))
                break;
            case SORTING_STATES.ASCENDING:
                sortedData = data.reverse()
                break;
            default:
                sortedData = data.sort((a, b) => (a.market_cap - b.market_cap) * -1)
                break;
        }
        console.log("handleSorting(): sortedData: ", sortedData)
        document.querySelectorAll('i').forEach(icon => {if(icon.id !== `#${field}`) icon.className = 'las la-sort'})
        document.querySelectorAll(`#${field}`).forEach(icon => icon.className = ICON_CLASSNAMES[(sortingStatus[field] + 1) % ICON_CLASSNAMES.length])
        setData(sortedData)
        dataHasBeenSorted.current = true
        setSortingStatus(sortingStatus => {
            let obj = {}
            Object.keys(sortingStatus).forEach(key => obj[key] = 2)
            return {...obj, [field]: (sortingStatus[field] + 1) % SORTING_STATES.states.length}})
        setAutoRefresh(false)
    }

    /* useLayoutEffect(() => {
        console.log('Object.entries(sortingStatus): ', Object.entries(sortingStatus))
        const [sortingField] = Object.entries(sortingStatus).find(entry => entry[1] !== 2)
        console.log('CoinList: useLayoutEffect(): sortingField: ', sortingField)
        if (sortingField) handleSorting(sortingField)
    }) */

    function handleOnMouseEnter(e) {

    }

    function handleOnMouseLeave(e) {

    }
    
    return (
        <div className="tb-container">
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSorting(SORTING_FIELD.MKT_CAP)} onMouseEnter={e => e.target.firstChild.style = {visibility: 'visible'}}>#
                            <i id={SORTING_FIELD.MKT_CAP} className="las la-sort"></i>
                        </th>
                        <th onClick={() => handleSorting(SORTING_FIELD.NAME)} onMouseEnter={e => e.target.firstChild.style = {visibility: 'visible'}}>Name
                            <i id={SORTING_FIELD.NAME} className="las la-sort"></i>
                        </th>
                        <th onClick={() => handleSorting(SORTING_FIELD.PRICE)} onMouseEnter={e => e.target.firstChild.style = {visibility: 'visible'}}>Price
                            <i id={SORTING_FIELD.PRICE} className="las la-sort"></i>
                        </th>
                        <th onClick={() => handleSorting(SORTING_FIELD.DAY_CHANGE)} onMouseEnter={e => e.target.firstChild.style = {visibility: 'visible'}}>24h %
                            <i id={SORTING_FIELD.DAY_CHANGE} className="las la-sort"></i>
                        </th>
                        <th onClick={() => handleSorting(SORTING_FIELD.WEEK_CHANGE)} onMouseEnter={e => e.target.firstChild.style = {visibility: 'visible'}}>7d %
                            <i id={SORTING_FIELD.WEEK_CHANGE} className="las la-sort"></i>
                        </th>
                        <th onClick={() => handleSorting(SORTING_FIELD.DAY_VOLUME)} onMouseEnter={e => e.target.firstChild.style = {visibility: 'visible'}}>24h Volume
                            <i id={SORTING_FIELD.DAY_VOLUME} className="las la-sort"></i>
                        </th>
                        <th onClick={() => handleSorting(SORTING_FIELD.MKT_CAP)} onMouseEnter={e => e.target.firstChild.style = {visibility: 'visible'}}>Market Cap
                            <i id={SORTING_FIELD.MKT_CAP} className="las la-sort"></i>
                        </th>
                        <th>Last 7 Days</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => {
                        const sparkline = {
                            type: 'sparkline',
                            data: {
                                datasets: [{
                                    borderColor: item.price_change_percentage_7d_in_currency > 0 ? 'green' : 'red',
                                    fill: false,
                                    data: item.sparkline_in_7d.price
                                }]
                            }
                        }
                        const percent24Class = item.price_change_percentage_24h !== 0 ? item.price_change_percentage_24h > 0 ? 'green' : 'red' : ''
                        const percent7dClass = item.price_change_percentage_7d_in_currency !== 0 ? item.price_change_percentage_7d_in_currency > 0 ? 'green' : 'red' : ''
                        return (
                            <tr key={item.id}>
                                <td className='td-order'>{item.market_cap_rank}</td>
                                <td className='td-name'>
                                    <div>
                                        <img src={item.image} alt="coing logo" />
                                    </div>
                                    <a href="#">{item.name}</a><span>{item.symbol.toUpperCase()}</span>
                                </td>
                                <td>{`$${parseFloat(+(item.current_price).toFixed(2)).toLocaleString()}`}</td>
                                <td className={percent24Class}>{`${+(item.price_change_percentage_24h).toFixed(2)}%`}</td>
                                <td className={percent7dClass}>{`${+(item.price_change_percentage_7d_in_currency).toFixed(2)}%`}</td>
                                <td>{`$${parseFloat(+(item.total_volume).toFixed(2)).toLocaleString()}`}</td>
                                <td>{`$${parseFloat(+(item.market_cap).toFixed(2)).toLocaleString()}`}</td>
                                {/* <td><img src={`https://www.coingecko.com/coins/${item.market_cap_rank}/sparkline`} alt="sparkline" /></td> */}
                                <td><img src={`https://quickchart.io/chart?c=${JSON.stringify(sparkline)}&w=135&h=50&bkg=transparent`} alt="sparkline" /></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default CoinList