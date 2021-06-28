import {BrowserRouter, Route, Switch} from 'react-router-dom';
import GlobalStyle from './components/utils/GlobalStyles';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Extracts from './components/Extracts';
import AddWithdraw from './components/AddWithdraw';
import AddDeposit from './components/AddDeposit';
import UserContext from './components/contexts/UserContext';
import {useState} from 'react';


function App() {
  const [render, setRender] = useState(0);
  const [userInformation, setUserInformation] = useState(null);

  return(
  <UserContext.Provider value={{render, setRender, userInformation, setUserInformation}}>
    <BrowserRouter>
      <GlobalStyle/>
      <Switch>
        <Route path='/' exact>
          <Login/>
        </Route>
        <Route path='/sign-up' exact>
          <SignUp/>
        </Route>
        <Route path='/extracts' exact>
          <Extracts/>
        </Route>
        <Route path='/add-deposit' exact>
          <AddDeposit/>
        </Route>
        <Route path='/add-withdraw' exact>
          <AddWithdraw/>
        </Route>
      </Switch>
    </BrowserRouter>
  </UserContext.Provider>
  );
}

export default App;
