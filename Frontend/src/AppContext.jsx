import { createContext, useContext, useState, useMemo } from 'react'

const AppContext = createContext()

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}

export const AppProvider = ({ children }) => {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1
}`)

  const [review, setReview] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const reviewCode = async () => {
    setIsLoading(true)
    setError('')
    setReview('')
    try {
      const response = await fetch('http://localhost:3000/ai/get-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
      })
      if (!response.ok) {
        throw new Error('Failed to get review')
      }
      const data = await response.json()
      if (!data.review || data.review.trim() === '') {
        throw new Error('Empty review received from server')
      }
      setReview(data.review)
    } catch (err) {
      setError(err.message || 'Unknown error')
      setReview('') // Clear review on error
    } finally {
      setIsLoading(false)
    }
  }

  const contextValue = useMemo(() => ({
    code,
    setCode,
    review,
    setReview,
    isLoading,
    setIsLoading,
    error,
    setError,
    reviewCode
  }), [code, review, isLoading, error])

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
