import React,{useEffect,useState,useRef} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import axios from 'axios'


const useStyles = makeStyles((theme)=>({
    table: {
      minWidth:300,
      maxWidth:400,
    
    },
    paper:{
        width:410,
        marginLeft:'auto',
        marginRight:'auto',
        backgroundColor:"#7ee8fa"
        
    },
    root: {
      '& .MuiTextField-root': {
        backgroundColor:'white',
        margin: theme.spacing(2),
        width: '46ch',
        border:'2px solid red'

        
      },
    },
  }));
  
const OrderbookBTC=()=>{

    //declaring all the required states
    const classes = useStyles();
    const [asks,setAsks]=useState([])
    const [bids,setBids]=useState([])
    
    const [price, setPrice]=useState('0.00')
    const [total,setTotal]=useState('0.00')
    const [quantity,setQuantity]=useState('0.00')

    //Making API Request to Coin each milli sec to keep it updated
    useEffect(()=>{
        const getData=async()=>{
            const res= await axios.get('http://api.pro.coinbase.com/products/ETH-BTC/book',{params:{level:2}})

            const sell = res.data.asks.sort()
            const buy= res.data.bids.sort().reverse()
            buy.reverse()
            const newBuy=buy.slice(0,15)
            const newSell= sell.slice(0,15)
         
            
            setAsks(newSell)
            setBids(newBuy)
            
        }
        getData()
})

//Handling calculating the price of ETH dynamically
const handlePriceClick=()=>{
  
  asks.find(item=>{
    if(item[0]===quantity){
       
        setPrice(item[1])
        console.log(item[1])
        const newQuant= parseFloat(quantity)
        const newPrice= parseFloat(item[1])
        const res= newQuant* newPrice
        setTotal(res)


    }else{
    bids.find(item=>{
        
        if(item[0]===quantity){
          
          setPrice(item[1])
          const newQuant= parseFloat(quantity)
          const newPrice= parseFloat(item[1])
          const res= newQuant* newPrice
          setTotal(res)

        }
        
      })

    
    }
    
})
 
}
   
  return(
    <div>
        <h1 style={{color:"white", textAlign:'center'}}>ORDER BOOK-ETH Market</h1>
        <form className={classes.root} noValidate autoComplete="off">
          
          <TextField
          id="standard-helperText"
          label="Quantity"
          defaultValue={quantity}
          onChange={(e)=>{setQuantity(e.target.value)}}
          helperText="ETH"
        />
        <TextField
          id="standard-read-only-input"
          label="Price"
          value={price}
          helperText='USD'
          onClick={handlePriceClick}
          InputProps={{
            readOnly: true,
          }}

        
        />
         
         <TextField
          id="standard-read-only-input"
          label="Total"
          defaultValue={total}
          value={total}
          helperText="USDC"
          InputProps={{
            readOnly: true,
          }}
        />
          
        </form>
    <TableContainer className={classes.paper} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
          <TableRow>
                    <TableCell>Market Size</TableCell>
                    <TableCell align="left">Price(USDC)</TableCell>
                    <TableCell align="left">My Size</TableCell>
                    
                </TableRow>
          </TableHead>
          <TableBody>
            {asks.map(item => (
                <TableRow key={item[0]}>
                    <TableCell>{item[0]}</TableCell>
                    <TableCell align="left">{item[1]}</TableCell>
                    <TableCell align="left">-</TableCell>
                    
                </TableRow>
            ))}
            
            <TableCell style={{backgroundColor:'grey'}} align="left"><h2 style={{backgroundColor:'grey'}}>Spread</h2></TableCell>
          
            {bids.map(item=>(
                 <TableRow key={item[0]}>
                 <TableCell>{item[0]}</TableCell>
                 <TableCell align="left">{item[1]}</TableCell>
                 <TableCell align="left">-</TableCell>
                 
             </TableRow>

            ))}

          </TableBody>
        
        </Table>
      </TableContainer>
      </div>
    )
}

export default OrderbookBTC;