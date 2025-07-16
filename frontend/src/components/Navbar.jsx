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
    <nav className="bg-black p-4 shadow font-geist">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold tracking-tight font-satoshi">
          <Link to="/">
            <span>Shortly</span>
          </Link>
        </div>
        <div className="space-x-6 flex items-center">
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
