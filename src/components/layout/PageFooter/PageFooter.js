import classes from './PageFooter.module.css';
import { Link } from 'react-router-dom';
import Icons from '../Icons/index';

const PageFooter = () => {
  return (
    <footer className={classes.footer}>
      <div>
        <div className={classes.footer__content}>
          <h4>Candy Shop</h4>
          <Link to='/products'>Shop</Link>
          <Link to='/contacts'>Contact</Link>
        </div>
        <div className={classes.footer__content}>
          <p>Have a question?</p>
          <p>
            We're always here to lend <br />a helping hand.
          </p>
          <p>
            Cosumer Care Team hours are
            <br /> Monday-Friday, 9am - 5pm EST
          </p>
          <p>
            Email us at
            <br />
            <a href='mailto:mybakery@gmail.com'>mybakery@gmail.com</a>
          </p>
          <p>
            Call us at
            <br />
            <a href='tel:+74951111111'>+74951111111</a>
          </p>
          <ul>
            <li>
              <a
                href='http://facebook.com'
                target='_blank'
                rel='noreferrer noopener nofollow'
              >
                <Icons
                  name='logo-facebook'
                  color='#fff'
                  size='32'
                  className='button-left-panel'
                />
              </a>
            </li>
            <li>
              <a
                href='http://vk.com'
                target='_blank'
                rel='noreferrer noopener nofollow'
              >
                <Icons
                  name='logo-vk'
                  color='#fff'
                  size='32'
                  className='button-left-panel'
                />
              </a>
            </li>
            <li>
              <a
                href='http://instagram.com'
                target='_blank'
                rel='noreferrer noopener nofollow'
              >
                <Icons
                  name='logo-instagram'
                  color='#fff'
                  size='32'
                  className='button-left-panel'
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
export default PageFooter;
