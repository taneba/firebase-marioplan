import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { firestore } from 'firebase'
import { formatDistance } from 'date-fns'

const ProjectDetail = props => {
  const { project } = props
  if (project) {
    return (
      <div className="container section prooject-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{project.title}</span>
            <p>{project.content}</p>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>
              Posted by {project.authorFirstName} {project.authorLastName}
            </div>
            <div>
              {formatDistance(project.createdAt.toDate(), new Date())} ago
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="container center">
        <p>Loading project...</p>
      </div>
    )
  }
}

export default compose(
  connect((state, ownProps) => {
    const id = ownProps.match.params.id
    const projects = state.firestore.data.projects
    const project = projects ? projects[id] : null
    return { project }
  }),
  firestoreConnect([{ collection: 'projects' }])
)(ProjectDetail)
