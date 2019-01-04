import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../redux/modules/auth'

const SignedInLinks = props => (
  <ul className="right">
    <li>
      <NavLink to="/create">New Project</NavLink>
    </li>
    <li>
      <a onClick={props.signOut}>Log Out</a>
    </li>
    <li>
      <NavLink to="/" className="btn btn-floating pink lighten-1">
        {props.profile.initials}
      </NavLink>
    </li>
  </ul>
)

export default connect(
  null,
  dispatch => ({
    signOut: () => dispatch(signOut()),
  })
)(SignedInLinks)
