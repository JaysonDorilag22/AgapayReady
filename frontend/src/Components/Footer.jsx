import React from 'react';
import Vite from "../assets/services/vite.png";

export default function Footer() {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content">
      <aside>
        <img src={Vite} alt="Vite Logo" className="h-20 w-auto" />
        <p>AgapayReady<br/>Emergency Response App since 2024</p>
      </aside> 
      <nav>
        <h6 className="footer-title">Services</h6> 
        <a className="link link-hover">Evacuation</a>
        <a className="link link-hover">Emergency Drills</a>
        <a className="link link-hover">Emergency Contacts</a>
        <a className="link link-hover">Real Time Updates</a>
      </nav> 
      <nav>
        <h6 className="footer-title">Company</h6> 
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Blog</a>
        <a className="link link-hover">Announcement</a>
      </nav> 
      <nav>
        <h6 className="footer-title">Legal</h6> 
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
    </footer>
  );
}
