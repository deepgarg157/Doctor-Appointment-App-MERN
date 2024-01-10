import { Form, Input } from 'antd'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import {showLoading, hideLoading} from '../Utility/alertSlice'

const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading())
      const res = await axios.post('/api/v1/user/login', values)
      dispatch(hideLoading())
      if (res.data.success) {
        localStorage.setItem('token', res.data.token)
        toast.success(res.data.message)
        navigate('/')
      }
      else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className='form-container'>
        <Form layout='vertical' onFinish={onFinishHandler} className='register-form'>
          <h1 className='header'>Login Form</h1>
          <Form.Item className='form-label' label="Email" name='email'>
            <Input type="email" placeholder='Enter the email' required />
          </Form.Item>
          <Form.Item className='form-label' label="Password" name='password'>
            <Input type="password" placeholder='Enter the password' required />
          </Form.Item>
          <Link to={'/register'}><p>Create new account? Register Here</p></Link>
          <button className='btn btn-primary' type='submit'>Login</button>
        </Form>
      </div>
    </>
  )
}

export default Login
