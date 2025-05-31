// src/pages/SignUp.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaGoogle } from 'react-icons/fa';
import { auth } from '../pages/firebase';
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../pages/firebase';


const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  userName: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .test('password-strength', 'Password must meet requirements', function (value) {
      const errors = [];
      if (!value) return this.createError({ message: 'Password is required' });

      if (value.length < 6) {
        errors.push('Minimum 6 characters');
      }
      if (!/[A-Z]/.test(value)) {
        errors.push('At least one uppercase letter');
      }
      if (!/[a-z]/.test(value)) {
        errors.push('At least one lowercase letter');
      }
      if (! /[!@#$%^&*(),.?":{}|<> ]/ .test(value)) {
        errors.push('At least one symbol');
      }

      return errors.length
        ? this.createError({ message: errors.join(', ') })
        : true;
  }),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm your password'),
  terms: yup.boolean().oneOf([true], 'You must accept the terms'),
  newsletter: yup.string().required('Please select a newsletter option'),
});

function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: data.userName });

      const userData = {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.userName,
        email: data.email,
        newsletter: data.newsletter,
      };

      await setDoc(doc(db, "users", user.uid), userData);

      localStorage.setItem("user", JSON.stringify(userData));
      reset();
      navigate("/home");
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setErrorMsg("This email is already in use. Please login instead.");
      } else {
        setErrorMsg(error.message);
      }
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userData = {
        username: user.displayName || "Google User",
        email: user.email,
        photoURL: user.photoURL || null,
        newsletter: "no", // default or prompt in future
      };

      await setDoc(doc(db, "users", user.uid), userData);

      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/home");
    } catch (error) {
      console.error("Google sign-up failed:", error);
      setErrorMsg("Google sign-up failed. Try again.");
    }
  };

  return (
    <div className="form-container1">
      <h2>Sign Up</h2>

      {errorMsg && <p className="error">{errorMsg}</p>}

      <form onSubmit={handleSubmit(onSubmit)}>

        <input type="text" placeholder="First Name" {...register("firstName")} />
        {errors.firstName && <p className="error">{errors.firstName.message}</p>}

        <input type="text" placeholder="Last Name" {...register("lastName")} />
        {errors.lastName && <p className="error">{errors.lastName.message}</p>}

        <input type="text" placeholder="User Name" {...register("userName")} />
        {errors.userName && <p className="error">{errors.userName.message}</p>}

        <input type="email" placeholder="Email" {...register("email")} />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}

        <div className='buttons'>
          <label >
            <input type="checkbox" onClick={() => setShowPassword(!showPassword)} className='password' style={{marginRight: "5px"}}/>
              {showPassword ? "Hide" : "Show"} Passwords
          </label>
          
          
        </div>

        

        <div className='newsletter'>
          <label>
            <input type="checkbox" {...register("terms")} style={{marginRight: "5px"}}/>
            I accept the terms
          </label>
          {errors.terms && <p className="error">{errors.terms.message}</p>}
          
          <label style={{ marginTop: "1rem" }}>Would you like to receive our weekly newsletter?</label>
          <p className="newsletter-note">We won’t spam. Just helpful reminders and updates.</p>
          
          <div className="radio-options">
            <label>
              <input type="radio" value="yes" {...register("newsletter")} style={{marginRight: "5px"}}/>
              Yes, I’d love helpful reminders!
            </label>
            <label>
              <input type="radio" value="no" {...register("newsletter")} style={{marginRight: "5px"}}/>
              No thanks, not right now.
            </label>
          </div>
          {errors.newsletter && <p className="error">{errors.newsletter.message}</p>}

          
        </div>

        

        <button type="submit" disabled={!isValid}>Sign Up</button>
        <p className="form-switch-text">
          Already have an account? <Link to="/login">Login</Link>
          </p>
      </form>

      <div onClick={handleGoogleSignup} className="google-login-btn">
        <img src="data:image/png;base64,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" alt=""  className='google-img'/>

      </div>

      
    </div>
  );
}

export default SignUp;
