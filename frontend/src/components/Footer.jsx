import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10">
      <nav className="grid grid-flow-col gap-4">
        <Link className="link link-hover" to="/about">Bibliografía</Link>
        <Link className="link link-hover" to="/contact">Contáctame</Link>
        <Link className="link link-hover" to="/portfolio">Portafolio</Link>
        <a className="link link-hover pointer-events-none text-gray-400 cursor-default">Próximamente</a>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a href="https://www.instagram.com/jp.artink/" target="_blank" rel="noopener noreferrer">
            <img src="../inst.png" alt="inst" width={70} height={70} /> 
          </a>
          
          <a>
            <img src="../email.png" alt="email" width={70} height={70} />
          </a>
          <a href="https://github.com/Jhonpulidob" target="_blank" rel="noopener noreferrer">
            <img src="../github.png" alt="github" width={70} height={70} />
          </a>
        </div>
      </nav>
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by ODILUP
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
