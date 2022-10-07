
import axios from 'axios';
import {useCallback, useMemo, useRef, useState} from 'react';
import "./Form.scss";
const Form = ({setUsers, loading, setLoading}) => {

const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [dateOfBirth, setdateOfBirth] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");


const firstNameRef = useRef(null);
const lastNameRef = useRef(null);
const dateOfBirthRef = useRef(null);
const emailRef = useRef(null);
const phoneRef = useRef(null);

const validations = useMemo(() => {
    return {
        firstAndLastNameValidation:/^[a-z ,.'-]+$/i,
        emailValidation: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        phoneValidation: /^\d{10}$/

    }
},[])

const sendUserData = useCallback(async () => {
    if(
        firstName.length >= 4 && 
        firstName.match(validations.firstAndLastNameValidation) &&
        lastName.length >= 4 &&
        lastName.match(validations.firstAndLastNameValidation) &&
        dateOfBirth.length ===10 && 
        email.match(validations.emailValidation) &&
        phone.match(validations.phoneValidation)){
        const newData = {firstName,lastName,dateOfBirth,email,phone};
    try{
        setLoading(true);
        await axios.post('http://localhost:3000/users', newData);
        const res = await axios.get('http://localhost:3000/users');
        setLoading(false);
        setUsers(res.data);
        setFirstName("");
        setLastName("");
        setdateOfBirth("");
        setEmail("");
        setPhone("");
    }
    catch(err){
        console.log("Error connecting")
        console.log(err.message);
    }
    }
    else{
                if(firstName.length < 4){
                    firstNameRef.current.style.border = "2px solid red"
                }
                if(lastName.length < 4){
                    lastNameRef.current.style.border = "2px solid red"
                }
                if(dateOfBirth.length < 10){
                    dateOfBirthRef.current.style.border = "2px solid red"
                }
                if(phone.length < 10){
                    phoneRef.current.style.border = "2px solid red"
                }
                else{
                    firstNameRef.current.style.border = "none"
                    lastNameRef.current.style.border = "none"
                    dateOfBirthRef.current.style.border = "none"
                    phoneRef.current.style.border = "none"
                }
            }
},[firstName,lastName,dateOfBirth,email,phone,validations, setUsers, setLoading])


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
             ref={firstNameRef}
             ></input> 
        </div>
        {firstName.length < 4 && <p>Min 3 characters</p>}
        <div className="last-name">
            <label htmlFor='lastname'>Last Name</label>
            <input 
            type="text" 
            placeholder='LastName'
            id='lastname'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            ref={lastNameRef}
            ></input>   
        </div>
        {lastName.length < 4 && <p>Min 3 characters</p>}
        <div className='date-of-birth'>
        <label htmlFor='dateOfBirth'>Date Of Birth</label>
        <input 
            type="date" 
            id='dateOfBirth'
            value={dateOfBirth}
            onChange={(e) => setdateOfBirth(e.target.value)}
            ref={dateOfBirthRef}
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
             ref={emailRef}
             ></input> 
        </div>
        {! email.match(validations.emailValidation) && <p>You must use @</p>}
        <div className="phone">
            <label htmlFor='phone'>Phone</label>
            <input 
             type="number"
             placeholder=' (999) 999-9999'
             id='phone'
             value={phone}
             onChange={(e) => setPhone( e.target.value)}
             ref={phoneRef}
             ></input> 
        </div>
        {! phone.match(validations.phoneValidation) && <p>You can't  use + or a-z,and must write  no less or more 10 numbers</p>}
        <button
        type='button'
        onClick={() => sendUserData() }>Sign Up</button>
    </form>
  )
}

export default Form