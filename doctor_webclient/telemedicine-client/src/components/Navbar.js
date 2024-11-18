import React, { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.leftSection}>
      <a style={styles.navLink} href="/">
        <div style={styles.logo}>
          <span style={styles.logoText}>Medi</span>
          <span style={styles.logoHighlight}>Sphere</span>
        </div>
        </a>
        <div style={styles.searchContainer}>
          <input style={styles.searchInput} type="text" placeholder="Search..." />
          <button style={styles.searchButton}>
            <svg 
              style={styles.searchIcon} 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>
        </div>
      </div>

      <div style={styles.rightSection}>
        <ul
          style={{
            ...styles.navLinks,
            ...(isMobileMenuOpen ? styles.navLinksMobile : {}),
          }}
        >
          <li style={styles.navItem}>
            <a style={styles.navLink} href="/">Dashboard</a>
          </li>
          <li style={styles.navItem}>
            <a style={styles.navLink} href="/booked-appointments">Appointments</a>
          </li>
          <li style={styles.navItem}>
            <a style={styles.navLink} href="#consultations">Patients</a>
          </li>
        </ul>
        <div style={styles.actions}>
          <button style={styles.loginButton}>Login</button>
          <button style={styles.registerButton}>Register</button>
        </div>
        <button 
          style={{
            ...styles.mobileMenuButton,
            ...(window.innerWidth <= 768 ? { display: 'block' } : {})
          }} 
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? '✖' : '☰'}
        </button>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: '15px 30px',
    color: '#333',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
  },

  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },

  logo: {
    display: 'flex',
    fontSize: '28px',
    fontWeight: 'bold',
    letterSpacing: '-0.5px',
  },

  logoText: {
    color: '#333',
  },

  logoHighlight: {
    background: 'linear-gradient(45deg, #6a1b9a, #9c27b0)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
  },

  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    background: '#f5f5f5',
    borderRadius: '12px',
    padding: '8px 16px',
    transition: 'all 0.3s ease',
    ':hover': {
      background: '#f0f0f0',
    },
  },

  searchInput: {
    border: 'none',
    outline: 'none',
    padding: '8px',
    fontSize: '15px',
    background: 'transparent',
    width: '200px',
    color: '#333',
  },

  searchButton: {
    background: 'none',
    border: 'none',
    padding: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    color: '#666',
    transition: 'color 0.3s ease',
  },

  searchIcon: {
    width: '18px',
    height: '18px',
  },

  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },

  navLinks: {
    listStyle: 'none',
    display: 'flex',
    margin: 0,
    padding: 0,
    gap: '30px',
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },

  navLinksMobile: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '80px',
    right: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    padding: '15px',
    gap: '15px',
    width: '200px',
    '@media (max-width: 768px)': {
      display: 'flex',
    },
  },

  navItem: {
    margin: 0,
  },

  navLink: {
    color: '#333',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'color 0.3s ease',
    padding: '8px 12px',
    borderRadius: '8px',
    ':hover': {
      color: '#6a1b9a',
      backgroundColor: '#f5f5f5',
    },
  },

  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },

  loginButton: {
    backgroundColor: '#f5f5f5',
    color: '#333',
    border: 'none',
    borderRadius: '10px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '15px',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: '#eaeaea',
    },
  },

  registerButton: {
    backgroundColor: '#6a1b9a',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '15px',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: '#8e24aa',
      transform: 'translateY(-1px)',
    },
  },

  mobileMenuButton: {
    display: 'none',
    backgroundColor: 'transparent',
    color: '#333',
    fontSize: '24px',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: '#f5f5f5',
    },
    '@media (max-width: 768px)': {
      display: 'block',
    },
  },
};

export default Navbar;