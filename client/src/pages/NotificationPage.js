import React from 'react'
import Layout from '../components/Layout'
import { Tabs } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { showLoading, hideLoading } from '../Utility/alertSlice'
import axios from 'axios'

const NotificationPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(store => store.user)

  // mark all read notification funtion
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading())
      const res = await axios.post('/api/v1/user/get-all-notification', { userId: user._id },
        {
          headers: {
            Authorization: "Bearer" + " " + localStorage.getItem('token')
          }
        })
      dispatch(hideLoading())
      if (res.data.success) {
        toast.success(res.data.message)
        navigate('/')
        window.location.reload()
      }
      else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      dispatch(hideLoading())
      toast.error('Something went wrong')
    }
  }

  // delete notification 
  const handleDeleteAllRead = async () => {
try {
  dispatch(showLoading())
      const res = await axios.post('/api/v1/user/delete-all-notification', { userId: user._id },
        {
          headers: {
            Authorization: "Bearer" + " " + localStorage.getItem('token')
          }
        })
      dispatch(hideLoading())
      if (res.data.success) {
        toast.success(res.data.message)
        navigate('/')
        window.location.reload()
      }
      else {
        toast.error(res.data.message)
      }
} catch (error) {
  console.log(error)
      dispatch(hideLoading())
      toast.error('Something went wrong')
}
  }
  return (

    <Layout>
      <div className=''>
        <h4 className='text-center'>Notification Page</h4>
        <Tabs>
          <Tabs.TabPane tab='Unread' key={0} style={{ fontSize: '15px' }}>
            <div className='d-flex justify-content-end'>
              <h4 className='p-2' style={{cursor:'pointer'}} onClick={handleMarkAllRead}>
                Mark all read
              </h4>
            </div>
            {
              user?.notification.map(data => {
                return (
                  <div className='card' onClick={navigate(data?.onClickPath)}>
                    <div className='card-item' >
                      {data?.message}
                    </div>
                  </div>
                )
              })
            }
          </Tabs.TabPane>
          <Tabs.TabPane tab='Read' key={1} style={{ fontSize: '15px' }}>
            <div className='d-flex justify-content-end'>
              <h4 className='p-2' style={{cursor:"pointer"}} onClick={handleDeleteAllRead}>
                Delete all read
              </h4>
            </div>
            {
              user?.seenNotification.map(data => {
                return (
                  <div className='card' onClick={navigate(data?.onClickPath)}>
                    <div className='card-item' >
                      {data?.message}
                    </div>
                  </div>
                )
              })
            }
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Layout>
  )
}

export default NotificationPage
