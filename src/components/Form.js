/* Form
User Information:
 Name
 Email
 Password
 Terms of Service (checkbox)
 A Submit button to send form data to the server
*/

import React from 'react'

export default function Form(props) {

    const {
        values,
        submit,
        change,
        disabled,
        errors,
    } = props

    const onSubmit = e => {
        e.preventDefault()
        submit()
    }

    const onChange = e => {
        const {
            name,
            value,
            type,
            checked,
        } = e.target
        const valueToUse = type === 'checkbox' ? checked : value
        change(name, valueToUse)
    }

    return (
        <form className='form container' onSubmit={onSubmit}>
            <div>
                <h2>Add a User:</h2>
            </div>

            <div className='form-group inputs'>
                {/* Text Inputs */}
                <label>👋 Name
                    <input 
                        value={values.name}
                        onChange={onChange}
                        name='name'
                        type='text'
                    />
                </label>
                <label>📧 Email
                    <input
                        value={values.email}
                        onChange={onChange}
                        name='email'
                        type='text'
                    />
                </label>
                <label>🔐 Password
                    <input
                        value={values.password}
                        onChange={onChange}
                        name='password'
                        type='password'
                    />
                </label>
                {/*
                <label>Confirm Password
                    <input
                        value={values.confirmPass}
                        onChange={onChange}
                        name='confirmPass'
                        type='text'
                    />
                </label>
                */}
                <br/>
                {/* Checkbox Input */}
                <label>❕ Please Accept our Terms of Service:
                    <input
                        type='checkbox'
                        name='haveRead'
                        onChange={onChange}
                        checked={values.haveRead}
                    />
                </label>

                <br />
                <div className='submitBtn'>
                    <button disabled={disabled}>submit</button>
                    <div className='errors'>
                        <div>{errors.name}</div>
                        <div>{errors.email}</div>
                        <div>{errors.password}</div>
                        {/* <div>{errors.confirmPass}</div> */}
                        <div>{errors.haveRead}</div>
                    </div>
                </div>
            </div>
        </form>
    )
}