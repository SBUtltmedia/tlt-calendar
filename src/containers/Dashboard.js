import { Component } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import UserTitle from '../components/UserTitle'
import styles from './Dashboard.scss'

const schedulePage = 'https://apps.tlt.stonybrook.edu/sccal/algorithm/'

function internalMenuItem(text, link) {
  return (
    <LinkContainer to={{ pathname: link}}>
      <Button>{text}</Button>
    </LinkContainer>
  )
}

function externalMenuItem(text, link) {
  return (
    <a target='_blank' href={link}>
      <Button>{text}</Button>
    </a>
  )
}

function renderAdmin(user) {
  return <div>
    {externalMenuItem('Edit available shift slots', 'https://docs.google.com/spreadsheets/d/1XhlIbiZqh5vMQuM_vM5m6SdAE_8gpTObNtXUEP9_Yk8/edit#gid=581523198')}
    {externalMenuItem('Edit generated schedule', schedulePage)}
    {internalMenuItem('Employee hour preferences', '/preferences/')}
  </div>
}

function renderSiteManager(user) {
  return <div>
    {internalMenuItem('Update hour preferences', `/preferences/${user.netId}`)}
    {externalMenuItem('Edit generated schedule', schedulePage)}
  </div>
}

function renderEmployee(user) {
  return <div>
    {internalMenuItem('Update hour preferences', `/preferences/${user.netId}`)}
    {externalMenuItem('View generated schedule', schedulePage)}
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
