//import those pages in App.js
//then based on the path show each components using react-router components
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopNav from './components/TopNav';
import PrivateRoute from './components/PrivateRoute';
//components
import Login from './auth/Login';
import Register from './auth/Register';
import './index.css'; 
import Emi from './components/EmiCal';
import adminLogin from './components/AdminLogin';





function App() {
  return (
    <div class="containerBody">
      
    <BrowserRouter>
    <ToastContainer position='top-center'/>

      <Switch>

        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        {/* <Route exact path="/viewemp" component={Viewemp} /> */}
        <PrivateRoute exact path="/Emi" component={Emi} />
        <PrivateRoute exact path="/AdminLogin" component={adminLogin} />
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
