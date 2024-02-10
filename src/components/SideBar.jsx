import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export const SideBar = () => {
    const navLinkActive = ({ isActive }) => {
        return {
          color: isActive ? "red" : "black",
        };
      };

  return (
    <div className='text-bg-dark vh-100'>
      <div className='px-2 h2 pt-2 dash' style={{color:"#B197FC"}}>Dashboard<svg className='book mx-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#B197FC" d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg></div>
      <ul className='list-unstyled p-4'>
        <li >
          <NavLink to='/' style={navLinkActive}>
            Home
          </NavLink>
        </li>
        <li className='my-3' >
          <NavLink to='/book' style={navLinkActive}>
            Book Details
          </NavLink>
        </li>
        <li >
          <NavLink to='/author' style={navLinkActive}>
            Author Details
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
