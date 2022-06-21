import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom'

import AuthRoute from './componente/authRoute'
import './App.css';
import Menu from './componente/menu'
import Home from './pagini/home'
import Login from './pagini/login'
import Register from './pagini/register'
import Firma from './pagini/firma'
import Users from './pagini/users'
import Servicii from './pagini/servicii'
import Programari from './pagini/programari'
import EditUser from './pagini/edituser'
import AddUser from './pagini/adduser'
import AddServ from './pagini/addservicii'
import EditServ from './pagini/editservicii'
import DetaliuServici from './pagini/detaliuServici'



function App() {
  const [user, setUser] = useState(null);

  const onLoginCompleted = (user) => setUser(user);
  const onLogoutCompleted = () => setUser(null);

  return (

    <Router>

      <Menu user={user} onLogoutCompleted={onLogoutCompleted} />
      <hr />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/detaliuServici/:idServiciu" element={<DetaliuServici/>} />
        <Route path="/login" element={<Login onLoginCompleted={onLoginCompleted} />} />
        <Route element={<AuthRoute user={user} redirectTo='/login' />}>
          <Route path="/firma" element={<Firma user={user} />} />
          <Route path="/users" element={<Users />} />
          <Route path="/programari" element={<Programari />} />
          <Route path="/users/:id/servicii" element={<Servicii/>} />
          <Route path="/users/:id/addservicii" element={<AddServ />} />
          <Route path="/users/:idUser/editservicii/:idServiciu" element={<EditServ />} />
          <Route path="/users/:id/edit" element={<EditUser />} />
          <Route path="/users/adduser" element={<AddUser />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </Router >

  );
}


function NotFound() {
  return (
    <>
      <h1>Pagina cautata nu exista</h1>
      <NavLink to='/' >Acasă</NavLink>
    </>
  )
}

export default App;
