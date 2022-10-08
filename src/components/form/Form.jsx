
import axios from 'axios';
import {useCallback, useMemo, useState} from 'react';
import "./Form.scss";
const Form = ({setUsers,setLoading,users}) => {

const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [dateOfBirth, setdateOfBirth] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");

const validations = useMemo(() => {
    return {
        firstAndLastNameValidation:/(.*[a-z]){3}/i,
        emailValidation: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        phoneValidation: /^\d{10}$/
        

    }
},[])

const clearInputs= useCallback(()=>{
    setFirstName("");
    setLastName("");
    setdateOfBirth("");
    setEmail("");
    setPhone("");
},[])

const sendUserData = useCallback(async () => {
    if(
        firstName.match(validations.firstAndLastNameValidation) &&
        lastName.match(validations.firstAndLastNameValidation) &&
        dateOfBirth.length ===10 && 
        email.match(validations.emailValidation) &&
        phone.match(validations.phoneValidation)){
        const newData = {firstName,lastName,dateOfBirth,email,phone};
    try{
        setLoading(true);//It is done for a fake loading effect 
        let postData = await axios.post('http://localhost:3000/users', newData);
        setLoading(false);
        setUsers([...users,postData.data]);//It is done for not sending one more Get-request to server 
        clearInputs()
    }
    catch(err){
        console.log(err.message);
    }
    }
},[firstName,lastName,dateOfBirth,email,phone,validations, setUsers, setLoading,users,clearInputs])


  return (
    <form>
        <div className="first-name">
            <label htmlFor='firstname'>First Name</label>

            <input 
             type="text"
             placeholder='FirstName'
             id='firstname'
             value={firstName}
             onChange={(e) => setFirstName(e.target.value)}
             className = {firstName && !firstName.match(validations.firstAndLastNameValidation) && "error-border"}
             ></input> 
        </div>
        { !firstName.match(validations.firstAndLastNameValidation) && <p>Min 3 characters</p>}
        <div className="last-name">
            <label htmlFor='lastname'>Last Name</label>

            <input 
                type="text" 
                placeholder='LastName'
                id='lastname'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className = {lastName && !lastName.match(validations.firstAndLastNameValidation) && "error-border"}
            ></input>   
        </div>

        { ! lastName.match(validations.firstAndLastNameValidation) && <p>Min 3 characters</p> }

        <div className='date-of-birth'>

        <label htmlFor='dateOfBirth'>Date Of Birth</label>
    
        <input 
            type="date" 
            id='dateOfBirth'
            value={dateOfBirth}
            onChange={(e) => setdateOfBirth(e.target.value)}
            className = {dateOfBirth && dateOfBirth.length !== 10 && "error-border"}
        ></input>  
     
        </div>
    
        <div className="e-mail">
            <label htmlFor='email'>E-mail</label>

            <input 
             type="text"
             placeholder='E-mail'
             id='email'
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             className = {email && !email.match(validations.emailValidation) && "error-border"}
             ></input> 
        </div>
        {! email.match(validations.emailValidation) && <p>You must use @ and .</p>}
        <div className="phone">
            <label htmlFor='phone'>Phone</label>
            <input 
             type="number"
             placeholder=' (999) 999-9999'
             id='phone'
             value={phone}
             onChange={(e) => setPhone( e.target.value)}
             className = {phone && !phone.match(validations.phoneValidation) && "error-border"}
             ></input> 
        </div>
        {! phone.match(validations.phoneValidation) && <p>You can't  use + or a-z,and must write  no less or more 10 numbers</p>}
        <button
        type='button'
        onClick={sendUserData}>Sign Up</button>
    </form>
  )
}

export default Form