import './Header.scss';
import ControlBlock from './components/ControlBlock/ControlBlock';
import Navigation from './components/Navigation/Navigation';

const Header = () => {
  return (
    <header className="headerWrapper">
      <ControlBlock />
      <Navigation />
    </header>
  );
};

export default Header;
