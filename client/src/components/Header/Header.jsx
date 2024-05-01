import './Header.scss';
import ControlBlock from './components/ControlBlock/ControlBlock';
import Navigation from './components/Navigation/Navigation';

const Header = () => {
  return (
    <header className='header-wrap'>
      <ControlBlock />
      <Navigation />
    </header>
  );
};

export default Header;
