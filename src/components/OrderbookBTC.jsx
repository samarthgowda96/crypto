import React,{useEffect,useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'


const useStyles = makeStyles({
    table: {
      minWidth:300,
      maxWidth:400,
    
    },
    paper:{
        width:410,
        marginLeft:'auto',
        marginRight:'auto',
        backgroundColor:"#7ee8fa"
        
    }
  });
  



const OrderbookBTC=()=>{
    const classes = useStyles();
    const [asks,setAsks]=useState([])
    const [bids,setBids]=useState([])
    
    useEffect(()=>{
        const getData=async()=>{
            const res= await axios.get('http://api.pro.coinbase.com/products/BTC-USDC/book',{params:{level:2}})

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

    

   
    return(
    <div>
        <h1 style={{color:"white", textAlign:'center'}}>ORDER BOOK-BTC Market</h1>
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
                    <TableCell>{item[1]}</TableCell>
                    <TableCell align="left">{item[0]}</TableCell>
                    <TableCell align="left">-</TableCell>
                    
                </TableRow>
            ))}
            
            <TableCell style={{backgroundColor:'grey'}} align="left"><h2 style={{backgroundColor:'grey'}}>Spread</h2></TableCell>
          
            {bids.map(item=>(
                 <TableRow key={item[0]}>
                 <TableCell>{item[1]}</TableCell>
                 <TableCell align="left">{item[0]}</TableCell>
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