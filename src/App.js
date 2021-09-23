// IMPORT MOTORS
import {BrowserRouter, Route, Switch} from 'react-router-dom';
// IMPORT CONTAINERS
import Home from './containers/Home/home';
import Data from './containers/Management/management';
// IMPORT COMPONENTS
import Header from './components/Header/header.jsx';
// IMPORT STYLES
import './scss/globals.scss';
import './App.scss';

function App() {
  return (
    <div className="containerApp">
      <BrowserRouter>
      <Header/>
      <Switch>

        <Route path="/" exact component={Home}/>
        <Route path="/data" exact component={Data}/>


      </Switch>
    </BrowserRouter>

    </div>
  );
}

export default App;
