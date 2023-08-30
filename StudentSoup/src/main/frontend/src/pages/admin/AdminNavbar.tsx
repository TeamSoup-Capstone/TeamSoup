import React, { useEffect, useRef, useState } from 'react';
import './adminnavbar.scss';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { DesktopHeader, Mobile, MobileHeader } from 'mediaQuery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

const AdminNavbar = () => {
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const handleClickMenu = (e: React.MouseEvent) => {
    e.stopPropagation();

    setIsMenuOpen(!isMenuOpen);
  };

  const searchRef = useRef<HTMLUListElement | null>(null);

  const onCheckClickOutside = (e: MouseEvent) => {
    if (isMenuOpen && searchRef.current && !searchRef.current.contains(e.target as Node)) {
      setIsMenuOpen(!isMenuOpen);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', onCheckClickOutside);

    return () => {
      document.removeEventListener('mousedown', onCheckClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <>
      <DesktopHeader>
        <nav className="navbar-items">
          <Link to="/" className="navbar-logo-links">
            <i className="navbar-logo">SOUP</i>
          </Link>
          <ul className="nav-menu">
            <li className="nav-li">
              <Link to="/admin" className="nav-links">
                <i>회원관리</i>
              </Link>
            </li>
            <li className="nav-li">
              <Link to="/admin/schools" className="nav-links">
                <i>학교관리</i>
              </Link>
            </li>
            <li className="nav-li">
              <Link to="/admin/departments" className="nav-links">
                <i>학과관리</i>
              </Link>
            </li>
            <li className="nav-li">
              <Link to="/admin/restaurant" className="nav-links">
                <i>음식점 추가</i>
              </Link>
            </li>
            <li className="nav-li">
              <Link to="/admin/restaurants" className="nav-links">
                <i>음식점 조회</i>
              </Link>
            </li>
            <li className="nav-li">
              <Link to="/admin/satisfaction" className="nav-links">
                <i>만족도 통계</i>
              </Link>
            </li>
          </ul>
        </nav>
      </DesktopHeader>
      <MobileHeader>
        <nav className="mobile-navbar-items">
          <Link to="/" className="navbar-logo-links">
            <i className="navbar-logo">SOUP</i>
          </Link>
          <div className="mobile-nav-menu">
            {isMenuOpen ? (
              <FontAwesomeIcon icon={faXmark} className="mobile-nav-menu-icon" />
            ) : (
              <FontAwesomeIcon
                icon={faBars}
                className="mobile-nav-menu-icon"
                onMouseDown={handleClickMenu}
              />
            )}
          </div>
          <ul
            ref={searchRef}
            className={isMenuOpen ? 'mobile-nav-menu-list active' : 'mobile-nav-menu-list'}
          >
            <li>
              <Link to="/admin" className="mobile-nav-link">
                <div className="mobile-nav-list">
                  <i className="mobile-nav-listItme">회원관리</i>
                  <FontAwesomeIcon icon={faAngleRight} className="mobile-nav-icons" />
                </div>
              </Link>
            </li>
            <li>
              <Link to="/admin/schools" className="mobile-nav-link">
                <div className="mobile-nav-list">
                  <i className="mobile-nav-listItme">학교관리</i>
                  <FontAwesomeIcon icon={faAngleRight} className="mobile-nav-icons" />
                </div>
              </Link>
            </li>
            <li>
              <Link to="/admin/departments" className="mobile-nav-link">
                <div className="mobile-nav-list">
                  <i className="mobile-nav-listItme">학과관리</i>
                  <FontAwesomeIcon icon={faAngleRight} className="mobile-nav-icons" />
                </div>
              </Link>
            </li>
            <li>
              <Link to="/admin/restaurant" className="mobile-nav-link">
                <div className="mobile-nav-list">
                  <i className="mobile-nav-listItme">음식점 추가</i>
                  <FontAwesomeIcon icon={faAngleRight} className="mobile-nav-icons" />
                </div>
              </Link>
            </li>
            <li>
              <Link to="/admin/restaurants" className="mobile-nav-link">
                <div className="mobile-nav-list">
                  <i className="mobile-nav-listItme">음식점 조회</i>
                  <FontAwesomeIcon icon={faAngleRight} className="mobile-nav-icons" />
                </div>
              </Link>
            </li>
            <li>
              <Link to="/admin/satisfaction" className="mobile-nav-link">
                <div className="mobile-nav-list">
                  <i className="mobile-nav-listItme">만족도 통계</i>
                  <FontAwesomeIcon icon={faAngleRight} className="mobile-nav-icons" />
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </MobileHeader>
      <Mobile>
        <nav className="mobile-navbar-items">
          <Link to="/" className="navbar-logo-links">
            <i className="navbar-logo">SOUP</i>
          </Link>
          <div className="mobile-nav-menu">
            {isMenuOpen ? (
              <FontAwesomeIcon icon={faXmark} className="mobile-nav-menu-icon" />
            ) : (
              <FontAwesomeIcon
                icon={faBars}
                className="mobile-nav-menu-icon"
                onMouseDown={handleClickMenu}
              />
            )}
          </div>
          <ul
            ref={searchRef}
            className={isMenuOpen ? 'mobile-nav-menu-list active' : 'mobile-nav-menu-list'}
          >
            <li>
              <Link to="/admin" className="mobile-nav-link">
                <div className="mobile-nav-list">
                  <i className="mobile-nav-listItme">회원관리</i>
                  <FontAwesomeIcon icon={faAngleRight} className="mobile-nav-icons" />
                </div>
              </Link>
            </li>
            <li>
              <Link to="/admin/schools" className="mobile-nav-link">
                <div className="mobile-nav-list">
                  <i className="mobile-nav-listItme">학교관리</i>
                  <FontAwesomeIcon icon={faAngleRight} className="mobile-nav-icons" />
                </div>
              </Link>
            </li>
            <li>
              <Link to="/admin/departments" className="mobile-nav-link">
                <div className="mobile-nav-list">
                  <i className="mobile-nav-listItme">학과관리</i>
                  <FontAwesomeIcon icon={faAngleRight} className="mobile-nav-icons" />
                </div>
              </Link>
            </li>
            <li>
              <Link to="/admin/restaurant" className="mobile-nav-link">
                <div className="mobile-nav-list">
                  <i className="mobile-nav-listItme">음식점 추가</i>
                  <FontAwesomeIcon icon={faAngleRight} className="mobile-nav-icons" />
                </div>
              </Link>
            </li>
            <li>
              <Link to="/admin/restaurants" className="mobile-nav-link">
                <div className="mobile-nav-list">
                  <i className="mobile-nav-listItme">음식점 조회</i>
                  <FontAwesomeIcon icon={faAngleRight} className="mobile-nav-icons" />
                </div>
              </Link>
            </li>
            <li>
              <Link to="/admin/satisfaction" className="mobile-nav-link">
                <div className="mobile-nav-list">
                  <i className="mobile-nav-listItme">만족도 통계</i>
                  <FontAwesomeIcon icon={faAngleRight} className="mobile-nav-icons" />
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </Mobile>
      <Outlet />
    </>
  );
};

export default AdminNavbar;
