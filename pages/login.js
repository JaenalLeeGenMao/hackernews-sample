import { useState } from 'react'
import Link from 'next/link'
import jwt from 'jsonwebtoken'

import { setCookie } from '../pages/lib/cookieUtil'

export default function Login() {
    const [loginUsername, setLoginUsername] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [createUsername, setCreateUsername] = useState('')
    const [createPassword, setCreatePassword] = useState('')

    const _loginSubmit = (e) => {
        e.preventDefault()
        if (localStorage.getItem(loginUsername)) {
            if (localStorage.getItem(loginUsername) !== loginPassword) {
                alert('Credential does not match')
            } else {
                const signed = jwt.sign({
                    username: loginUsername,
                    password: loginPassword
                }, 'privateKey', { algorithm: 'HS256' })

                /** user logged in by default set to 7 days */
                setCookie('_at', signed, 7)
                window.location.href = "/"
            }
        } else {
            alert('Account does not exist, create an account first')
        }
    }

    const _createSubmit = (e) => {
        e.preventDefault()
        /**
         * If real usecase should check if account existed, we use Localstorage for simple usecases
         */
        if (localStorage.getItem(createUsername)) {
            alert('Account already exist')
        } else {
            localStorage.setItem(createUsername, createPassword)
        }
    }
    return <div>
        <div >
            <h4>Login</h4>
            <div>
                <label>username: </label>
                <input type="text" onChange={e => setLoginUsername(e.target.value)}></input>
            </div>
            <div>
                <label>password: </label>
                <input type="password" onChange={e => setLoginPassword(e.target.value)}></input>
            </div>
            <button onClick={_loginSubmit} type="submit">login</button>
        </div>
        <Link href="/forgot">Forgot your password?</Link>
        <div>
            <h4>Create Account</h4>
            <div>
                <label>username: </label>
                <input type="text" onChange={e => setCreateUsername(e.target.value)}></input>
            </div>
            <div>
                <label>password: </label>
                <input type="password" onChange={e => setCreatePassword(e.target.value)}></input>
            </div>
            <button onClick={_createSubmit} type="submit">create account</button>
        </div>
    </div>
}