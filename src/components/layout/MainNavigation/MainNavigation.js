import classes from './MainNavigation.module.css';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../store/auth-context';
import CartContext from '../../../store/cart-context';
import Icons from '../Icons';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const history = useHistory();
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const { totalAmount } = cartCtx;
  const [isBtnAnimated, setIsBtnAnimated] = useState(false);

  const logoutHandler = () => {
    authCtx.logout();
    history.push('/auth');
    closeModalHandler();
    return;
  };

  useEffect(() => {
    setIsBtnAnimated(true);
    setTimeout(() => {
      setIsBtnAnimated(false);
    }, 500);
  }, [cartCtx.items]);

  const cartBadgeClasses = `${classes['cart-badge']} ${
    isBtnAnimated ? classes.animated : ''
  }`;

  const toggleMenuHandler = () => {
    setIsMenuOpened((prevState) => !isMenuOpened);
  };

  const closeModalHandler = () => {
    setIsMenuOpened(false);
  };

  const navClasses = `${classes.nav} ${isMenuOpened ? classes.opened : ''}`;

  return (
    <header className={classes.header}>
      <h3 className={classes.logo}>
        <Link to='/' onClick={closeModalHandler}>
          Candy
          <br />
          Museum
        </Link>
      </h3>
      <nav className={navClasses}>
        <ul>
          <li>
            <NavLink
              to='/products'
              activeClassName={classes.active}
              onClick={closeModalHandler}
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/delivery'
              activeClassName={classes.active}
              onClick={closeModalHandler}
            >
              Delivery
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/contacts'
              activeClassName={classes.active}
              onClick={closeModalHandler}
            >
              Contacts
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={classes.icons}>
        <ul>
          <li>
            {!isLoggedIn && (
              <NavLink
                to='/auth'
                activeClassName={classes.active}
                onClick={closeModalHandler}
              >
                <Icons
                  name='login'
                  color='#343a40'
                  size='28'
                  className='button-left-panel'
                />
              </NavLink>
            )}
            {isLoggedIn && (
              <Link to='/auth' onClick={logoutHandler}>
                <Icons
                  name='logout'
                  color='#343a40'
                  size='28'
                  className='button-left-panel'
                />
              </Link>
            )}
          </li>
          <li>
            <div className={classes.cart}>
              <NavLink
                to='/cart'
                activeClassName={classes.active}
                onClick={closeModalHandler}
              >
                <Icons
                  name='cart'
                  color='#343a40'
                  size='28'
                  className='button-left-panel'
                />
              </NavLink>
              <span className={cartBadgeClasses}>{totalAmount}</span>
            </div>
          </li>
          <li className={classes.icon} onClick={toggleMenuHandler}>
            <Icons
              name='nav'
              color='#fff'
              size='32'
              className='button-left-panel'
            />
          </li>
        </ul>
      </div>
    </header>
  );
};

export default MainNavigation;
