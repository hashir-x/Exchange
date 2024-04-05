import React, { useEffect, useState } from 'react'
import call from '../call'
import {useParams} from 'react-router-dom'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


function Chart() {

  const {id} = useParams()

  const [chart,setChart] = useState([])

  const fetchUrl = `/coins/${id}/market_chart?vs_currency=inr&days=365`;

  const fetchData = async () => {
    try {
      const {data} = await call.get(fetchUrl)
      // console.log(data.prices);
      setChart(data.prices)

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchData()
  },[])

  const myData ={
    lables:chartData.map((value)={
      console.log(value);
    })
  }

  return (
    <>
       <Line data={myData}/> 
    </>
  )
}

export default Chart