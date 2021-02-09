import React from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types';

import footerStyles from './footer.module.css';

const Footer = ({ lists, onSubmit, ...props }) => {
    const _handleSearchSubmit = (e) => {
        if (onSubmit) {
            onSubmit(e)
        } else {
            const inputEl = document.getElementById("searchInput")

            if (e.key === 'Enter' || e.keyCode === 13) {
                window.location.href = `https://hn.algolia.com/?q=${inputEl.value}`
            }
        }
    }

    return (
        <footer className={footerStyles.footer}>
            <hr className={footerStyles.lineBreak} />
            <div className={footerStyles.miniSection}>
                {lists.map((eachFL, indexFL) => {
                return (
                    <Link key={indexFL} href={eachFL.href} passHref>
                        <a>{eachFL.label}{lists.length - 1 > indexFL && " | "}</a>
                    </Link>
                )
                })}
            </div>
            <div className={footerStyles.miniSection}>
                Search: <input id="searchInput" onKeyUp={_handleSearchSubmit}></input>
            </div>
        </footer>
    )
}

Footer.propTypes = {
    /**
     * What are the essential list of references on footer
     */
    lists: PropTypes.arrayOf(PropTypes.object),
    /**
     * What should the search onEnter do
     */
    onSubmit: PropTypes.func
};

Footer.defaultProps = {
    lists: [{
        label: "Guidelines",
        href: "https://news.ycombinator.com/newsguidelines.html"
    },
    {
        label: "FAQ",
        href: "https://news.ycombinator.com/newsfaq.html"
    },
    {
        label: "Lists",
        href: "/lists" // threads?id=jaejaejae
    },
    {
        label: "API",
        href: "https://github.com/HackerNews/API"
    },
    {
        label: "Security",
        href: "https://news.ycombinator.com/security.html"
    },
    {
        label: "Legal",
        href: "http://www.ycombinator.com/legal/"
    },
    {
        label: "Apply to YC",
        href: "http://www.ycombinator.com/apply/"
    },
    {
        label: "Contact",
        href: "mailto:hn@ycombinator.com"
    }],
    onSubmit: undefined
};

export default Footer