import React,{useState,useEffect} from 'react'
import './Market.css'
import {Link} from 'react-router-dom'
import axios from 'axios'


import Button from '@material-ui/core/Button';
const Market=()=>{
    const [selection,setSelection]=useState('BTC_USDC')
    
    return(
        <div>
            <h1 className="title">Welcome to Orderbook</h1>
            <h2 className="title">Please select the market to continue :)</h2>
            <div className="container">
                <div className="center">
                <Link to='/btcusdc' >
                    <Button  className="Btn"variant="contained" color="primary">
                        
                        BTC_USDC
                    </Button>
                    </Link>
                    <Link to="/ethbtc">
                    <Button  className="Btn"variant="contained" color="secondary">
                        ETH_BTC
                    </Button>
                    </Link>

                </div>
            </div>
      </div>
    )
}

export default Market;