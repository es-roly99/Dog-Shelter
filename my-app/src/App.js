import logo from './logo.svg';
import './App.css';

import {Home} from './Home';
import {Shelter} from './Shelter';
import {Dog} from './Dog';
import {Navigation} from './Navigation';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
     <h3 className="m-3 d-flex justify-content-center">
       Dog Shelter
     </h3>

     <Navigation/>

     <Switch>
       <Route path='/' component={Home} exact/>
       <Route path='/shelter' component={Shelter}/>
       <Route path='/dog' component={Dog}/>
     </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
