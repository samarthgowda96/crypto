import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Market from './components/Market';
import OrderbookBTC from './components/OrderbookBTC'
import OrderbookETH from './components/OrderbookETH'





const App=()=>{
  return(
    //Creating routes to different Component
    <Router>
      <Route exact path='/' component={Market}></Route>
      <Route path='/market'component={Market}></Route>
      <Route  exact path='/btcusdc' component={OrderbookBTC}></Route>
      <Route  path='/ethbtc' component={OrderbookETH}></Route>
    </Router>

  )
}

export default App;