import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


const TopNav = () => {

  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));
  const history = useHistory()

  const logout = () => {
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    window.localStorage.removeItem('auth');
    history.push("/login");
  };

  return (

    <div className="nav">



      <Link className='nav-link btn btn-dark  registerbutton' to="/register">new here?</Link>
      

    </div>
  )
};


export default TopNav;