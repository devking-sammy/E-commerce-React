import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="py-6 bg-gray-800 text-white text-center">
        <p>&copy; {new Date().getFullYear()} My Ecommerce. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Footer
