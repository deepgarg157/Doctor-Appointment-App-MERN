import React from 'react'
import { Form, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/RegisterStyles.css'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {showLoading, hideLoading} from '../Utility/alertSlice'

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading())
      const res = await axios.post('/api/v1/user/register', values)
      dispatch(hideLoading())
      if (res.data.success) {
        toast.success(res.data.message)
        navigate('/login')
      }
      else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      dispatch(hideLoading())
    }
  }
  return (
    <>
      <div className='form-container'>
        <Form layout='vertical' onFinish={onFinishHandler} className='register-form'>
          <h1 className='header'>Register Form</h1>
          <Form.Item className='form-label' label="Name" name='name'>
            <Input type="text" placeholder='Enter the name' required />
          </Form.Item>
          <Form.Item className='form-label' label="Email" name='email'>
            <Input type="email" placeholder='Enter the email' required />
          </Form.Item>
          <Form.Item className='form-label' label="Password" name='password'>
            <Input type="password" placeholder='Enter the password' required />
          </Form.Item>
          <Link to={'/login'}><p>Already have an account? Login Here</p></Link>
          <button className='btn btn-primary' type='submit'>Register</button>
        </Form>
      </div>
    </>
  )
}

export default Register
