'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '2rem',
      backgroundColor: '#001233',
      color: '#979dac',
      textAlign: 'center',
      fontFamily: 'Inter, sans-serif'
    }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem', color: '#ffffff' }}>
        404
      </h1>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#ffffff' }}>
        Page Not Found
      </h2>
      <p style={{ marginBottom: '2rem', maxWidth: '500px', fontSize: '1.1rem' }}>
        {'The page you\'re looking for doesn\'t exist or has been moved.'}
      </p>
      <Link href="/">
        <button
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#3b82f6',
            color: '#ffffff',
            border: 'none',
            borderRadius: '0.375rem',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            fontWeight: '500'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
        >
          Go Home
        </button>
      </Link>
    </div>
  );
}
