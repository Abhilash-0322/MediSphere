import React, { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.leftSection}>
        <div style={styles.logo}>Medisphere</div>
        <div style={styles.searchContainer}>
          <input style={styles.searchInput} type="text" placeholder="Search..." />
          <button style={styles.searchButton}>🔍</button>
        </div>
      </div>

      <div style={styles.rightSection}>
        <ul
          style={{
            ...styles.navLinks,
            ...(isMobileMenuOpen ? styles.navLinksMobile : {}),
          }}
        >
          <li style={styles.navItem}><a style={styles.navLink} href="#appointments">Appointments</a></li>
          <li style={styles.navItem}><a style={styles.navLink} href="#patients">Patients</a></li>
          <li style={styles.navItem}><a style={styles.navLink} href="#consultations">Consultations</a></li>
          {/* <li style={styles.navItem}><a style={styles.navLink} href="#chatbot">Chatbot</a></li> */}
        </ul>
        <div style={styles.actions}>
          <button style={styles.loginButton}>Login</button>
          <button style={styles.registerButton}>Register</button>
        </div>
        <button style={styles.mobileMenuButton} onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? '✖' : '☰'}
        </button>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6a1b9a', // Purple theme
    padding: '10px 20px',
    color: '#fff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#fff',
    marginRight: '20px',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: '5px',
    padding: '5px 10px',
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    padding: '5px',
    fontSize: '14px',
  },
  searchButton: {
    backgroundColor: '#6a1b9a',
    border: 'none',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    margin: 0,
    padding: 0,
  },
  navLinksMobile: {
    display: 'block',
    position: 'absolute',
    top: '60px',
    right: '20px',
    backgroundColor: '#6a1b9a',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '10px',
  },
  navItem: {
    margin: '0 15px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'color 0.3s',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#8e44ad',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '8px 16px',
    marginRight: '10px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  registerButton: {
    backgroundColor: '#ffffff',
    color: '#6a1b9a',
    border: '2px solid #6a1b9a',
    borderRadius: '5px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s, color 0.3s',
  },
  mobileMenuButton: {
    display: 'none',
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: '24px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Navbar;