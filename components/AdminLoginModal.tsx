'use client'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

interface AdminLoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AdminLoginModal({ isOpen, onClose }: AdminLoginModalProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { loginAsAdmin } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const result = loginAsAdmin(password)
    if (!result.success) {
      setError(result.error!)
    } else {
      onClose()
      setPassword('')
    }
    setSubmitting(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-background/90 backdrop-blur-sm rounded-xl shadow-2xl shadow-lg border border-border max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header - gleicher Stil wie Main Page */}
        <div className="p-3 sm:p-6 border-b border-border">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-1 sm:mb-2">
            🔒 Admin Login
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Gib das Admin-Passwort ein
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-3 sm:p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Admin Passwort
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-green-500 focus:border-green-500 text-foreground placeholder:text-muted-foreground transition-all shadow-sm"
                placeholder="Passwort eingeben"
                required
                disabled={submitting}
              />
            </div>
            
            {error && (
              <div className="bg-destructive/20 text-destructive border-2 border-destructive/30 p-3 rounded-xl text-sm shadow-md">
                {error}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-border">
            <button
              type="submit"
              disabled={submitting || !password}
              className="w-full sm:w-auto flex-1 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all text-sm sm:text-base shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <div className="flex items-center gap-2 justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Prüfe...
                </div>
              ) : (
                'Als Admin einloggen'
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 text-foreground bg-muted hover:bg-muted/80 rounded-xl font-medium text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all disabled:opacity-50"
              disabled={submitting}
            >
              Abbrechen
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
