import { Link } from 'react-router-dom';
import './Footer.scss';
import { foterNavLinks } from '../../constans/constants';

const Footer = () => {
  return (
    <div className="footerWrapper">
      <nav className="footerNavBar">
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
