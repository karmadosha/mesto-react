import headerLogo from '../images/logo.svg';

function Header() {
  return (
    <div className="header">
      <img className="header__logo" alt="Логотип Место" src={headerLogo} />
    </div>
  )
}

export default Header;