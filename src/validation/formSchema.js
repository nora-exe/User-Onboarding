//Sets up at least two different validations using Yup + custom error messages that will display on screen when validation fails.
import * as yup from 'yup'

const formSchema = yup.object().shape({
    name: yup.string()
        .trim()
        .required('A name is required, please fill out')
        .min(2, 'Name must be at least 2 characters'),
    email: yup.string()
        .email('Must be a valid email address')
        .required('Email is required'),
    password: yup.string()
        .required('A password is required')
        .min(8, 'Must be at least 8 characters'),
    // confirmPass: yup.string()
    //     .required('Passwords must match')
    //     .test('passwords-match', 'Passwords must match', function(value){
    //         return yup.ref('password') === value
    //       }),
    //     // .oneOf([yup.ref('password')], 'Passwords must match'),
    haveRead: yup.bool().oneOf([true], 'Please read and accept the Terms of Service before proceeding'),
})

export default formSchema