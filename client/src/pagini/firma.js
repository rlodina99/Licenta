
export default function Firma({ user }) {


    return (
      <>
    
    <form className='w-75 mx-auto'>
        <h1>Datele firmei</h1>
        &nbsp;
        <h4>nume: {user.nume}</h4>
        <h4>cf:   {user.cf}</h4>
        <h4>email:  {user.email}</h4>
        <h4>password: {user.password}</h4>
    </form>
  
      </>
  
    )
  }