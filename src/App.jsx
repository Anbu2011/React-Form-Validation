import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    
    <>
      <form>

        <div>
          <label htmlFor="name">Name : </label>
          <input type="text" placeholder='Enter Your Name'/>
        </div>


        <div>
          <label htmlFor="email">Email : 
            <input type="text" placeholder='Enter Email id'/>
          </label>
        </div>


        <div>
          <label htmlFor="password">Password : </label>
          <input type="text" placeholder='Enter the Password'/>
        </div>


        <div>
          <label htmlFor="date">DOB : </label>
          <input type="date" placeholder='Enter Your DOB'/>
        </div>

        <div className="checkboxes">
          <label>Select Your Hobbies : </label>
          <label htmlFor="reading">
            <input type="checkbox" />
            Reading
          </label>

          <label htmlFor="traveling">
            <input type="checkbox" />
            Traveling
          </label>

          <label htmlFor="cooking">
            <input type="checkbox" />
            Cooking
          </label>
          
          <label htmlFor="sports">
            <input type="checkbox" />
            Sports
          </label>
        </div>

        <div>
          <label>Gender : </label>
          <input type="radio" name="gender" />
          <label htmlFor="male">Male</label>
        
          <input type="radio" name="gender" />
          <label htmlFor="female">Female</label>
        </div>

        <div>
          <label htmlFor="nation">Nationality : </label>
          <select name="nationality" id="nationality">
            <option value="indian">Indian</option>
            <option value="other">Other</option>
          </select>


          {/* <label for="other-value"> Please specify:</label>
          <input type="text" id="other-value" name="otherValue"/> */}
        </div>

        <div>
          <button>Submit</button>
          <button>Reset</button>
        </div>





      </form>
    </>
  )
}

export default App
