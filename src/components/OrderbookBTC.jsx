import React,{useEffect} from 'react'

import axios from 'axios'
const OrderbookBTC=()=>{
    useEffect(()=>{
        const getData=async()=>{
            const res= await axios.get('http://api.pro.coinbase.com/products/BTC-USDC/book',{params:{level:2}})

            console.log(res.data)
        
        }
        getData()



    },[])

   
    return(
        <div>Orderbook</div>
    )
}

export default OrderbookBTC;