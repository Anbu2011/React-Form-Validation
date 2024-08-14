import React, { useState } from 'react'
import './Form.css'

const Form = () => {

    const [formData, setFormData] = useState({
        name : '',
        email : '',
        password : '',
        dob : '',
        hobbies : [],
        gender : '',
        nationality : 'Indian',
        newNation : ''
    })

    const [formErrors, setFormErrors] = useState({});

    const handleInputChange = (event) =>{
        const {name, value, type, checked} = event.target;

        if (type === 'checkbox') {
            const updatedHobbies = checked ? [...formData.hobbies, value] : formData.hobbies.filter(hobby => hobby !== value);
            
            setFormData((prevData) => ({...prevData, hobbies: updatedHobbies, }));
        } 
        
        if (formErrors.hobbies) {
            setFormErrors((prevErrors) => {
                const { hobbies, ...rest } = prevErrors;
                return rest;
            });
        }   else {
                setFormData((prevData) => ({...prevData, [name]: value,}));
        }

        if (formErrors[name]) {
            setFormErrors((prevErrors) => {
                const { [name]: error, ...rest } = prevErrors;
                return rest;
            });
        }
    };
    

    
    const validation = () =>{
        const newErrors = {};
        const namePattern = /^[a-zA-Z\s]+$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if(!formData.name){
            newErrors.name = 'Name is required';
        } else if(!namePattern.test(formData.name)){
            newErrors.name = 'Name Error';
        }

        if(!formData.email){
            newErrors.email = 'email is required';
        } else if(!emailPattern.test(formData.email)){
            newErrors.email = 'Email Error';
        }

        if(!formData.password){
            newErrors.password = 'password is required';
        } else if(!passwordPattern.test(formData.password)){
            newErrors.password = 'password Error';
        }
        

        const currentDate = new Date();
        const choosedDate = new Date(formData.dob);
        if(!formData.dob){
            newErrors.dob = 'DOB is required';
        } else if(choosedDate > currentDate){
            newErrors.dob = 'Invalid Date';
        }

        if (formData.hobbies.length === 0) {
            newErrors.hobbies = "Please choose at least one hobby!";
        }

        if(!formData.gender){
            newErrors.gender = 'Gender is Required';
        }

        if(formData.nationality === 'other' && formData.newNation === ""){
            newErrors.newNation = "please Enter the Nationality"
        }

        setFormErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }


    const handleFormSubmit = (event) =>{
        event.preventDefault();

        if (validation()){
            alert('Form Submitted Successfully!!');
            // console.log(formData.name,formData.email,formData.password,formData.dob,formData.hobbies,formData.gender,formData.nationality)
        }
    };

    const handleFormReset = () => {
        setFormData({
          name: '',
          email: '',
          password: '',
          dob: '',
          hobbies : [],
          gender: '',
          nationality: 'Indian',
          newNation: '',
        });
        setFormErrors({});
    };
    return (
        <>
        <form onSubmit={handleFormSubmit}>

            <div className='name'>
                <label htmlFor="name">Name : </label>
                <input type="text"  name='name' value={formData.name} onChange={handleInputChange} placeholder='Enter Your Name'/>
                
                {formErrors.name && <p style={{color: 'red' , margin:'0px'}}>{formErrors.name}</p>}
            </div>


            <div className='email'>
                <label htmlFor="email">Email : </label>
                <input type="email" name='email' value={formData.email} onChange={handleInputChange} placeholder='Enter Email id'/>
              
                {formErrors.email && <p style={{color:'red' , margin:'0px'}}>{formErrors.email}</p>}
            </div>


            <div className='password'>
                <label htmlFor="password">Password : </label>
                <input type="password" name='password' value={formData.password} onChange={handleInputChange} placeholder='Enter the Password'/>
    
                {formErrors.password && <p style={{color:'red', margin:'0px'}}>{formErrors.password}</p>}
            </div>

            <div className='date'>
                <label htmlFor="date">DOB : </label>
                <input type="date" name='dob' value={formData.dob} onChange={handleInputChange} placeholder='Enter Your DOB'/>
                {formErrors.dob && <p style={{color:'red' , margin:'0px'}}>{formErrors.dob}</p>}
            </div>

            <div className='hobbies'>
                <label className='hobby-label'>Hobbies : </label>
                <div className='check-boxes'>
                    <label htmlFor="reading">
                        <input type="checkbox" name='hobby' value="reading" onChange={handleInputChange} checked={formData.hobbies.includes('reading')}/>
                        Reading
                    </label>

                    <label htmlFor="traveling">
                        <input type="checkbox" name='hobby' value="traveling" onChange={handleInputChange} checked={formData.hobbies.includes('traveling')}/>
                        Traveling
                    </label>

                    <label htmlFor="cooking">
                        <input type="checkbox" name='hobby' value="cooking" onChange={handleInputChange} checked={formData.hobbies.includes('cooking')}/>
                        Cooking
                    </label>
                
                    <label htmlFor="sports">
                        <input type="checkbox" name='hobby' value="sports" onChange={handleInputChange} checked={formData.hobbies.includes('sports')}/>
                        Sports
                    </label>
                </div>  
                {formErrors.hobbies && (<p style={{color:"red",margin:'0px'}}>{formErrors.hobbies}</p>)}
            </div>

            <div className='gender'>
                <label className='gender-label'>Gender : </label>
                
                <input type="radio" value='male' onChange={handleInputChange} name="gender" checked={formData.gender==='male'}/>
                <label htmlFor="male">Male</label>
                    
                <input type="radio" value='female' onChange={handleInputChange} name="gender" checked={formData.gender==='female'}/>
                <label htmlFor="female">Female</label>
                
                {formErrors.gender && (<p style={{color:'red',margin:'0px',}}>{formErrors.gender}</p>)}
            </div>

            <div className='nation'>
                <label className="nation-label" htmlFor="nation">Nationality : </label>
                <select className='nation-select' name="nationality" value={formData.nationality} onChange={handleInputChange} id="nationality">
                    <option value="Indian">Indian</option>
                    <option value="other">Other</option>
                    {formData.newNation && (<option value={formData.newNation}>{formData.newNation}</option>)}
                </select>

                {formData.nationality==="other" && (<input type='text' name='newNation' value={formData.newNation} onChange={handleInputChange}  placeholder='specify the nation' />)}
                
                {formErrors.newNation && (<p style={{color:'red' , margin:'0px'}}>{formErrors.newNation}</p>)}
                
            </div>

            <div className='btn'>
                <button type='submit'>Submit</button>
                <button type="button" onClick={handleFormReset}>Reset</button>
            </div>

        </form>
        </>
    )
}

export default Form