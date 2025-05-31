import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react'
import {auth} from './firebase'

const ForgottenPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [IsLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('')
        setMessage('');    
    

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('Password resend email sent. Please check your inbox.')
        } catch (err) {
           setError(err.message); 
        }finally{
            setIsLoading(false);
        }
    }
    
    return (
        <div className= "form-container" > 
            <h2>Reset Password</h2>
            <form onSubmit = {handleSubmit}>
                <input
                    type="email"
                    value= {email} 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter your email Address' 
                    required
                />
                <button type='submit' disabled = {IsLoading}>
                    {IsLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
            </form>
            {message && <div  className='sucess'>{message}</div>}
            {error && <div className='error'>{error}</div>}
        </div>
    )
}

export default ForgottenPassword
