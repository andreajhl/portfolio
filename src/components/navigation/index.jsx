'use client';
import React, { useState } from 'react';
import wordings from '../../wordings';
import './styles.scss'
import classNames from 'classnames';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdown = () => setIsOpen(!isOpen)

  return (
    <header className='header'>
      <nav className='navbar'>
        <div className='navbar__header'>
          <button className="navbar-brand" href="">A.</button>  
          <button
            data-toggle="collapse"
            aria-expanded={isOpen}
            onClick={handleDropdown}
            className={classNames(
              'navbar__toggle',
              { 'open': isOpen }
            )}
          >
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>                        
          </button>        
        </div>
        <div
          aria-expanded={isOpen}
          className={classNames(
            'navbar__collapse',
            { 'in': isOpen }
          )} 
        >
          <ul className="navbar__menu" role='menu'>
              <li role='menuitem'>
                <a title="Home" href="#home" onClick={handleDropdown} className="navbar-link">
                  {wordings.navbar.initial}
                </a>
              </li>
              <li role='menuitem'>
                <a title="About Us" href="#about" onClick={handleDropdown} className="navbar-link">
                  {wordings.navbar.about}
                </a>
              </li>
              <li role='menuitem'>
                <a title="About Us" href="#skill" onClick={handleDropdown} className="navbar-link">
                  {wordings.navbar.skill}
                </a>
              </li>
              <li role='menuitem'>
                <a title="Projects" href="#projects" onClick={handleDropdown} className="navbar-link">
                  {wordings.navbar.projects}
                </a>
              </li>
              <li role='menuitem'>
                <a title="Experiences" href="#curriculum" onClick={handleDropdown} className="navbar-link">
                  {wordings.navbar.experiences}
                </a>
              </li>
              <li role='menuitem'>
                <a title="Contact Us" href="#contact" onClick={handleDropdown} className="navbar-link">
                  {wordings.navbar.contact}
                </a>
              </li>
            </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
