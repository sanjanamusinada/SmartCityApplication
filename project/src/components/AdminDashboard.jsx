import { useState } from 'react'
import '../styles/Dashboard.css'
import { publicServices, infrastructure, amenities, issueReports, feedbackList } from '../data/cityData'

const AdminDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('services')
  const [services, setServices] = useState(publicServices)
  const [infra, setInfra] = useState(infrastructure)
  const [amen, setAmen] = useState(amenities)
  const [issues, setIssues] = useState(issueReports)
  const [feedback, setFeedback] = useState(feedbackList)

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Smart City Admin Portal</h1>
          <div className="user-section">
            <span className="user-name">Admin: {user.username}</span>
            <button onClick={onLogout} className="logout-button">Logout</button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <nav className="dashboard-nav">
          <button
            className={activeTab === 'services' ? 'active' : ''}
            onClick={() => setActiveTab('services')}
          >
            Public Services ({services.length})
          </button>
          <button
            className={activeTab === 'infrastructure' ? 'active' : ''}
            onClick={() => setActiveTab('infrastructure')}
          >
            Infrastructure ({infra.length})
          </button>
          <button
            className={activeTab === 'amenities' ? 'active' : ''}
            onClick={() => setActiveTab('amenities')}
          >
            Amenities ({amen.length})
          </button>
          <button
            className={activeTab === 'issues' ? 'active' : ''}
            onClick={() => setActiveTab('issues')}
          >
            Issue Reports ({issues.length})
          </button>
          <button
            className={activeTab === 'feedback' ? 'active' : ''}
            onClick={() => setActiveTab('feedback')}
          >
            Feedback ({feedback.length})
          </button>
        </nav>

        <div className="dashboard-main">
          {activeTab === 'services' && (
            <div className="content-section">
              <div className="section-header">
                <h2>Public Services</h2>
              </div>
              <div className="card-grid">
                {services.map(service => (
                  <div key={service.id} className="info-card">
                    <div className="card-header">
                      <h3>{service.name}</h3>
                      <span className="badge">{service.category}</span>
                    </div>
                    <div className="card-body">
                      <p className="description">{service.description}</p>
                      <div className="info-row">
                        <strong>Address:</strong> {service.address}
                      </div>
                      <div className="info-row">
                        <strong>Phone:</strong> {service.phone}
                      </div>
                      <div className="info-row">
                        <strong>Hours:</strong> {service.hours}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'infrastructure' && (
            <div className="content-section">
              <div className="section-header">
                <h2>Infrastructure</h2>
              </div>
              <div className="card-grid">
                {infra.map(item => (
                  <div key={item.id} className="info-card">
                    <div className="card-header">
                      <h3>{item.name}</h3>
                      <span className={`badge ${item.status === 'Operational' ? 'badge-success' : 'badge-warning'}`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="card-body">
                      <p className="description">{item.description}</p>
                      <div className="info-row">
                        <strong>Type:</strong> {item.type}
                      </div>
                      <div className="info-row">
                        <strong>Capacity:</strong> {item.capacity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'amenities' && (
            <div className="content-section">
              <div className="section-header">
                <h2>Amenities</h2>
              </div>
              <div className="card-grid">
                {amen.map(amenity => (
                  <div key={amenity.id} className="info-card">
                    <div className="card-header">
                      <h3>{amenity.name}</h3>
                      <span className="badge">{amenity.type}</span>
                    </div>
                    <div className="card-body">
                      <p className="description">{amenity.description}</p>
                      <div className="info-row">
                        <strong>Location:</strong> {amenity.location}
                      </div>
                      <div className="info-row">
                        <strong>Features:</strong> {amenity.features}
                      </div>
                      <div className="info-row">
                        <strong>Hours:</strong> {amenity.hours}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'issues' && (
            <div className="content-section">
              <div className="section-header">
                <h2>Issue Reports</h2>
              </div>
              {issues.length === 0 ? (
                <div className="empty-state">
                  <p>No issue reports at the moment</p>
                </div>
              ) : (
                <div className="list-view">
                  {issues.map(issue => (
                    <div key={issue.id} className="list-item">
                      <h3>{issue.title}</h3>
                      <p>{issue.description}</p>
                      <span className="timestamp">{issue.date}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'feedback' && (
            <div className="content-section">
              <div className="section-header">
                <h2>User Feedback</h2>
              </div>
              {feedback.length === 0 ? (
                <div className="empty-state">
                  <p>No feedback received yet</p>
                </div>
              ) : (
                <div className="list-view">
                  {feedback.map(item => (
                    <div key={item.id} className="list-item">
                      <h3>{item.amenity}</h3>
                      <p>{item.comment}</p>
                      <div className="rating">Rating: {item.rating}/5</div>
                      <span className="timestamp">{item.date}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
