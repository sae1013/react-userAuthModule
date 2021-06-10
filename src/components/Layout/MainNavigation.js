import { Link,useHistory,Redirect } from 'react-router-dom';
import classes from './MainNavigation.module.css';
import {useDispatch,useSelector} from 'react-redux';

const MainNavigation = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  const dispatch = useDispatch();
  const history = useHistory();

  const logoutHandler = () => {
    dispatch({type:'LOGOUT'});
    history.replace('/');
  }
  
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn &&
          <li>
             <Link to='/auth'>Login</Link>
          </li>
          }
          {isLoggedIn && 
          <li>
              <Link to='/profile'>Profile</Link>
            </li>
          }
          {isLoggedIn &&
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
          }
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
