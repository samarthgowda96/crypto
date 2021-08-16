import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Market from './components/Market';
import Orderbook from './components/Orderbook'





const App=()=>{
  return(
    <Router>
      <Route path='/market'component={Market}></Route>
      <Route  path='/btcusdc' component={Orderbook}></Route>
      <Route  path='/eth_btc' component={Orderbook}></Route>
    </Router>

  )
}

export default App;