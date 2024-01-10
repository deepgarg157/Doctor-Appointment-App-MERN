import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading, hideLoading } from '../Utility/alertSlice'
import { getData } from '../Utility/userSlice'

const ProtectedRoute = ({ children }) => {

   const dispatch = useDispatch()
   const { user } = useSelector(store => store.user)

   const getUser = async () => {
      try {
         dispatch(showLoading())
         const res = await axios.post('/api/v1/user/getUserData', 
         {
            token: localStorage.getItem('token')
         },
            {
               headers: {
                  Authorization: "Bearer" + " " + localStorage.getItem('token')
               }
            }
         )
         dispatch(hideLoading())
         if (res.data.success) {
            dispatch(getData(res.data.data))
         }
         else{
            <Navigate to={'/login'} />
            localStorage.clear()
         }
      } catch (error) {
         console.log(error)
         localStorage.clear()
         dispatch(hideLoading())
      }
   }

   useEffect(() => {
      if (!user) {
         getUser()
      }
   }, [user, getUser])

   if (localStorage.getItem("token")) {
      return children
   }
   else {
      return <Navigate to={"/login"} />
   }
}

export default ProtectedRoute