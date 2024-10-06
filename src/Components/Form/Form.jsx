import React, { useState } from 'react'
import './Form.css'
import InputFields from '../InputFields.jsx';

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

    const [nationalityOptions, setNationalityOptions] = useState([
        { label: 'Indian', value: 'Indian' },
        { label: 'Other', value: 'other' },
    ]);
    
    //handleInputChange
    const handleInputChange = (event) =>{
        const {name, value, type, checked} = event.target;

        if (type === 'checkbox') {
            const updatedHobbies = checked ? 
                [...formData.hobbies, value] : formData.hobbies.filter(hobby => hobby !== value);
            
            setFormData((prevData) => ({
                ...prevData, 
                hobbies: updatedHobbies, 
            }));

            if (formErrors.hobbies) {
                setFormErrors((prevErrors) => {
                    const { hobbies, ...rest } = prevErrors;
                    return rest;
                });
            }
        }   else if(name === 'newNation'){
                setFormData((prevData) => ({
                    ...prevData,
                    newNation : value,
                }))

                // Clear the error when typing starts in the newNation input
                if (formErrors.newNation) {
                    setFormErrors((prevErrors) => {
                        const { newNation, ...rest } = prevErrors;
                        return rest;
                    });
                }
        }   else {
                setFormData((prevData) => ({...prevData, [name]: value,}));

                if (formErrors[name]) {
                    setFormErrors((prevErrors) => {
                        const { [name]: error, ...rest } = prevErrors;
                        return rest;
                    });
                }
        }
    };
    
    //validation
    const validation = () =>{
        const newErrors = {};
        const namePattern = /^[a-zA-Z\s]+$/;
        
        if(!formData.name){
            newErrors.name = 'name is required';
        } else if(!namePattern.test(formData.name)){
            newErrors.name = 'should not contain digits or symbols';
        }

        //email validation
        if(!formData.email){
            newErrors.email = 'email is required';
        } else if (!/^[^\s@]+/.test(formData.email)) {
            newErrors.email = 'username before the "@" symbol';
        } else if (!/@/.test(formData.email)) {
            newErrors.email = 'must contain "@" symbol';
        } else if (!/\.[a-z]{2,}$/i.test(formData.email)) {
            newErrors.email = 'must have valid domain (.com, .org)';
        }

        //password validation
        if(!formData.password){
            newErrors.password = ['password is required'];
        } else{
            const passwordErrors = []
            if (!/[a-z]/.test(formData.password)) {
                passwordErrors.push('At least one lowercase letter');
            }
            if (!/[A-Z]/.test(formData.password)) {
                passwordErrors.push('At least one uppercase letter');
            }
            if (!/\d/.test(formData.password)) {
                passwordErrors.push('At least one digit');
            }
            if (!/[@$!%*?&]/.test(formData.password)) {
                passwordErrors.push('At least one special character');
            }
            if (formData.password.length < 8) {
                passwordErrors.push('Minimum length of 8 characters');
            }
    
            if (passwordErrors.length > 0) {
                newErrors.password = passwordErrors;
            }
        }
        
        //dob
        const currentDate = new Date();
        const choosedDate = new Date(formData.dob);
        if(!formData.dob){
            newErrors.dob = 'dob is required';
        } else if(choosedDate > currentDate){
            newErrors.dob = 'date should not be in Future';
        }

        //hobby validation
        if (formData.hobbies.length === 0) {
            newErrors.hobbies = "please choose at least one hobby!";
        }
        
        //gender validation
        if(!formData.gender){
            newErrors.gender = 'gender is required';
        }

        //nationality validation
        if(formData.nationality === 'other' && formData.newNation === ""){
            newErrors.newNation = "please enter the nationality"
        }

        setFormErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    //handleNationBlur
    const handleNationBlur = () => {
        const { newNation } = formData;
    
        if (newNation.trim() !== '') {
            setNationalityOptions((prevOptions) => {
                // Check if the exact value (full nation name) already exists in options
                const exists = prevOptions.some(
                  (option) => option.value.toLowerCase() === newNation.toLowerCase()
                );
                if (!exists) {  // Add the full nation if not exists
                  return [...prevOptions, { label: newNation, value: newNation }];
                }
                return prevOptions;
            });
        }
    };

    //handleFormSubmit
    const handleFormSubmit = (event) =>{
        event.preventDefault();

        if (validation()){
            // If the user has entered a new nation, set it as nationality
            if (formData.nationality === 'other' && formData.newNation !== '') {
                setFormData((prevData) => ({
                    ...prevData,
                    nationality: formData.newNation,  // Set the new nation on form submit
                }));
            }

            alert('Form Submitted Successfully!!');
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
            // console.log(formData.name,formData.email,formData.password,formData.dob,formData.hobbies,formData.gender,formData.nationality)
        }
    };

    //handleFormReset
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

            {/* <div className='name'>
                <label className='labels' htmlFor="name">Name : </label>
                <input type="text"  name='name' value={formData.name} onChange={handleInputChange} placeholder='Enter Your Name'/>
                
                {formErrors.name && <p className='error-message'>{formErrors.name}</p>}
            </div> */}
            <InputFields 
                label='Name'
                type='text'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                error={formErrors.name}
                placeholder='Enter Your Name'
            />

            {/* <div className='email'>
                <label className='labels' htmlFor="email">Email : </label>
                <input type="text" name='email' value={formData.email} onChange={handleInputChange} placeholder='Enter Email id'/>
              
                {formErrors.email && <p className='error-message'>{formErrors.email}</p>}
            </div> */}
            <InputFields
                label='Email'
                type='text'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                error={formErrors.email}
                placeholder='Enter Email id'
            />

            {/* <div className='password'>
                <label className='labels' htmlFor="password">Password : </label>
                <input type="password" name='password' value={formData.password} onChange={handleInputChange} placeholder='Enter the Password'/>
    
                {formErrors.password && formErrors.password.map((each, index) => (
                    <p key={index} className='error-message'>{each}</p>
                ))}
            </div> */}
            <InputFields
                label='Password'
                type='password'
                name='password'
                value={formData.password}
                onChange={handleInputChange}
                error={formErrors.password && formErrors.password.map((eacherror, index) => (
                    <p className='error-message' key={index}>{eacherror}</p>
                ))}
                placeholder='Enter the Password'
            />

            {/* <div className='date'>
                <label className='labels' htmlFor="date">DOB : </label>
                <input type="date" name='dob' value={formData.dob} onChange={handleInputChange} placeholder='Enter Your DOB'/>
                {formErrors.dob && <p className='error-message'>{formErrors.dob}</p>}
            </div> */}
            <InputFields
                label='DOB'
                type='date'
                name='dob'
                value={formData.dob}
                onChange={handleInputChange}
                error={formErrors.dob}
            />

            {/* <div className='hobbies'>
                <label className='labels'>Hobbies : </label>
                <div className='check-boxes'>
                    <label htmlFor="reading">
                        <input type="checkbox" name='hobbies' value="reading" onChange={handleInputChange} checked={formData.hobbies.includes('reading')}/>
                        Reading
                    </label>

                    <label htmlFor="traveling">
                        <input type="checkbox" name='hobbies' value="traveling" onChange={handleInputChange} checked={formData.hobbies.includes('traveling')}/>
                        Traveling
                    </label>

                    <label htmlFor="cooking">
                        <input type="checkbox" name='hobbies' value="cooking" onChange={handleInputChange} checked={formData.hobbies.includes('cooking')}/>
                        Cooking
                    </label>
                
                    <label htmlFor="sports">
                        <input type="checkbox" name='hobbies' value="sports" onChange={handleInputChange} checked={formData.hobbies.includes('sports')}/>
                        Sports
                    </label>
                </div>  
                {formErrors.hobbies && (<p className='error-message'>{formErrors.hobbies}</p>)}
            </div> */}
            <InputFields
                label='Hobbies'
                classNameForHobby='check-boxes'
                type='checkbox'
                name='hobbies'
                checked={formData.hobbies}
                onChange={handleInputChange}
                error={formErrors.hobbies}
                options={[
                    {label:'Reading', value:'reading'},
                    {label:'Traveling', value:'traveling'},
                    {label:'Cooking', value:'cooking'},
                    {label:'Sports', value:'sports'}
                ]}
            />

            {/* <div className='gender'>
                <label className='labels'>Gender : </label>
                
                <input type="radio" value='male' onChange={handleInputChange} name="gender" checked={formData.gender==='male'}/>
                <label htmlFor="male">Male</label>
                    
                <input type="radio" value='female' onChange={handleInputChange} name="gender" checked={formData.gender==='female'}/>
                <label htmlFor="female">Female</label>
                
                {formErrors.gender && (<p className='error-message'>{formErrors.gender}</p>)}
            </div> */}
            <InputFields
                label='Gender'
                type='radio'
                name='gender'
                value={formData.gender}
                checked={formData.gender}
                onChange={handleInputChange}
                error={formErrors.gender}
                options={[
                    {label:'Male', value:'male'},
                    {label:'Female', value:'female'},
                ]}
            />

            {/* <div className='nation'>
                <label className="nation-label" htmlFor="nation">Nationality : </label>
                <select className='nation-select' name="nation" value={formData.nationality} onChange={handleInputChange} id="nationality">
                    <option value="Indian">Indian</option>
                    <option value="other">Other</option>
                    {formData.newNation && (<option value={formData.newNation}>{formData.newNation}</option>)}
                </select>

                {formData.nationality==="other" && (<input type='text' name='newNation' value={formData.newNation} onChange={handleInputChange}  placeholder='specify the nation' />)}
                
                {formErrors.newNation && (<p className='error-message'>{formErrors.newNation}</p>)}
                
            </div> */}
            <InputFields
                label='Nationality'
                type='select'
                name='nation'
                nationalityName = 'nationality'
                value={formData.nationality}
                onChange={handleInputChange}

                onBlur={handleNationBlur}  // Finalize nation when focus is lost

                options={nationalityOptions}
                show={formData.nationality === 'other'}
                newNation={formData.newNation}
                error={formErrors.newNation}
            />

            <div className='buttons-parent'>
                <button type='submit'>Submit</button>
                <button type="button" onClick={handleFormReset}>Reset</button>
            </div>

        </form>
        </>
    )
}

export default Form