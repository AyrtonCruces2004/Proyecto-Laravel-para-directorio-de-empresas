import React from 'react';

const TestComponent = () => {
    return (
        <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
            <h1 style={{ color: '#333' }}>Test Component</h1>
            <p style={{ color: '#666' }}>This is a simple test component</p>
            <button style={{ 
                backgroundColor: '#007bff', 
                color: 'white', 
                padding: '10px 20px', 
                border: 'none', 
                borderRadius: '5px' 
            }}>
                Test Button
            </button>
        </div>
    );
};

export default TestComponent; 