import LazyMonacoEditor from '../LazyMonacoEditor'
import { useAppContext } from '../AppContext'
import { useTheme } from '../ThemeContext'

const MainEditor = () => {
  const { code, setCode, reviewCode, isLoading } = useAppContext()
  // Use default theme instead of retro theme
  const defaultTheme = {
    colors: {
      editorBackground: '#1e1e1e',
      sidebarForeground: '#d4d4d4',
      success: '#4ade80',
      border: '#3e3e3e',
      primary: '#007acc'
    }
  }

  return (
    <div className="main-editor-panel" style={{
      height: '100%',
      backgroundColor: defaultTheme.colors.editorBackground,
      borderRadius: '8px',
      overflow: 'hidden',
      border: `1px solid ${defaultTheme.colors.border}`,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div className="editor-header" style={{
        padding: '0.75rem 1rem',
        backgroundColor: '#000000',
        borderBottom: `1px solid ${defaultTheme.colors.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: defaultTheme.colors.success
          }}></div>
          <span style={{
            color: defaultTheme.colors.sidebarForeground,
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>
            Code Editor
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={reviewCode}
            disabled={isLoading}
            style={{
              backgroundColor: '#C71E64',
              color: '#000000',
              border: 'none',
              padding: '0.4rem 0.8rem',
              borderRadius: '4px',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              boxShadow: isLoading ? 'none' : `0 0 10px #EA2264`,
              transition: 'background-color 0.3s ease'
            }}
            title="Review Code"
          >
            {isLoading ? 'Reviewing...' : 'Review'}
          </button>
        </div>
      </div>

      <div className="editor-content" style={{ flex: 1, backgroundColor: '#1e1e1e', position: 'relative' }}>
        <LazyMonacoEditor
          value={code}
          onChange={(value) => setCode(value || '')}
          language="javascript"
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: '"JetBrains Mono", "Fira Code", monospace',
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnEnter: 'on',
            quickSuggestions: true,
            parameterHints: { enabled: true },
            hover: { enabled: true },
            contextmenu: true,
            mouseWheelZoom: true,
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            renderWhitespace: 'selection',
            renderControlCharacters: true,
            fontLigatures: true,
            bracketPairColorization: { enabled: true },
            guides: {
              bracketPairs: true,
              indentation: true
            }
          }}
        />
        <img
          src="https://www.codedex.io/images/character_gifs/ea3ChSv.gif"
          alt="Character GIF"
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '30px',
            width: '80px',
            height: '80px',
            pointerEvents: 'none',
            userSelect: 'none',
            opacity: 0.8,
            zIndex: 10
          }}
        />
      </div>
    </div>
  )
}

export default MainEditor
