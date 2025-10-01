import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { CartContext } from '../context/CartContext';
import toast from 'react-hot-toast';


const Nav = () => {
  const { token, handleLogout } = useContext(UserContext);
  const { cart, precioTotal } = useContext(CartContext);

  const handleProfile = () => {
    toast.error("Para acceder a tu perfil necesitas iniciar sesión");
  };

  return (
<div className="navbar bg-base-100 shadow-sm fixed top-0 left-0 w-full z-50">
  <div className="flex-1">
    <Link className="btn btn-ghost text-xl" to="/">Odilup</Link>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      {!token ? (
        <>
          <li><Link to="/register">Registrarse</Link></li>
          <li><Link to="/login">Iniciar Sesión</Link></li>
        </>
      ) : (
        <>
          <li className=''>
            <Link to="/cart">
              <i className="fa-solid fa-clipboard-list"></i> Agenda
              {cart && cart.length > 0 && (
                <span className="badge badge-sm badge-primary ml-2">{cart.length}</span>
              )}
            </Link>
          </li>
          <li className=''>
            <Link to="/profile">
              <i className="fa-solid fa-user"></i> Perfil
            </Link>
          </li>
          <li className="flex items-center">
  <button className="btn-sm btn btn-outline btn-error" onClick={handleLogout}><i class="fa-solid fa-right-from-bracket"></i>Cerrar sesión</button>
</li>
        </>
      )}
    </ul>
  </div>
</div>
  )
}

export default Nav
