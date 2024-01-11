import React, { Children } from 'react'
import "../styles/LayoutStyles.css"
import { adminMenu, userMenu } from '../Data/data'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { Badge } from 'antd'

const Layout = ({ children }) => {
    const { user } = useSelector(store => store.user)
    const location = useLocation()
    const navigate = useNavigate()

    // handle logout
    const handleLogout = () => {
        localStorage.clear()
        navigate('/login')
        toast.success("Logout Successfully")
    }

    // render the menu list
    const sidebarMenu = user?.isAdmin ? adminMenu : userMenu
    return (
        <div className='main'>
            <div className='layout'>
                <div className='sidebar'>
                    <div className='doc-app'>DOC APP</div>
                    <div className='menu'>
                        {sidebarMenu.map((menu => {
                            const isActive = location.pathname === menu.path
                            return (
                                <>
                                    <div className={`menu-items ${isActive && `active`}`}>
                                        <i key={menu.id} className={menu.icon}></i>
                                        <Link to={menu.path}>{menu.name}</Link>
                                    </div>
                                </>
                            )
                        }))}
                        <div className={`menu-items`}>
                            <i className='fa-solid fa-right-from-bracket'></i>
                            <Link to={'/login'} onClick={handleLogout}>Logout</Link>
                        </div>
                    </div>
                </div>
                <div className='content'>
                    <div className='headers'>
                        <div className='badge'>
                            <Badge count={user && user.notification.length} onClick={()=> navigate('/notification')} style={{cursor:'pointer'}}>
                            </Badge>
                        </div>
                        <i className="fa-solid fa-user-tie"></i>
                        <Link to={'/profile'}>{user?.name}</Link>
                    </div>
                    <div className='body'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout
