import {BrowserRouter, Route, Switch} from 'react-router-dom';
import GlobalStyle from './components/utils/GlobalStyles';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Extracts from './components/Extracts';
import AddExtract from './components/AddExtract';
import UserContext from './components/contexts/UserContext';
import {useState} from 'react';


function App() {
  const [userInformation, setUserInformation] = useState(null);
  const [isDeposit, setIsDeposit] = useState(null);

  return(
  <UserContext.Provider value={{userInformation, setUserInformation, isDeposit, setIsDeposit}}>
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
          <AddExtract/>
        </Route>
        <Route path='/add-withdraw' exact>
          <AddExtract/>
        </Route>
      </Switch>
    </BrowserRouter>
  </UserContext.Provider>
  );
}

export default App;
