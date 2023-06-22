import React from 'react'

function Navbar() {
  return (
    <div>
         <nav className="navbar  bg-body-tertiary  navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <h1><a className="navbar-brand" href="/">
            HOME
          </a></h1>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/Manufacturer"
                  
                >
                  Manufacturer
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/Distributer"
                >
                  Distributer
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/Prescriber"
                >
                  Prescriber
                </a>
              </li>
            </ul>

          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar