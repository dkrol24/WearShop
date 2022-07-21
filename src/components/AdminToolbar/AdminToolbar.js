import React from 'react'
import './styles.scss'
import { Link } from 'react-router-dom'

const mapState = ({ user }) => ({
  
})

const AdminToolbar = () => {
  return (
    <div className='adminToolbar'>
        <ul>
            <li>
                <Link to="/admin">
                 Admin Panel
                </Link>
            </li>
        </ul>
    </div>
  )
}

export default AdminToolbar