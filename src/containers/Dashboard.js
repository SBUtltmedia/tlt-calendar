import { Component } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import UserTitle from '../components/UserTitle'
import styles from './Dashboard.scss'

function menuItem(text, link) {
  return (
    <LinkContainer to={{ pathname: link}}>
      <Button>{text}</Button>
    </LinkContainer>
  )
}

function renderAdmin(user) {  
  return <div>
    {menuItem('Edit available shift slots', '/slots')}
    {menuItem('Edit generated schedule', '/schedules')}
    {menuItem('Employee hour preferences', '/preferences/')}
  </div>
}

function renderSiteManager(user) {
  return <div>
    {menuItem('Update hour preferences', `/preferences/${user.netId}`)}
    {menuItem('View generated schedule', '/schedules')}
  </div>
}

function renderEmployee(user) {
  return <div>
    {menuItem('Update hour preferences', `/preferences/${user.netId}`)}
    {menuItem('Edit generated schedule', '/schedules')}
  </div>
}

const Dashboard = ({user}) => (
  <div className={styles.container}>
    <UserTitle />
    <div className='menu'>
      { user ? (user.isAdmin ? renderAdmin(user) : renderEmployee(user)) : '' }
    </div>
  </div>
)

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard)
