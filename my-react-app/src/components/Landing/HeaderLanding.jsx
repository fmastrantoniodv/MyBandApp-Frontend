import React, { useState, useEffect } from "react";
import logo from '../../img/logo.svg'

export const HeaderLanding = () => {
  
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      const landingContainer = document.querySelector(".landing-container")
      if (window.scrollY > 20) {
        header.classList.add("scrolled");
        landingContainer.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled");
        landingContainer.classList.remove("scrolled")
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center',
            height: '100%'
        }}>
            <img src={logo} alt='my band app logo' className='logo-landing'></img>
        </div>
    </header>
  );
};
