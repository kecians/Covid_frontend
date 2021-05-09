import React, { Component } from 'react'
import './Footer.scss'
import { Link } from 'react-router-dom'
export class Footer extends Component {
    render() {
        return (
          <footer className="footer container-fluid ">
                  <div className="dropdown-divider"></div>
                  <div className="row align-items-center justify-content-center p-1">
                    <h6>&copy;Copyright ©2020 All rights reserved</h6>
                  </div>
          </footer>
        )
    }
}

export default Footer
