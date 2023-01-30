import ProtectedMiddleware from '../../components/generals/protected_midleware.jsx';
import { useSelector } from "react-redux";


function ABMNotes() {
  const is_loged = useSelector((store)=>store.loginReducer.is_loged);
  const JWT = useSelector((store)=>store.loginReducer.jwt);

  console.log('JWT', is_loged)
  return (
    <>
      <ProtectedMiddleware/>
      <h1>HolaMundo desde el ABM</h1>
    </>
  );
}

export default ABMNotes;