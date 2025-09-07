import { lazy, Suspense } from 'react'

const MonacoEditor = lazy(() => import('@monaco-editor/react'))

const LazyMonacoEditor = (props) => {
  return (
    <Suspense fallback={
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: '#1e1e1e',
        color: '#ffffff',
        fontSize: '1.1rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div className="loading-spinner" style={{
            display: 'inline-block',
            width: '24px',
            height: '24px',
            border: '3px solid #f3f3f3',
            borderTop: '3px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '1rem'
          }}></div>
          <div>Loading Code Editor...</div>
        </div>
      </div>
    }>
      <MonacoEditor {...props} />
    </Suspense>
  )
}

export default LazyMonacoEditor
