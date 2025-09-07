import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })

    // Log error to console in development
    console.error('Error caught by boundary:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary" style={{
          padding: '2rem',
          textAlign: 'center',
          backgroundColor: '#2a2a2a',
          borderRadius: '0.7rem',
          border: '1px solid #444',
          margin: '1rem'
        }}>
          <h2 style={{ color: '#ff4757', marginBottom: '1rem' }}>
            Something went wrong
          </h2>
          <p style={{ color: '#ffffff', marginBottom: '1.5rem' }}>
            An unexpected error occurred. Please try refreshing the page or contact support if the problem persists.
          </p>

          <div style={{ marginBottom: '1.5rem' }}>
            <button
              onClick={this.handleRetry}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                marginRight: '1rem'
              }}
            >
              Try Again
            </button>

            <button
              onClick={() => window.location.reload()}
              style={{
                background: '#444',
                color: '#ffffff',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              Refresh Page
            </button>
          </div>

          {process.env.NODE_ENV === 'development' && (
            <details style={{ textAlign: 'left', marginTop: '2rem' }}>
              <summary style={{ color: '#e0e0e0', cursor: 'pointer', marginBottom: '1rem' }}>
                Error Details (Development Only)
              </summary>
              <pre style={{
                backgroundColor: '#1e1e1e',
                color: '#ff4757',
                padding: '1rem',
                borderRadius: '0.5rem',
                overflow: 'auto',
                fontSize: '0.8rem',
                whiteSpace: 'pre-wrap'
              }}>
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
