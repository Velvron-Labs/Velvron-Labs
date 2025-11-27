'use client';

export default function Error({ error, reset }) {
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
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#ffffff' }}>
        Something went wrong!
      </h2>
      <p style={{ marginBottom: '2rem', maxWidth: '500px' }}>
        An unexpected error occurred. Please try again or refresh the page.
      </p>
      <button
        onClick={() => reset()}
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
        Try Again
      </button>
      {process.env.NODE_ENV === 'development' && error && (
        <details style={{ marginTop: '2rem', textAlign: 'left', maxWidth: '600px' }}>
          <summary style={{ cursor: 'pointer', marginBottom: '1rem', color: '#ef4444' }}>
            Error Details (Development Only)
          </summary>
          <pre style={{
            backgroundColor: '#0a0e27',
            padding: '1rem',
            borderRadius: '0.375rem',
            overflow: 'auto',
            fontSize: '0.875rem',
            color: '#10b981'
          }}>
            {error.message}
          </pre>
        </details>
      )}
    </div>
  );
}
