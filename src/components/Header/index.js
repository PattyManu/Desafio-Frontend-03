import './styles.css';
import Profile from '../../assets/profile.svg';
import Logo from '../../assets/logo.svg';
import Logout from '../../assets/logout.svg';
import { useNavigate } from 'react-router-dom';
import { clear, getItem } from '../../utils/storage';

function Header({ handleEditProfile }) {
  const navigate = useNavigate();
  const userName = getItem('userName');

  function handleLogout() {
    clear();
    navigate('/');
  }

  return (
    <header>
      <div className='width-limit content-header'>
        <img src={Logo} alt="logo" />

        <div className='container-sign-out'>
          <div
            className='profile-area'
            onClick={handleEditProfile}
          >
            <img src={Profile} alt="profile" />
            <strong>{userName}</strong>
          </div>
          <img
            src={Logout}
            alt="logout"
            className='sign-out'
            onClick={handleLogout}
          />
        </div>
      </div>
    </header>
  )
}

export default Header;