import React, { useState } from 'react'
import './App.css'
import './Form.css'

const Form = () => {

    const [name,setName] = useState("");
    const [nameError, setNameError] = useState("");

    const [email,setEmail] = useState("");
    const [emailError,setEmailError] =useState("");

    const [password,setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [date,setDate] = useState("");
    const [dateError,setDateError] = useState("");

    const [nationality,setNationality] = useState("");
    const [newNation, setNewNation] = useState("");
    const [newNationError, setNewNationError] = useState("");

    const [hobby,setHobby] = useState([]);
    const [hobbyError,setHobbyError] = useState("");

    const [gender,setGender] = useState("");
    const [genderError, setGenderError] = useState("");


    const checkNamePatterns = () => {
        const checkName = /^[A-Za-z\s]+$/;
        return checkName.test(name);
    };

    const checkEmailPatterns = () =>{
        const checkEmail = /[a-zA-Z0-9.*%±]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
        return checkEmail.test(email);
    };

    const checkPasswordPatterns = () =>{
        const checkPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return checkPassword.test(password);
    };

    const handleNameChange = (event) =>{
        setName(event.target.value);
        setNameError("");
    };

    const handleEmailChange = (event) =>{
        setEmail(event.target.value);
        setEmailError("");
    };

    const handlePasswordChange = (event) =>{
        setPassword(event.target.value);
        setPasswordError("");
    };

    const handleDate = (event) =>{
        setDate(event.target.value);
        setDateError("");
    };

    const handleHobbyChange = (event) =>{
        const {value, checked} = event.target
        if(checked){
            setHobby((prevHobbies)  => [...prevHobbies, value]);
            setHobbyError("");
        } else{
            setHobby((prevHobbies) => prevHobbies.filter((h) => h!==value));
        }
    };

    const handleGenderChange = (event) =>{
        setGender(event.target.value);
        setGenderError("");
    }

    const handleNationalityChange = (event) =>{
        setNationality(event.target.value);
    }
    
    const handleNewNation = (event) =>{
        setNewNation(event.target.value);
        setNewNationError("")
    }

    // const afterSubmit = () =>{
    //     setName("");
    //     setEmail("");
    //     setPassword("");
    //     setDate("");
    //     setNewNation("");
    // }


    const nameErrorFunction = () =>{
        if (name.trim() === '') {
            setNameError('Name is required.');
        } else if(!checkNamePatterns(name)){
            setNameError("Name error");
        }
        else{
            setNameError("");
            return true;
        }
    }

    const emailErrorFunction = () =>{
        if (email.trim() === '') {
            setEmailError('Email is required.');
        } else if(!checkEmailPatterns(email)){
            setEmailError("Email error");
        } else{
            setEmailError("");
            return true;
        }
    }

    const passwordErrorFunction = () =>{
        if (password.trim() === '') {
            setPasswordError('Password is required.');
        } else if(!checkPasswordPatterns(password)){
            setPasswordError("not an strong password");
        } else{
            setPasswordError("");
            return true;
        }
    }

    const dateErrorFunction = () =>{
        const currentDate = new Date();
        const choosedDate = new Date(date);
        if (date===""){
            setDateError("Select Your DoB");
        } else if( choosedDate > currentDate){
            setDateError("invalid date");
        } else{
            setDateError("");
            return true;
        }
    }

    const hobbyErrorFunction = () =>{
        if(hobby.length === 0){
            setHobbyError("Please Choose atleast one Hobby!!"); 
        } else{
            setHobbyError("");
            return true;
        }
    }

    const genderErrorFunction = () =>{
        if(gender===""){
            setGenderError("Please select the gender!!");
        } else{
            setGenderError("");
            return true;
        }
    }

    const newNationErrorFunction = () =>{
        if(newNation==="" && nationality==="other"){
            setNewNationError("Please Enter Your Nation")
        } else{
            setNewNationError("")
            return true;
        }
    }

    const handleFormSubmit = (event)=> {
        event.preventDefault();
        if(nameErrorFunction()  && emailErrorFunction() && passwordErrorFunction() && dateErrorFunction() && hobbyErrorFunction() && genderErrorFunction() && newNationErrorFunction()){
            if(newNation!=="" && nationality==="other"){
                alert("Form Submitted Successfully!!");
                console.log(name,email,password,date,hobby,gender,nationality,newNation);
                // afterSubmit()
            }
            if(nationality!=="other"){
                alert("Form Submitted Successfully!!!!!!");
                console.log(name,email,password,date,hobby,gender,nationality);
                // afterSubmit()
            }
        }
    };

    return (
        <>
        <form onSubmit={handleFormSubmit}>

            <div>
                <label htmlFor="name">Name : </label>
                <input type="text"  onChange={handleNameChange} placeholder='Enter Your Name'/>
                {nameError && <p style={{color: 'red' , marginTop:'0px'}}>{nameError}</p>}
            </div>


            <div>
                <label htmlFor="email">Email : </label>
                <input type="text" value={email} onChange={handleEmailChange} placeholder='Enter Email id'/>
                {emailError && <p style={{color:'red' , marginTop:'0px'}}>{emailError}</p>}
            </div>


            <div>
                <label htmlFor="password">Password : </label>
                <input type="text" value={password} onChange={handlePasswordChange} placeholder='Enter the Password'/>
                {passwordError && <p style={{color:'red', marginTop:'0px'}}>{passwordError}</p>}
            </div>

            <div>
                <label htmlFor="date">DOB : </label>
                <input type="date" value={date} onChange={handleDate} placeholder='Enter Your DOB'/>
                {dateError && <p style={{color:'red' , marginTop:'0px'}}>{dateError}</p>}
            </div>

            <div>
                <label>Hobbies : </label>
                <label htmlFor="reading">
                    <input type="checkbox" value="reading" onChange={handleHobbyChange} />
                    Reading
                </label>

                <label htmlFor="traveling">
                    <input type="checkbox" value="traveling" onChange={handleHobbyChange} />
                    Traveling
                </label>

                <label htmlFor="cooking">
                    <input type="checkbox" value="cooking" onChange={handleHobbyChange} />
                    Cooking
                </label>
            
                <label htmlFor="sports">
                    <input type="checkbox" value="sports" onChange={handleHobbyChange} />
                    Sports
                </label>
                {hobbyError && (<p style={{color:"red",marginTop:'0px'}}>{hobbyError}</p>)}
            </div>

            <div>
                <label>Gender : </label>
                <input type="radio" value='male' onChange={handleGenderChange} name="gender" />
                <label htmlFor="male">Male</label>
                
                <input type="radio" value='female' onChange={handleGenderChange} name="gender" />
                <label htmlFor="female">Female</label>
                {genderError && (<p style={{color:'red',marginTop:'0px'}}>{genderError}</p>)}
            </div>

            <div>
                <label htmlFor="nation">Nationality : </label>
                <select name="nationality" value={nationality} onChange={handleNationalityChange} id="nationality">
                    <option value="indian">Indian</option>
                    <option value="other">Other</option>
                    {newNation && (<option value={newNation}>{newNation}</option>)}
                </select>

                    {nationality==="other" && (<input type='text' value={newNation} onChange={handleNewNation}  placeholder='specify the nation' />)}
                
                    {nationality==='other' && newNationError && (<p style={{color:'red' , marginTop:'0px'}}>{newNationError}</p>)}
                
            </div>
            

            <div>
                <div>
                    <button type='submit'>Submit</button>
                </div>
                {/* <div>
                    <button type='submit'>Reset</button>
                </div> */}
            </div>

        </form>
        </>
    )
}

export default Form