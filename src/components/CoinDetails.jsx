import React, { useEffect, useState } from 'react'
import { Await, useParams } from 'react-router-dom'
import call from '../call'
import Loader from './Loader'
import './CoinDetails.css'
import {BiSolidUpArrow, BiSolidDownArrow} from "react-icons/bi"
import Chart from './Chart'


function CoinDetails() {

  const [loading,setLoading] = useState(true)

  const [coin,setCoin] = useState([])

  const {id} = useParams()

  const [currency,setCurrency] = useState('inr')

  const currencySymbol = currency === 'inr' ? '₹' : '$';

  const profit = coin.market_data?.price_change_percentage_24h > 0 ;

  const fetchData = async () =>{
    try {
      const {data} = await call.get(`/coins/${id}`)
      setCoin(data)
      setLoading(false)
    } catch (error) {
       console.log(error);
       setLoading(false)
    }
  }

  useEffect(()=>{
    fetchData()
  },[])

  return (
    <>
      {
        loading ? <Loader/> : <>
          <div className=' coin-detail'  > 
            <div className='coin-info'>
              <div style={{marginLeft:"0px"}} className='btn'>
                <button onClick={()=>setCurrency('inr')} >inr</button>
                <button onClick={()=>setCurrency('usd')}>usd</button>
              </div>
              <div className="time">
                {coin?.last_updated}
              </div>
              <div className="coin-image">
                <img height={"150px"} src={coin?.image?.large} alt="" />
              </div>
              <div className="coin-name">
                {coin?.name}
              </div>
              <div className="coin-price">
                {currencySymbol} {coin?.market_data?.current_price[currency]}
              </div>
              <div className="coin-profit">
                {profit ? <BiSolidUpArrow color='green' /> : <BiSolidDownArrow color='red' />  }
                  {coin?.market_data?.price_change_percentage_24h} % 
              </div>
              <div className='market-rank'>
               #{coin?.market_cap_rank}
              </div>
              <div className='coin-desc'>
                <p> {coin?.description['en'].split('.')[0]} </p>
              </div>
            </div>
            <div>
              <Chart/>
            </div>
          </div>
        </>
      }
    </>
  )
}

export default CoinDetails