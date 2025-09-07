import { createContext, useContext, useState, useEffect } from 'react'

const themes = {
  oneDarkPro: {
    name: 'One Dark Pro',
    colors: {
      // Base colors
      background: '#282c34',
      foreground: '#abb2bf',
      selection: '#3e4451',
      lineHighlight: '#2c313c',

      // Editor colors
      editorBackground: '#21252b',
      editorForeground: '#abb2bf',
      editorLineNumber: '#636d83',
      editorCursor: '#528bff',
      editorSelection: '#3e4451',
      editorInactiveSelection: '#3e4451',

      // Syntax colors
      keyword: '#c678dd',
      string: '#98c379',
      number: '#d19a66',
      comment: '#5c6370',
      function: '#61afef',
      variable: '#e06c75',
      type: '#e5c07b',

      // UI colors
      sidebar: '#21252b',
      sidebarForeground: '#abb2bf',
      panel: '#21252b',
      panelForeground: '#abb2bf',
      statusBar: '#21252b',
      statusBarForeground: '#abb2bf',

      // Gamification colors (vibrant accents)
      primary: '#61afef',
      secondary: '#c678dd',
      success: '#98c379',
      warning: '#e5c07b',
      error: '#e06c75',
      info: '#56b6c2',

      // Achievement/badge colors
      gold: '#ffd700',
      silver: '#c0c0c0',
      bronze: '#cd7f32',
      legendary: '#ff6b6b',

      // Border and accents
      border: '#3e4451',
      focus: '#528bff',
      hover: '#3e4451'
    }
  },

  monokai: {
    name: 'Monokai',
    colors: {
      // Base colors
      background: '#272822',
      foreground: '#f8f8f2',
      selection: '#49483e',
      lineHighlight: '#3e3d32',

      // Editor colors
      editorBackground: '#272822',
      editorForeground: '#f8f8f2',
      editorLineNumber: '#90908a',
      editorCursor: '#f8f8f0',
      editorSelection: '#49483e',
      editorInactiveSelection: '#49483e',

      // Syntax colors
      keyword: '#f92672',
      string: '#e6db74',
      number: '#ae81ff',
      comment: '#75715e',
      function: '#a6e22e',
      variable: '#f92672',
      type: '#66d9ef',

      // UI colors
      sidebar: '#272822',
      sidebarForeground: '#f8f8f2',
      panel: '#272822',
      panelForeground: '#f8f8f2',
      statusBar: '#272822',
      statusBarForeground: '#f8f8f2',

      // Gamification colors
      primary: '#a6e22e',
      secondary: '#f92672',
      success: '#a6e22e',
      warning: '#fd971f',
      error: '#f92672',
      info: '#66d9ef',

      // Achievement/badge colors
      gold: '#ffd700',
      silver: '#c0c0c0',
      bronze: '#cd7f32',
      legendary: '#ff6b6b',

      // Border and accents
      border: '#49483e',
      focus: '#a6e22e',
      hover: '#49483e'
    }
  },

  dracula: {
    name: 'Dracula',
    colors: {
      // Base colors
      background: '#282a36',
      foreground: '#f8f8f2',
      selection: '#44475a',
      lineHighlight: '#44475a',

      // Editor colors
      editorBackground: '#282a36',
      editorForeground: '#f8f8f2',
      editorLineNumber: '#6272a4',
      editorCursor: '#f8f8f2',
      editorSelection: '#44475a',
      editorInactiveSelection: '#44475a',

      // Syntax colors
      keyword: '#ff79c6',
      string: '#f1fa8c',
      number: '#bd93f9',
      comment: '#6272a4',
      function: '#50fa7b',
      variable: '#ff79c6',
      type: '#8be9fd',

      // UI colors
      sidebar: '#282a36',
      sidebarForeground: '#f8f8f2',
      panel: '#282a36',
      panelForeground: '#f8f8f2',
      statusBar: '#282a36',
      statusBarForeground: '#f8f8f2',

      // Gamification colors
      primary: '#50fa7b',
      secondary: '#ff79c6',
      success: '#50fa7b',
      warning: '#f1fa8c',
      error: '#ff5555',
      info: '#8be9fd',

      // Achievement/badge colors
      gold: '#ffd700',
      silver: '#c0c0c0',
      bronze: '#cd7f32',
      legendary: '#ff6b6b',

      // Border and accents
      border: '#44475a',
      focus: '#50fa7b',
      hover: '#44475a'
    }
  },

  retroGaming: {
    name: 'Retro Gaming',
    colors: {
      // Base colors - NES/SNES inspired
      background: '#0f0f23',
      foreground: '#00ff41',
      selection: '#003b00',
      lineHighlight: '#001100',

      // Editor colors - Terminal/matrix style
      editorBackground: '#000000',
      editorForeground: '#00ff41',
      editorLineNumber: '#008f11',
      editorCursor: '#00ff41',
      editorSelection: '#003b00',
      editorInactiveSelection: '#001100',

      // Syntax colors - Retro gaming palette
      keyword: '#ff6b6b',
      string: '#ffff00',
      number: '#00ffff',
      comment: '#008f11',
      function: '#ff00ff',
      variable: '#ff6b6b',
      type: '#00ffff',

      // UI colors - Game console style
      sidebar: '#1a1a2e',
      sidebarForeground: '#00ff41',
      panel: '#16213e',
      panelForeground: '#00ff41',
      statusBar: '#0f0f23',
      statusBarForeground: '#00ff41',

      // Gamification colors - Arcade style
      primary: '#ff6b6b',
      secondary: '#4ecdc4',
      success: '#00ff41',
      warning: '#ffa500',
      error: '#ff0000',
      info: '#00ffff',

      // Achievement/badge colors - Medal style
      gold: '#ffd700',
      silver: '#c0c0c0',
      bronze: '#cd7f32',
      legendary: '#ff1493',

      // Border and accents - Neon style
      border: '#00ff41',
      focus: '#ff6b6b',
      hover: '#003b00'
    }
  }
}

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('retroGaming')
  const [isDarkMode, setIsDarkMode] = useState(true)

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('codeReviewTheme')
    const savedDarkMode = localStorage.getItem('darkMode')

    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme)
    }

    if (savedDarkMode !== null) {
      setIsDarkMode(JSON.parse(savedDarkMode))
    }
  }, [])

  // Save theme to localStorage when changed
  useEffect(() => {
    localStorage.setItem('codeReviewTheme', currentTheme)
  }, [currentTheme])

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode))
  }, [isDarkMode])

  const theme = themes[currentTheme]

  const toggleTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName)
    }
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const value = {
    theme,
    currentTheme,
    isDarkMode,
    toggleTheme,
    toggleDarkMode,
    availableThemes: Object.keys(themes)
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext
