import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Shield, Sparkles } from 'lucide-react';
import './Login/Login.css';

const ForgottenPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setMessage('');    

        try {
            // This would be connected to your auth context
            // For now, using direct Firebase auth
            const { sendPasswordResetEmail } = await import('firebase/auth');
            const { auth } = await import('./firebase');
            
            await sendPasswordResetEmail(auth, email);
            setMessage('Password reset email sent! Please check your inbox and spam folder.');
            setEmail('');
        } catch (err) {
            console.error('Password reset error:', err);
            if (err.code === 'auth/user-not-found') {
                setError('No account found with this email address.');
            } else if (err.code === 'auth/invalid-email') {
                setError('Please enter a valid email address.');
            } else {
                setError('Failed to send reset email. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="auth-background">
            {/* Animated Background Elements */}
            <div className="auth-background-elements">
                <motion.div 
                    className="floating-shape shape-1"
                    animate={{ 
                        y: [0, -20, 0],
                        rotate: [0, 5, 0]
                    }}
                    transition={{ 
                        duration: 6, 
                        repeat: Infinity,
                        ease: "easeInOut" 
                    }}
                />
            </div>

            <motion.div 
                className="auth-container"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <motion.div 
                    className="auth-card"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    {/* Header Section */}
                    <motion.div 
                        className="auth-header"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="auth-icon">
                            <Shield size={32} />
                            <motion.div
                                className="sparkle"
                                animate={{ 
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 180, 360]
                                }}
                                transition={{ 
                                    duration: 3, 
                                    repeat: Infinity,
                                    repeatDelay: 2 
                                }}
                            >
                                <Sparkles size={16} />
                            </motion.div>
                        </div>
                        <h2>Reset Your Password</h2>
                        <p>Enter your email to receive a reset link</p>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        {/* Email Field */}
                        <motion.div 
                            className="form-group"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <div className="input-with-icon">
                                <Mail size={20} className="input-icon" />
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={isLoading}
                                    className="modern-input"
                                />
                            </div>
                        </motion.div>

                        {/* Messages */}
                        {message && (
                            <motion.div 
                                className="success-message"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <div className="message-content">
                                    <strong>Check Your Email!</strong>
                                    <p>{message}</p>
                                    <small className="spam-note">
                                        💡 <strong>Tip:</strong> Don't forget to check your spam folder if you don't see the email in your inbox.
                                    </small>
                                </div>
                            </motion.div>
                        )}

                        {error && (
                            <motion.div 
                                className="error-message"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                {error}
                            </motion.div>
                        )}

                        {/* Submit Button */}
                        <motion.button 
                            type="submit" 
                            disabled={isLoading}
                            className="primary-btn"
                            whileHover={{ scale: isLoading ? 1 : 1.02 }}
                            whileTap={{ scale: isLoading ? 1 : 0.98 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            {isLoading ? (
                                <div className="loading-spinner"></div>
                            ) : (
                                'Send Reset Link'
                            )}
                        </motion.button>
                    </form>

                    {/* Back to Login */}
                    <motion.div 
                        className="auth-footer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <button 
                            onClick={handleBackToLogin}
                            className="back-to-login-btn"
                            disabled={isLoading}
                        >
                            <ArrowLeft size={16} />
                            Back to Login
                        </button>
                        <p>
                            Don't have an account?{' '}
                            <Link to="/signup" className="auth-link">
                                Sign up here
                            </Link>
                        </p>
                    </motion.div>

                    {/* Security Note */}
                    <motion.div 
                        className="security-note"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        <Shield size={14} />
                        <span>We'll send a secure link to reset your password. The link expires in 1 hour.</span>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default ForgottenPassword;