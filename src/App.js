import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import InputForm from "./components/InputForm/InputForm";
import AdvncedForm from './components/AdvancedForm/AdvancedForm'


const App = () => {
  return (
    <Switch>
      <Route path='/advanced' component={AdvncedForm}/>
      <Route path='/' exact component={InputForm}/>
      <Redirect to='/'/>
    </Switch>
  )
}

export default App

