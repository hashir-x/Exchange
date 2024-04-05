import React, { useEffect, useState } from 'react'
import Headers from './Headers'
import call from '../call'
import Loader from './Loader'
import './Home.css'

function Home() {

  const fetchURL = '/exchanges'

  const [loading,setLoading] = useState(true)

  const [exchanges,setExchanges] = useState([])

  const fetchData = async ()=> {
    const {data} = await call.get(fetchURL)
    setLoading(false)
    setExchanges(data)
  }


  useEffect(()=>{
    fetchData()
  },[])

  return (
    <>
     {
      loading ? <Loader/> : <>
      <Headers/>
      <div>
        {
          exchanges?.map((item,i)=>(
            <div key={i} className="ex-cards">
          <div className="image">
            <img height={"80px"} src={item?.image} alt="logo"/>
          </div>
          <div className="name">
            {item?.name}
          </div>
          <div className="price">
            {item?.trade_volume_24h_btc.toFixed(0)}
          </div>
          <div className="rank">
            {item?.trust_score_rank}
          </div>
        </div>
          ))
        }
      </div>
      </>
     }
    </>
  )
}

export default Home