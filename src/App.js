import { useState } from 'react';
import './App.css';
import Form from './components/form/Form';
import UsersContainer from './components/usersContainer/UsersContainer';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  return (
    <div className="App">
      <Form 
      users = {users} 
      setUsers = {setUsers} 
      loading ={loading} 
      setLoading = {setLoading}/>
      <UsersContainer 
      users= {users} 
      setUsers={setUsers} 
      loading={loading} 
      setLoading={setLoading}/>
    </div>
  );
}

export default App;
