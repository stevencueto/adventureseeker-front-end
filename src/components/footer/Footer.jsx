import React from 'react'
import './footer.css'
const Footer = () =>  {
  return (
    <footer>
        <ul className="ul-footer">
            <li className='li-footer'><a href="https://github.com/stevencueto" target="_blank" className='footer-links'>Github</a> </li>
            <li className='li-footer'><a href="https://www.linkedin.com/in/stevencueto/" target="_blank" className='footer-links'>LinkedIn</a> </li>
            <li className='li-footer'><a href='https://www.stevencueto.com/' target="_blank" className='footer-links'>stevencueto.com</a> </li>
        </ul>
    </footer>
  )
}

export default Footer