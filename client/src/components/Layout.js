import React, { Children } from 'react'
import "../styles/LayoutStyles.css"
import sidebarMenu from '../Data/data'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Layout = ({ children }) => {
    const { user } = useSelector(store => store.user)
    const location = useLocation()
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
                    </div>
                </div>
                <div className='content'>
                    <div className='headers'>
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
