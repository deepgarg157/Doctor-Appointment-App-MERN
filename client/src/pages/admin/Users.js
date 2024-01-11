import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../../Utility/alertSlice'
import { toast } from 'react-hot-toast'
import { Table } from 'antd'

const Users = () => {
  const [usersData, setUsersData] = useState([])

  const getUserData = async () => {
    try {
      const res = await axios.get('/api/v1/admin/getAllUsers', {
        headers: {
          Authorization: "Bearer" + " " + localStorage.getItem('token')
        }
      })
      if (res.data.success) {
        setUsersData(res.data.data)
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }

  }

  useEffect(() => {
    const timer = setTimeout(() => {
      getUserData()
    }, 1000)

  }, [])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Doctors',
      dataIndex: 'isDoctor',
      render: (text, record) => {
        return (

          <span>{record.isDoctor ? 'Yes' : 'NO'}</span>
        )
      }
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => {
        return (
          <div className='d-flex'>
            <button className='btn btn-danger'>Block</button>
          </div>
        )

      }
    }
  ]
  return (
    <Layout>
      <h4 className='text-center'>User List</h4>
      <div className='m-3'>
      <Table columns={columns} dataSource={usersData} />
      </div>
    </Layout>
  )
}

export default Users
      
