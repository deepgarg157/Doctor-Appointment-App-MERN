import React, { useEffect } from 'react'
import axios from 'axios'
import Layout from '../components/Layout'

const HomePage = () => {

  // login user data

  const getUserData = async () => {
    try {
      await axios.post('/api/v1/user/getUserData', {}, {
        headers: {
          Authorization: "Bearer" + " " + localStorage.getItem('token')
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserData()
  }, [])
  return (
    <div>
      <Layout>
        HomePage
      </Layout>
    </div>
  )
}

export default HomePage
