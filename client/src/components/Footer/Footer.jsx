import { Link } from 'react-router-dom';
import './Footer.scss';
import { foterNavLinks } from '../../constants/constants';

const Footer = () => {
  return (
    <div className='footer-wrap'>
      <nav className='footer-nav-bar'>
        <ul>
          {foterNavLinks.map(({ link, name }) => (
            <li key={link}>
              <Link to={link}>{name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Footer;
