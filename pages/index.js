import { useState, useEffect, useCallback } from "react"
import Head from 'next/head'
import Card from '../components/card'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import Modal from 'react-responsive-modal'
import { fetchWithTimeout }  from './lib/fetchWithTimeout'

import { getCookie } from '../pages/lib/cookieUtil'
import 'react-responsive-modal/styles.css';
import styles from '../styles/Home.module.css'

export default function Home({ count, next, previous, results, types, ...props }) {

  const [total, setTotal] = useState(0)
  const [nextUrl, setNextUrl] = useState(null)
  const [prevUrl, setPrevUrl] = useState(null)
  const [pokemon, setPokemon] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [pokeStage, setPokeStage] = useState([])

  const API_BASE_URL = 'https://pokeapi.co/api/v2'

  useEffect(() => {
    _updatePokemon(count, next, previous, results)
  }, [])

  const _updatePokemon = (t, n, p, r) => {
    setTotal(t)
    setNextUrl(n)
    setPrevUrl(p)
    setPokemon(r)
  }

  const _fetchPokemon = async (url) => {
    if (!url) return
    const API_URL = url || `${API_BASE_URL}/pokemon`

    const response = await fetchWithTimeout(API_URL, { timeout: 10 * 1000 })
    const result = await response.json()

    if (result) {
      _updatePokemon(result.count, result.next, result.previous, result.results)
    }
  }

  const _updateFilter = async (url) => {
    if (!url) {
      _fetchPokemon(`${API_BASE_URL}/pokemon`)
      return
    }
    const response = await fetchWithTimeout(`${url}`, { timeout: 10 * 1000 })
    const result = await response.json()

    if (result) {
      _updatePokemon(result.pokemon.length, null, null, result.pokemon.map(p => p.pokemon))
    }
  }

  const openModal = async (p) => {
    const API_URL = `${API_BASE_URL}/pokemon/${p.name}`
    const response = await fetchWithTimeout(API_URL, { timeout: 10 * 1000 })
    const result = await response.json()
    if (result) {
      setPokeStage([...pokeStage, result])
    }
    setIsOpen(true)
  }

  return (
    <>
    <div className={styles.container}>
      <div>
        {pokemon && pokemon.map(p => (
          <div key={JSON.stringify(p)} onClick={() => openModal(p)}>{p.name}</div>
        ))}
        <label htmlFor="types">Choose a filter:</label>
        <select name="types" id="types" onChange={(e) => _updateFilter(e.target.value)}>
          <option value=''>None</option>
          {types.map((t) => (
            <option key={JSON.stringify(t)} value={t.url}>{t.name}</option>
          ))}
        </select>
      </div>
      <b>{total}</b>
      <button
        className={[styles.primaryButton , previous ? '' : styles.disabled].join(' ')}
        disabled={prevUrl === null}
        onClick={() => _fetchPokemon(prevUrl)}
      >prev</button>
      <button
        className={[styles.primaryButton , next ? '' : styles.disabled].join(' ')}
        disabled={nextUrl === null}
        onClick={() => _fetchPokemon(nextUrl)}
      >next</button>
    </div>
    <Modal open={isOpen} onClose={() => {
      setIsOpen(false)
      setPokeStage([])
      }} center>
      <div style={{ width: '600px', height: '480px' }}>
        {pokeStage.length > 0 && pokeStage.map(eachContender => (
          <div style={{ marginBottom: '20px' }}>
            Name: {eachContender.name}
            <br />
            Abilities: {eachContender.abilities.map(c => !c.ability.is_hidden && c.ability.name).join(', ')}
            <br />
            Stats: {eachContender.stats.map(c => `${c.stat.name} ${c.base_stat}`).join(', ')}
            <br />
            Types: {eachContender.types.map(c => c.type.name).join(', ')}
          </div>
        ))}

        {pokeStage.length < 2 && (
          <select name="nextContender" id="nextContender" onChange={(e) => openModal(JSON.parse(e.target.value))}>
            <option value=''>None</option>
            {pokemon.map((t) => (
              <option key={JSON.stringify(t)} value={JSON.stringify(t)}>{t.name}</option>
            ))}
          </select>
        )}
        {pokeStage.length === 2 && (
        <>
          <button onClick={() => {
            if (pokeStage[0].base_experience === pokeStage[1].base_experience) alert("DRAW")
            else if (pokeStage[0].base_experience > pokeStage[1].base_experience) alert(`${pokeStage[0].name} WIN`)
            else alert(`${pokeStage[1].name} WIN`)
          }}>versus</button>
          <button onClick={() => setPokeStage([pokeStage[0]])}>reset</button>
        </>
        )}
      </div>
    </Modal>
    </>
  )
}

// This gets called on every request
export async function getServerSideProps(ctx) {
  const API_BASE_URL = 'https://pokeapi.co/api/v2'

  // Fetch data from external API
  const response = await fetchWithTimeout(`${API_BASE_URL}/pokemon`, { timeout: 10 * 1000 })
  const result = await response.json()

  const responseType = await fetchWithTimeout(`${API_BASE_URL}/type`, { timeout: 10 * 1000 })
  const resultType = await responseType.json()

  return { props: { ...result, types: resultType.results } }
}