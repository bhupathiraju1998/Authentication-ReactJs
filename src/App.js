import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import MainPage from './components/MainPage'
import NotFound from './components/NotFound'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

// Replace your code here
class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/ebank/login" component={Login} />
        <ProtectedRoute exact path="/" component={MainPage} />
        <Route exact path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    )
  }
}

export default App
