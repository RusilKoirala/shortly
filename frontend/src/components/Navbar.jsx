import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const { isLoggedIn, user, logout } = useContext(AuthContext)

  // Force dark mode on mount
  React.useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  return (
  <nav className="bg-black p-2 shadow-sm font-geist">
      <div className="container mx-auto flex justify-between items-center">
  <div className="text-white text-xl font-bold tracking-tight font-satoshi">
          <Link to="/">
            <span>Shortly</span>
          </Link>
        </div>
        <div className="space-x-3 flex items-center">
          <div className="flex items-center gap-2">
            <a href="https://github.com/rusilkoirala/shortly" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200 transition p-1 rounded">
              {/* GitHub */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.468-2.381 1.236-3.221-.125-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 013.003-.404c1.018.005 2.044.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.653.244 2.874.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.803 5.622-5.475 5.92.43.372.814 1.102.814 2.222 0 1.606-.014 2.903-.014 3.296 0 .32.216.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>

          </div>
          <Link to="/" className="text-white hover:text-blue-400 font-inter transition">Home</Link>
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="text-white hover:text-blue-400 font-inter transition">{user?.name || 'Profile'}</Link>
              <button onClick={logout} className="text-white hover:text-red-400 font-inter transition bg-transparent border-none cursor-pointer">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-blue-400 font-inter transition">Login</Link>
              <Link to="/register" className="text-white hover:text-blue-400 font-inter transition">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
