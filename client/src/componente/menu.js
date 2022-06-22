import { useNavigate } from 'react-router-dom';


export default function Menu({ user, onLogoutCompleted }) {

  const navigate = useNavigate();
  //const isConnected = null;

  const connect = () => {
    // setIsConnected(true);
    return (
      <>
        <li className='menuItem'>
          <button type="button" className="btn btn-info" onClick={() => { navigate(`/login`) }}>
            Login Firma
          </button>
          {/* <NavLink to="/login" className={(navData) => navData.isActive ? "menuItem-active" : ""} > Conectare</NavLink> */}
        </li>
        <li className='menuItem'>
          <button type="button" className="btn btn-info" onClick={() => { navigate(`/register`) }}>
            Register Firma
          </button>
          {/* <NavLink to="/register" className={(navData) => navData.isActive ? "menuItem-active" : ""} > Inregistrare</NavLink> */}
        </li>
      </>
    )
  }

  const disconect = () => {
    return (
      <li className='menuItem'>
        <button type="button" className="btn btn-dark" onClick={() => { onLogoutCompleted(); navigate(`/`) }}>
          Deconectare {user.nume}
        </button>

      </li>
    )
  }

  return (
    <nav>

      <ul >
        <li className='menuItem'>
          <button type="button" className="btn btn-primary" onClick={() => { navigate(`/`) }}>
            Home
          </button>

          {/* <NavLink to="/" className={(navData) => navData.isActive ? "menuItem-active" : ""}> Home</NavLink> */}
        </li>
        {
          user && (
            <li className='menuItem' >
              <button type="button" className="btn btn-secondary" onClick={() => { navigate(`/firma`) }}>
                Date Firma
              </button>
              &nbsp;
              <button type="button" className="btn btn-secondary" onClick={() => { navigate(`/programari`) }}>
                Calendar Programari
              </button>
              &nbsp;
              <button type="button" className="btn btn-secondary" onClick={() => { navigate(`/users`) }}>
                Personal
              </button>
              {/* <NavLink to="/users" className={(navData) => navData.isActive ? "menuItem-active" : ""}>Utilizatori</NavLink> */}
            </li>
          )
        }

        {user ? disconect() : connect()}

      </ul >
    </nav >
  )
}