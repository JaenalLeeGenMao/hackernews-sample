import React from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types';
import { headerLists } from './state'
import navbarStyles from './navbar.module.css';

/**
 * Primary UI component for user interaction
 */
const Navbar = ({ color, backgroundColor, title, ...props }) => {
    const customStyle = {
        backgroundColor,
        color
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
  title: PropTypes.string
};

Navbar.defaultProps = {
    color: '#000000',
    backgroundColor: '#ff6600',
    title : 'Hacker News'
};

export default Navbar