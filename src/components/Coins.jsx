import React, { useEffect, useState} from 'react'
import call from '../call'
import Loader from './Loader'
import Headers from './Headers'
import './Coin.css'
import { Link } from 'react-router-dom'

function Coins() {

  const [loading,setLoading] = useState(true)

  const [coins,setCoins] = useState([])

  const [search,setSearch] = useState('')

  const [currency,setCurrency] = useState('inr')

  const currencySymbol = currency === "inr" ? '₹' : '$';

  const fetchUrl  = `/coins/markets?vs_currency=${currency}`


  const fetchData = async () => {
    const {data} = await call.get(fetchUrl)
    setLoading(false)
    setCoins(data)
  }

  useEffect(()=>{
    fetchData()
  },[currency])

  return (
    <>
      {
        loading ? <Loader/> : <>
        <Headers/>
        <div className="search-bar">
          <input onChange={(e)=>setSearch(e.target.value)} type="text" placeholder='Search for coins' style={{position:'absolute',top:"1%",left:'35%',height:'2rem',width:'20rem',paddingLeft:"5px"}}/>
        </div>
        <div className="btn">
          <button onClick={()=>setCurrency('inr')}>inr</button>
          <button onClick={()=>setCurrency('usd')}>usd</button>
        </div>
        {
          coins?.filter((value)=>{
            if(value == ''){
              return value;
            }else if (value.name.toLowerCase().includes(search.toLocaleLowerCase())){
              return value;
            }
          }).map((coindata,i)=>(
            <CoinCard coindata={coindata} i={i} id={coindata.id} currencySymbol={currencySymbol}/>
          ))
        }
         </>
      }
    </>
  )
}

const CoinCard = ({coindata,i,currencySymbol,id}) =>{

  const profit = coindata.price_change_percentage_24h > 0

  return (
          <Link to={`/coins/${id}`} style={{textDecoration:"none",color:"#fff"}}>
            <div key={i} className="ex-cards">
              <div className="images">
                <img height={"80px"} src={coindata?.image} alt="logo"/>
              </div>
              <div className="name">
                {coindata?.name}
              </div>
              <div className="price">
                {currencySymbol}{Number(coindata?.current_price).toLocaleString()}
              </div>
              <div style={profit ? {color:"green"} : {color:'red'}} className="rank">
                {profit ? "+" + coindata?.price_change_percentage_24h.toFixed(2) : coindata?.price_change_percentage_24h.toFixed(2)}
              </div>
            </div>
          </Link>
  )
}

export default Coins