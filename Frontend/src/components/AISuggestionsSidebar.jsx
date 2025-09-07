import { useState } from 'react'
import { useAppContext } from '../AppContext'
import { useTheme } from '../ThemeContext'

const AISuggestionsSidebar = () => {
  const { review, isLoading, error } = useAppContext()
  // Use default theme instead of retro theme
  const defaultTheme = {
    colors: {
      sidebar: '#252526',
      panel: '#2d2d30',
      panelForeground: '#cccccc',
      comment: '#6a9955',
      error: '#f44747',
      warning: '#ffcc02',
      info: '#3794ff',
      primary: '#007acc',
      border: '#3e3e42'
    }
  }
  const [expandedItems, setExpandedItems] = useState(new Set())



  const toggleItem = (index) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedItems(newExpanded)
  }

  // Mock suggestions data - in real app this would be parsed from the review
  const mockSuggestions = [
    {
      id: 1,
      type: 'error',
      title: 'Potential Bug Detected',
      description: 'This function may cause a null reference error',
      line: 5,
      severity: 'high',
      category: 'Logic Error',
      suggestion: 'Add null check before accessing object properties',
      points: 25
    },
    {
      id: 2,
      type: 'warning',
      title: 'Performance Issue',
      description: 'Inefficient loop detected',
      line: 12,
      severity: 'medium',
      category: 'Performance',
      suggestion: 'Consider using array methods like map() or filter()',
      points: 15
    },
    {
      id: 3,
      type: 'info',
      title: 'Code Style Improvement',
      description: 'Variable naming could be more descriptive',
      line: 8,
      severity: 'low',
      category: 'Style',
      suggestion: 'Use camelCase and descriptive names',
      points: 10
    }
  ]

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return defaultTheme.colors.error
      case 'medium': return defaultTheme.colors.warning
      case 'low': return defaultTheme.colors.info
      default: return defaultTheme.colors.comment
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'error': return '🚨'
      case 'warning': return '⚠️'
      case 'info': return '💡'
      default: return '📝'
    }
  }

  // Function to highlight code terms in text
  const highlightCodeTerms = (text) => {
    if (!text) return text

    // Keywords to highlight
    const keywords = ['function', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'return', 'class', 'import', 'export', 'from', 'async', 'await', 'try', 'catch', 'throw', 'new', 'this', 'super', 'extends', 'implements', 'interface', 'type', 'enum']

    // Regex patterns for different code elements
    const patterns = [
      // Keywords
      { regex: new RegExp(`\\b(${keywords.join('|')})\\b`, 'g'), color: '#c678dd' }, // purple for keywords
      // Function calls (word followed by parentheses)
      { regex: /\b\w+\s*\(/g, color: '#61afef' }, // blue for functions
      // Variables/constants (camelCase, PascalCase, snake_case)
      { regex: /\b[a-zA-Z_$][a-zA-Z0-9_$]*\b/g, color: '#e06c75' }, // red for variables
      // Strings
      { regex: /(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g, color: '#98c379' }, // green for strings
      // Numbers
      { regex: /\b\d+(\.\d+)?\b/g, color: '#d19a66' } // orange for numbers
    ]

    let highlightedText = text

    patterns.forEach(({ regex, color }) => {
      highlightedText = highlightedText.replace(regex, (match) => `<span style="color: ${color}">${match}</span>`)
    })

    return highlightedText
  }

  return (
    <div className="ai-suggestions-sidebar" style={{
      height: '100%',
      backgroundColor: defaultTheme.colors.sidebar,
      border: `1px solid ${defaultTheme.colors.border}`,
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div className="sidebar-header" style={{
        padding: '1rem',
        borderBottom: `1px solid ${defaultTheme.colors.border}`,
        backgroundColor: '#000000'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img
              src="https://www.codedex.io/images/codedex-bot-logo-compressed.webp"
              alt="Codedex Bot Logo"
              style={{
                width: '60px',
                height: '60px',
                pointerEvents: 'none',
                userSelect: 'none',
                opacity: 0.7,
                zIndex: 10
              }}
            />
            <h3 style={{
              margin: 0,
              color: defaultTheme.colors.panelForeground,
              fontSize: '1.1rem',
              fontWeight: '600',
              userSelect: 'none'
            }}>
              Code Review :)
            </h3>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="sidebar-content" style={{
        flex: 1,
        overflow: 'auto',
        padding: '0.5rem',
        marginTop: '0'
      }}>
        {isLoading ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '200px',
            color: defaultTheme.colors.comment
          }}>
            <div className="loading-spinner" style={{
              width: '32px',
              height: '32px',
              border: `3px solid ${defaultTheme.colors.border}`,
              borderTop: `3px solid ${defaultTheme.colors.primary}`,
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginBottom: '1rem'
            }}></div>
            <span>Analyzing your code...</span>
          </div>
        ) : error ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '200px',
            color: defaultTheme.colors.error,
            textAlign: 'center',
            padding: '1rem'
          }}>
            <span style={{ fontSize: '2rem', marginBottom: '1rem' }}>❌</span>
            <span style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Review Failed</span>
            <span style={{ fontSize: '0.9rem' }}>{error}</span>
          </div>
        ) : review ? (
          <div style={{
            backgroundColor: '#1a1a1a',
            border: `1px solid #444444`,
            borderRadius: '6px',
            padding: '1rem',
            fontFamily: 'Courier New, monospace',
            color: '#d4d4d4',
            whiteSpace: 'pre-wrap',
            fontSize: '0.9rem',
            lineHeight: '1.4',
            maxHeight: '100%',
            overflowY: 'auto',
            position: 'relative',
            boxShadow: '0 0 10px 2px #007acc'
          }}>
            <pre style={{
              whiteSpace: 'pre-wrap',
              fontSize: '0.9rem',
              lineHeight: '1.4',
              margin: 0,
              padding: '0 0 0 0',
              backgroundColor: 'transparent',
              border: 'none',
              fontFamily: 'Courier New, monospace',
              color: '#d4d4d4'
            }}>
              {review}
            </pre>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '200px',
            color: defaultTheme.colors.comment,
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '2rem', marginBottom: '1rem' }}>📝</span>
            <span>Click "Review" to get AI feedback on your code</span>
          </div>
        )}
      </div>

    </div>
  )
}

export default AISuggestionsSidebar
