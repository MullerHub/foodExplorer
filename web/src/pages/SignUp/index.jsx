import { Container, Form } from './style'
import logo from '../../assets/logo.svg'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { api } from '../../services/api'
import { getReactToastify, oTiposToastify } from '../../methods/toastify'

export function SignUp() {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const navigate = useNavigate()

  function handleSignUp() {
    if (!name || !email || !password) {
      return getReactToastify(
        oTiposToastify.TIPO_ALERT,
        'Por favor, preenche todos os campos !'
      )
    }

    if (!emailRegex.test(email)) {
      return getReactToastify(
        oTiposToastify.TIPO_ALERT,
        'Preencha um email válido!'
      )
    }

    api
      .post('/users', { name, email, password })
      .then(() => {
        getReactToastify(
          oTiposToastify.TIPO_SUCCESS,
          'Usuário cadastrado com sucesso'
        )
        navigate('/')
      })
      .catch(error => {
        getReactToastify(
          oTiposToastify.TIPO_ERROR,
          'Não foi possível cadastrar este usuário'
        )
      })
  }

  return (
    <Container>
      <main>
        <div className="content-logo">
          <img src={logo} alt="logo foodexplorer" />
        </div>
        <div className="content-login">
          <Form>
            <h1>Crie sua conta</h1>
            <p htmlFor="">Seu nome</p>
            <Input
              placeholder="Exemplo: João de Souza"
              type="text"
              onChange={e => setName(e.target.value)}
            />
            <p htmlFor="">Email</p>
            <Input
              placeholder="Exemplo: exemplo@exemplo.com"
              type="text"
              onChange={e => setEmail(e.target.value)}
            />
            <p>Senha</p>
            <Input
              placeholder="No mínimo 6 caracteres"
              type="password"
              onChange={e => setPassword(e.target.value)}
            />

            <Button title="Criar Conta" onClick={handleSignUp} />

            <Link to="/">Já tenho uma conta</Link>
          </Form>
        </div>
      </main>
    </Container>
  )
}
