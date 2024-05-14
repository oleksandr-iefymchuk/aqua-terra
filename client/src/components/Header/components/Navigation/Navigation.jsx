import './Navigation.scss';
import { Link } from 'react-router-dom';

import { headerNavbarLinks } from '../../../../constants/constants';

const Navigation = () => {
  return (
    <div className='nav-wrap'>
      <div className='control-panel'>
        <nav className='nav-bar'>
          <ul>
            {headerNavbarLinks.map(({ link, name }) => (
              <li key={link}>
                <Link to={link}>{name}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className='contacts'>
          <p>
            <span>Телефон:</span> +38 (050) 174-70-15
          </p>
          <p>
            <span>E-mail:</span> bizmailer24@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
