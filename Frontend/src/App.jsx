import { useEffect, useState } from 'react'
import { useAppContext } from './AppContext'
import ErrorBoundary from './ErrorBoundary'
import MainEditor from './components/MainEditor.jsx'
import AISuggestionsSidebar from './components/AISuggestionsSidebar.jsx'
import './App.css'

function App() {
  const { reviewCode, review, isLoading, error } = useAppContext()
  const [showAbout, setShowAbout] = useState(false)

  useEffect(() => {
    // Any side effects if needed
  }, [])

  return (
    <ErrorBoundary>
      <div className="app-container" style={{
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
        color: '#00ff41',
        minHeight: '100vh',
        fontFamily: 'Courier New, Monaco, Menlo, monospace'
      }}>
        <header style={{
          background: 'linear-gradient(135deg, #2e0854 0%, #4b0082 100%)',
          padding: '1rem 2rem',
          boxShadow: 'inset 0 0 0 2px #4b0082, inset 0 0 0 4px #4b0082, 0 0 10px 2px #7a3fff',
          zIndex: 10,
          borderRadius: '8px',
          margin: '0.5rem 1rem',
          border: '2px solid #7a3fff',
          fontFamily: '"Pixel Emulator", "Press Start 2P", monospace'
        }}>
          <div className="header-content" style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
          }}>
            <div style={{ textAlign: 'center' }}>
              <h1 className="app-title" style={{
                fontSize: '2.8rem',
                fontWeight: '900',
                color: '#ffffff',
                margin: 0,
                textAlign: 'center',
                textShadow: '0 0 10px #00ff88, 0 0 20px #00ff88, 0 0 30px #00ff88',
                fontFamily: '"Pixel Emulator", "Press Start 2P", "Courier New", monospace',
                letterSpacing: '0.15em',
                userSelect: 'none'
              }}>
                {'</> Code Critic '}
              </h1>
              <div className="app-subtitle" style={{
                fontSize: '1rem',
                color: '#ffff00',
                marginTop: '0.5rem',
                textShadow: '0 0 10px #ffff00',
                fontFamily: 'Courier New, monospace'
              }}>
                [ AI Code Reviewer ]
              </div>
            </div>
            <img
              src="https://www.codedex.io/images/boy.gif"
              alt="About Me"
              onClick={() => setShowAbout(true)}
              style={{
                width: '48px',
                height: '48px',
                cursor: 'pointer',
                borderRadius: '50%',
                border: '2px solid #00ff88',
                boxShadow: '0 0 10px #00ff88',
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)'
              }}
            />
          </div>
        </header>

        {showAbout && (
          <div style={{
            position: 'fixed',
            top: '80px',
            right: '20px',
            width: '200px',
            backgroundColor: '#222',
            border: '2px solid #00ff88',
            borderRadius: '8px',
            padding: '0.5rem',
            boxShadow: '0 0 15px #00ff88',
            zIndex: 1000,
            color: '#00ff41',
            fontFamily: 'Courier New, monospace',
            fontSize: '0.85rem'
          }} onClick={() => setShowAbout(false)}>
            <div onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setShowAbout(false)}
                style={{
                  backgroundColor: '#00ff41',
                  border: 'none',
                  borderRadius: '4px',
                  color: '#000',
                  fontWeight: 'bold',
                  padding: '0.25rem 0.5rem',
                  cursor: 'pointer',
                  float: 'right'
                }}
                aria-label="Close About Me"
              >
                X
              </button>
              <h3 style={{ marginTop: 0, marginBottom: '0.5rem' }}>About This App:</h3>
              <p style={{ margin: '0.25rem 0' }}>
                🌟Welcome to Code Critic! This app is your AI-powered code reviewer, helping you write cleaner, more efficient, and maintainable code.🌟
              </p>
              <h3 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Developer Contact:</h3>
              <p style={{ margin: '0.25rem 0' }}><strong>Name:</strong> Shabarish B L</p>
              <p style={{ margin: '0.25rem 0' }}>
                <strong>GitHub:</strong>{' '}
                <a href="https://github.com/Shabarish5" target="_blank" rel="noopener noreferrer" style={{ color: '#00ff88' }}>
                  github.com/Shabarish5
                </a>
              </p>
              <img
                src="https://www.codedex.io/images/character_gifs/letter.gif"
                alt="Contact GIF"
                style={{ width: '70px', height: 'auto', margin: '0.5rem auto', display: 'block' }}
              />
            </div>
          </div>
        )}

        <main style={{
          padding: '1.5rem',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          gap: '1.5rem',
          height: 'calc(100vh - 120px)',
          overflow: 'hidden'
        }}>
          <div className="left exclude-retro-theme" style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            height: '100vh',
            margin: '0.5rem',
            border: '2px solid #00ff41',
            borderRadius: '0.7rem',
            boxShadow: '0 0 20px #00ff41 inset',
            backgroundColor: '#000000'  // Ensure black background for code editor
          }}>
            <MainEditor />
          </div>
          <div className="right exclude-retro-theme" style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            height: '100vh',
            margin: '0.5rem',
            border: '2px solid #00ff41',
            borderRadius: '0.7rem',
            boxShadow: '0 0 20px #00ff41 inset',
            backgroundColor: '#1a1a2e',
            padding: '1rem'
          }}>
            <AISuggestionsSidebar />
          </div>
        </main>
      </div>
    </ErrorBoundary>
  )
}

export default App
