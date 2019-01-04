import React from 'react'
import { formatDistance } from 'date-fns'

const ProjectSummary = ({ project }) => {
  console.log(project)
  return (
    <div className="card z-depth-0 project-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title">{project.title}</span>
        <p>Posted by the Net Ninja</p>
        <p className="grey-text">
          {formatDistance(project.createdAt.toDate(), new Date())} ago
        </p>
      </div>
    </div>
  )
}

export default ProjectSummary
