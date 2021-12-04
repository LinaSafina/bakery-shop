import classes from './MainNavigation.module.css';
import { NavLink, Link } from 'react-router-dom';

const MainNavigation = () => {
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
            <NavLink to='/auth'>Login</NavLink>
          </li>
          <li>
            <NavLink to='/cart'>Cart</NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default MainNavigation;
