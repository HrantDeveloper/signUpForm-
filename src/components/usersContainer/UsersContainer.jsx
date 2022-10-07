import React,{useCallback, useEffect,} from "react";
import { memo } from "react";
import "./UsersContainer.scss";
import { GrClose } from "react-icons/gr";
import axios from "axios";
import PageLoader from "../page-loader/PageLoader"


const UsersContainer = ({users, setUsers, loading, setLoading}) => {

const deleteCard = useCallback(async(id)=>{
  console.log(users);
  try{
    setLoading(true);
    await axios.delete(`http://localhost:3000/users/${id}`);
    setTimeout(() => {
      setLoading(false);//It is done for a fake loading effect 
    },1000);
    setUsers(users.filter(item => item.id !== id))
    //It is done for not sending one more request to server 
  }
  catch(err){
    console.log(err);
  }
},[users, setUsers,setLoading])


useEffect(() => {
  axios.get('http://localhost:3000/users').then((res) => {
    setTimeout(() => {
      setLoading(false);
    },1000);
      setUsers(res.data)
  })

},[setUsers, setLoading]);

if(users.length !== 0 ){
  return(
    <div className="container">
      {loading && <PageLoader/>}
       {users.map((item,index)=>{
       return(
        <div key={index} className="user-card">
          <div className="user-card-del"
          onClick={()=>{
            deleteCard(item.id)
            }}>
            <GrClose/>
            </div>
          <div className="user-card-row">
            <h3>FirstName:</h3>
            <p>{item.firstName}</p>
          </div>
          <div className="user-card-row">
            <h3>LastName:</h3>
            <p>{item.lastName}</p>
          </div>
          <div className="user-card-row">
            <h3>Date oF Birth:</h3>
            <p>{item.dateOfBirth}</p>
          </div>
          <div className="user-card-row">
            <h3>E-mail:</h3>
            <p>{item.email}</p>
          </div>
          <div className="user-card-row">
            <h3>Phone:</h3>
            <p>{item.phone}</p>
          </div>
        </div>
       )
      })}
    </div>
  )
}
};

export default memo(UsersContainer);
