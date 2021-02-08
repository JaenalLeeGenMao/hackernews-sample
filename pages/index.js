import { useState, useEffect } from "react"
import Head from 'next/head'
import Link from 'next/link'
import Card from '../components/card'
import Navbar from '../components/navbar'

import { footerLists } from './state'

import styles from '../styles/Home.module.css'

export default function Home({ startPosition, topStories, ...props }) {
  const [posts, setPosts] = useState([])

  useEffect(async () => {
    const promises = topStories
      .slice(startPosition * 30, (startPosition + 1) * 30)
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
      <Navbar title="Hacker News"></Navbar>
      <main>
        {posts.length > 0 && posts.map((eachPost, indexPost) => {
          return (
            <div key={indexPost} className={styles.cardWrapper}>
              <p className={styles.countNumber}>{startPosition * 30 + indexPost + 1}</p>
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
              <Link key={indexFL} href={eachFL.href} passHref>
                  <a>{eachFL.label}{footerLists.length - 1 > indexFL && " | "}</a>
              </Link>
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