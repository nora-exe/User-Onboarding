import React, {useState, useEffect} from 'react'
import './App.css'
import Form from './components/Form'
import formSchema from './validation/formSchema'
import User from './components/User'
import axios from 'axios'
import * as yup from 'yup'

// Initial Form States
const initialFormValues = {
  // Text Inputs
  name: '',
  email: '',
  password: '',
  // Checkbox Input
  haveRead: false,
}
const initialFormErrors = {
  name: '',
  email: '',
  password: '',
  // confirmPass: '',
  haveRead: '',
}
const initialUsers = []
const initialDisabled = true

export default function App() {
  // States
  const [users, setUsers] = useState(initialUsers)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)
  
  // Helpers
  const postNewUser = newUser => {
    //https://reqres.in/api/users
    //Every time you make a POST request, and get that new user data back, update your users state with the new user added to the array
    axios.post('https://reqres.in/api/users', newUser)
      .then(res => {
        setUsers([res.data, ...users])
      })
      .catch(err => {
        console.log(err);
      })
      setFormValues(initialFormValues)
  }

  //Validation with Yup
  const inputChange = (name, value) => {
    yup.reach(formSchema, name)
      .validate(value)
      .then(() => {
        setFormErrors({...formErrors, [name]: ''})
      })
      .catch(err => {
        setFormErrors({...formErrors, [name]: err.errors[0]})
      })
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  //Render users in your app. You can use the html pre tag and JSON.stringify() method to display your post request.
  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password,
      haveRead: formValues.haveRead,
    }
    postNewUser(newUser)
  }

  // Side Effect
  useEffect(() => {
    // Adjust status of 'disabled' when formValues changes
    formSchema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])

  return (
    <div>
      <header><h1>🎉 New User Form! 🎉</h1></header>

      <Form
        values={formValues}
        submit={formSubmit}
        change={inputChange}
        disabled={disabled}
        errors={formErrors}
      />

      <div><h3>Who's Already Here?</h3></div>

      {
        users.length ? users.map(user => {
          return (
            <User key={user.id} details={user} />
          )
        }) : 'You\'re the first one here 😎'        
      }
    </div>
  );
}
