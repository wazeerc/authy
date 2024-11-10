import React from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Add any logout logic here
        navigate('/');
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f0f2f5'
        }}>
            <div style={{
                textAlign: 'center',
                padding: '2rem',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
                <div style={{
                    color: '#4CAF50',
                    fontSize: '48px',
                    marginBottom: '1rem'
                }}>
                    ✓
                </div>
                <h1 style={{
                    color: '#333',
                    marginBottom: '1rem'
                }}>
                    Login Successful!
                </h1>
                <p style={{
                    color: '#666',
                    marginBottom: '1.5rem'
                }}>
                    Welcome back! You have successfully logged in.
                </p>
                <button
                    onClick={handleLogout}
                    style={{
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Success;
