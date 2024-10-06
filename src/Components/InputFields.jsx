import React from 'react'

const InputFields = ({
    label,
    type,
    name,
    value,
    checked,
    onChange,
    error,
    placeholder,
    options,
    show,
    classNameForHobby,
    nationalityName,
    newNation,
    onBlur

}) => {
  return (
    <>
        <div className={`${name}`}>
            <label className='labels' htmlFor={name}>{label} : </label>
            {type === 'checkbox' || type === 'radio' ? (
                <>
                    {type === 'checkbox' && (
                        <div className={classNameForHobby}>
                            {options && options.map((option, index) => (
                                <label key={index} htmlFor={option.value}>
                                    <input 
                                        type={type} 
                                        name={name} 
                                        value={option.value} 
                                        checked={checked.includes(option.value)} 
                                        onChange={onChange}
                                    />
                                    {option.label}
                                </label>
                            ))}
                        </div>
                    )}
                    {type === 'radio' && (
                        options && options.map((option, index) => (
                            <label key={index} htmlFor={option.value}>
                                <input 
                                    type={type} 
                                    name={name} 
                                    value={option.value} 
                                    checked={value === option.value} 
                                    onChange={onChange}
                                />
                                {option.label}
                            </label>
                        ))
                    )}
                    
                </>
            ) : type === 'select' ? (
                <>
                    <select className='nation-select' name={nationalityName} value={value} onChange={onChange}>
                        {options.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    
                    {show && (
                        <input type='text' name="newNation" value={newNation} onBlur={onBlur} onChange={onChange} placeholder='Specify the nation' />
                    )}
                    
                </>
            ) : (
                <input 
                    type={type} 
                    name={name} 
                    value={value} 
                    onChange={onChange} 
                    placeholder={placeholder} 
                />
            )}
            
            {error && <p className='error-message'>{error}</p>}
        </div>
    </>
  )
}

export default InputFields