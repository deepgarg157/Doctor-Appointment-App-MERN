import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Table } from 'antd'

const Doctors = () => {
  const [doctorsData, setDoctorsData] = useState([])

  const getDoctorsData = async () => {
    try {
      const res = await axios.get('/api/v1/admin/getAllDoctors', {
        headers: {
          Authorization: "Bearer" + " " + localStorage.getItem('token')
        }
      })
      if (res.data.success) {
        setDoctorsData(res.data.data)
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }

  }

  useEffect(() => {
    const timer = setTimeout(() => {
      getDoctorsData()
    }, 1000)

  }, [])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render:(text, record)=>{
        return(
          <span>{record.firstName} {record.lastName}</span>
        )
      }
    },
    {
      title: 'Status',
      dataIndex: 'status'
    },
    {
      title: 'Phone',
      dataIndex: 'phone'
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => {
        return (
          <div className='d-flex'>
            {record.status === 'pending' ? <button className='btn btn-primary'>Approve</button> : <button className='btn btn-danger'>Reject</button>}
          </div>
        )

      }
    }
  ]
  return (
    <Layout>
      <h4 className='text-center'>Doctors</h4>
      <div className='m-3'>
        <Table columns={columns} dataSource={doctorsData} />
      </div>
    </Layout>
  )
}

export default Doctors

