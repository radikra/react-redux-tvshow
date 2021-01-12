import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SelectChannel from './pages/SelectChannel'
import SelectDate from './pages/SelectDate'
import ShowPrograms from './pages/ShowPrograms'
import './main.scss'

function App() {

  return (
		<Router>
			<div className="app">
				<Switch>
					<Route path='/' component={SelectChannel} exact />
					<Route path='/date' component={SelectDate} />
					<Route path='/programs' component={ShowPrograms} />
				</Switch>
			</div>
		</Router>
  );
}

export default App;
