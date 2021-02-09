import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken'
import { deleteCookie, getCookie } from '../../pages/lib/cookieUtil'

import { headerLists } from './state'

import navbarStyles from './navbar.module.css';

/**
 * Primary UI component for user interaction
 */
const Navbar = ({ color, backgroundColor, title, isLogin, ...props }) => {
    const [username, setUsername] = useState('')

    useEffect(() => {
        if (isLogin){
            const accessToken = getCookie('_at')
            const decoded = jwt.decode(accessToken)
            setUsername(decoded.username)
        }
    })

    const customStyle = {
        backgroundColor,
        color
    }
    const _onSubmit = () => {
        if (isLogin) {
            deleteCookie('_at')
            window.location.href = '/'
        } else {
            window.location.href = '/login'
        }
    }

    return (
        <header className={navbarStyles.header} style={customStyle}>
            <Link href="/" passHref>
                <a href="/">
                    <img className={navbarStyles.border} src="https://news.ycombinator.com/y18.gif" />
                </a>
            </Link>
            <Link href="/news" passHref>
            <b style={{ margin: "0 4px" }}>
                <a>{title}</a>
            </b>
            </Link>
            {headerLists.map((eachHL, indexHL) => {
            return (
                <Link key={indexHL} href={eachHL.href} passHref>
                    <a>{eachHL.label}{headerLists.length - 1 > indexHL && " | "}</a>
                </Link>
            )
            })}
            <div className={navbarStyles.loginSection} onClick={_onSubmit}>
                {isLogin && `${username} | `}
                {isLogin ? 'logout' : 'login'}
            </div>
        </header>
    );
};


Navbar.propTypes = {
  /**
   * What background color to use
   */
  color: PropTypes.string,
  /**
   * What text color to use
   */
  backgroundColor: PropTypes.string,
  /**
   * Which page is it on
   */
  title: PropTypes.string,
  /**
   * Has user logged in
   */
  isLogin: PropTypes.bool
};

Navbar.defaultProps = {
    color: '#000000',
    backgroundColor: '#ff6600',
    title : 'Hacker News',
    isLogin: false
};

export default React.memo(Navbar)