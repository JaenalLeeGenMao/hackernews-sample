import { useState, useEffect } from "react"
import Head from 'next/head'
import Link from 'next/link'
import distanceInWordsToNow from 'date-fns/formatDistanceToNow'

import { headerLists, footerLists } from './state'

import styles from '../styles/Home.module.css'

const Card = (props) => {
  const by = props?.by ?? ''
  const descendants = props?.descendants ?? ''
  const itemId = props?.itemId ?? ''
  const kids = props?.kids ?? ''
  const score = props?.score ?? ''
  const time = props?.time ?? ''
  const title = props?.title ?? ''
  const type = props?.type ?? ''
  const url = props?.url ?? ''

  const pattern = /^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i
  const hostname = url.match(pattern)
  return (
    <Link href={url} key={itemId}>
      <div className={styles.card}>
        <div>
          <tag href={url}>{title} </tag>
          <a href={`https://news.ycombinator.com/from?site=${hostname && hostname[1]}`}>({hostname && hostname[1]}) </a>
        </div>
        <div>
          <p>Score {score} by <a href={`https://news.ycombinator.com/user?id=${by}`}>{by}</a> <a href={`https://news.ycombinator.com/item?id=${itemId}`}>{distanceInWordsToNow(new Date(time * 1000))} ago </a> | <a href={`https://news.ycombinator.com/hide?id=${itemId}&goto=news`}>hide</a> | <a>{kids.length > 0 ? `${kids.length} comments` : 'discuss'} </a></p>
        </div>
      </div>
    </Link>
  )
}

export default function Home({ startPosition, topStories, ...props }) {
  const [posts, setPosts] = useState([])

  useEffect(async () => {
    const promises = topStories
      .slice(startPosition * 30, startPosition + 1 * 30)
      .map(id =>
        fetch(`http://localhost:3000/api/hackernews/item?id=${id}`).then(
          response => response.json()
        )
      );
    const result = await Promise.all(promises);
    setPosts(result);
  })

  const _handleSearchSubmit = (e) => {
    const inputEl = document.getElementById("searchInput")

    if (e.key === 'Enter' || e.keyCode === 13) {
      window.location.href = `https://hn.algolia.com/?q=${inputEl.value}`
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <Link href="/" passHref>
          <a href="/">
            <img className={styles.border} src="https://news.ycombinator.com/y18.gif" />
          </a>
        </Link>
        <Link href="/news" passHref>
          <b style={{ margin: "0 4px" }}>
            <a>Hacker News</a>
          </b>
        </Link>
        {headerLists.map((eachHL, indexHL) => {
          return (
            <>
            <Link href={eachHL.href} passHref>
              <a>{eachHL.label}</a>
            </Link>
            {headerLists.length - 1 > indexHL && " | "}
            </>
          )
        })}
      </header>
      <main>
        {posts.length > 0 && posts.map((eachPost, ei) => {
          return (
            <div className={styles.cardWrapper}>
              <p className={styles.countNumber}>{startPosition * 30 + ei + 1}</p>
              <Card {...eachPost} />
            </div>
          )
        })}
      </main>
      <footer className={styles.footer}>
        <hr className={styles.lineBreak} />
        <div className={styles.miniSection}>
          {footerLists.map((eachFL, indexFL) => {
            return (
              <>
              <Link href={eachFL.href} passHref>
                <a>{eachFL.label}</a>
              </Link>
              {footerLists.length - 1 > indexFL && " | "}
              </>
            )
          })}
        </div>
        <div className={styles.miniSection}>
          Search: <input id="searchInput" onKeyUp={_handleSearchSubmit}></input>
        </div>
      </footer>
    </div>
  )
}

// This gets called on every request
export async function getServerSideProps(ctx) {
  const startPosition = ctx?.query?.p ?? 1
  // Fetch data from external API
  const resTS = await fetch('http://localhost:3000/api/hackernews/topstories')
  const topStories = await resTS.json()

  if (!topStories) {
    return { props: { topStories: [], startPosition: startPosition - 1 } }
  }

  // Pass data to the page via props
  return { props: { topStories, startPosition: startPosition - 1 } }
}