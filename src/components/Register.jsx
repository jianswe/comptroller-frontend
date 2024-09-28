import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { register } from '../services/authService';

const Register = () => {
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        }),
        onSubmit: async (values, { setStatus }) => {
            try {
                /* const response = */ await register(values);
                setStatus({success: 'Registration successful! Please Login'});
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log('error.response.data', error.response.data)
                    setStatus({ errors: error.response.data});
                } else {
                    console.error('Unexpected error:', error);
                }
            }
        },
    })

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={formik.handleSubmit}>
                {formik.status && formik.status.success &&
                    <div style={{ color: 'green' }}>{formik.status.success}</div>
                }
                {formik.status && formik.status.errors && 
                    formik.status.errors.map(error => {
                        return <div style={{ color: 'red' }} key={error.code}>{error.description}</div>
                    })
                }
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                    />
                    {formik.errors.username ? <div>{formik.errors.username}</div> : null}
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register