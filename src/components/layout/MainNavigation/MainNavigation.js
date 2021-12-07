import classes from './MainNavigation.module.css';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../../store/auth-context';
import CartContext from '../../../store/cart-context';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const history = useHistory();
  const { totalAmount } = cartCtx;

  const logoutHandler = () => {
    authCtx.logout();
    history.push('/auth');
    return;
  };
  return (
    <header className={classes.header}>
      <h2 className={classes.logo}>
        <Link to='/'>CandyMuseum</Link>
      </h2>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to='/products' activeClassName={classes.active}>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to='/delivery' activeClassName={classes.active}>
              Delivery
            </NavLink>
          </li>
          <li>
            <NavLink to='/contacts' activeClassName={classes.active}>
              Contacts
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={classes.icons}>
        <ul>
          <li>
            {!isLoggedIn && (
              <NavLink to='/auth' activeClassName={classes.active}>
                Login
              </NavLink>
            )}
            {isLoggedIn && (
              <Link to='/auth' onClick={logoutHandler}>
                Logout
              </Link>
            )}
          </li>
          <li>
            <NavLink to='/cart' activeClassName={classes.active}>
              Cart
            </NavLink>
            <span className={classes['cart-badge']}>{totalAmount}</span>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default MainNavigation;
