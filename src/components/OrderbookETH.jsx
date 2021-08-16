import React,{useEffect} from 'react'

import axios from 'axios'
const OrderbookETH=()=>{
    useEffect(()=>{
        const getData=async()=>{
            const res= await axios.get('http://api.pro.coinbase.com/products/ETH-BTC/book',{params:{level:2}})

            console.log(res.data)
        
        }
        getData()



    },[])

   
    return(
        <div>Orderbook</div>
    )
}

export default OrderbookETH;