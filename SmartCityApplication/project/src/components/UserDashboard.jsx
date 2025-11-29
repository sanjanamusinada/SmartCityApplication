import { useState } from 'react'
import '../styles/Dashboard.css'
import Home from "./Home";

import { publicServices, infrastructure, amenities } from '../data/cityData'

const UserDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('home')
  const [searchTerm, setSearchTerm] = useState('')
  const [issueTitle, setIssueTitle] = useState('')
  const [issueDescription, setIssueDescription] = useState('')
  const [feedbackAmenity, setFeedbackAmenity] = useState('')
  const [feedbackRating, setFeedbackRating] = useState(5)
  const [feedbackComment, setFeedbackComment] = useState('')
  const [issues, setIssues] = useState([])
  const [feedback, setFeedback] = useState([])

  const filteredServices = publicServices.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredInfra = infrastructure.filter(i =>
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredAmenities = amenities.filter(a =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleReportIssue = (e) => {
    e.preventDefault()
    const newIssue = {
      id: Date.now(),
      title: issueTitle,
      description: issueDescription,
      date: new Date().toLocaleString()
    }
    setIssues([...issues, newIssue])
    setIssueTitle('')
    setIssueDescription('')
    alert('Issue reported successfully!')
  }

  const handleSubmitFeedback = (e) => {
    e.preventDefault()
    const newFeedback = {
      id: Date.now(),
      amenity: feedbackAmenity,
      rating: feedbackRating,
      comment: feedbackComment,
      date: new Date().toLocaleString()
    }
    setFeedback([...feedback, newFeedback])
    setFeedbackAmenity('')
    setFeedbackRating(5)
    setFeedbackComment('')
    alert('Feedback submitted successfully!')
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Smart City Portal</h1>
          <div className="user-section">
            <span className="user-name">User: {user.username}</span>
            <button onClick={onLogout} className="logout-button">Logout</button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <nav className="dashboard-nav">
          <button
            className={activeTab === 'home' ? 'active' : ''}
            onClick={() => setActiveTab('home')}
          >
            Home
          </button>
          <button
            className={activeTab === 'services' ? 'active' : ''}
            onClick={() => setActiveTab('services')}
          >
            Public Services
          </button>
          <button
            className={activeTab === 'infrastructure' ? 'active' : ''}
            onClick={() => setActiveTab('infrastructure')}
          >
            Infrastructure
          </button>
          <button
            className={activeTab === 'amenities' ? 'active' : ''}
            onClick={() => setActiveTab('amenities')}
          >
            Amenities
          </button>
          <button
            className={activeTab === 'report' ? 'active' : ''}
            onClick={() => setActiveTab('report')}
          >
            Report Issue
          </button>
          <button
            className={activeTab === 'feedback' ? 'active' : ''}
            onClick={() => setActiveTab('feedback')}
          >
            Give Feedback
          </button>
        </nav>

        <div className="dashboard-main">
          {activeTab === 'home' && (
  <div className="content-section">
    <h2>Welcome to the Smart City Portal</h2>
    <p className="home-description">
      Explore public services, city infrastructure, amenities, report issues, and give feedback — 
      everything you need to stay connected with your city.
    </p>

    <div className="home-grid">
      <div className="home-card">
        <h3>Public Services</h3>
        <p>Hospitals, police stations, fire stations, libraries, and more.</p>
      </div>

      <div className="home-card">
        <h3>Infrastructure</h3>
        <p>Roads, bridges, utilities, public transportation, and city systems.</p>
      </div>

      <div className="home-card">
        <h3>Amenities</h3>
        <p>Parks, gyms, community centers, sports facilities, and more.</p>
      </div>

      <div className="home-card">
        <h3>Report Issues</h3>
        <p>Quickly report public issues to city administrators.</p>
      </div>

      <div className="home-card">
        <h3>Give Feedback</h3>
        <p>Share your experience with services and amenities.</p>
      </div>
    </div>
  </div>
)}

          {activeTab === 'services' && (
            <div className="content-section">
              <div className="section-header">
                <h2>Public Services</h2>
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              <div className="card-grid">
                {filteredServices.map(service => (
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
                <input
                  type="text"
                  placeholder="Search infrastructure..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              <div className="card-grid">
                {filteredInfra.map(item => (
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
                <input
                  type="text"
                  placeholder="Search amenities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              <div className="card-grid">
                {filteredAmenities.map(amenity => (
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

          {activeTab === 'report' && (
            <div className="content-section">
              <div className="section-header">
                <h2>Report an Issue</h2>
              </div>
              <div className="form-container">
                <form onSubmit={handleReportIssue} className="report-form">
                  <div className="form-group">
                    <label htmlFor="issueTitle">Issue Title</label>
                    <input
                      type="text"
                      id="issueTitle"
                      value={issueTitle}
                      onChange={(e) => setIssueTitle(e.target.value)}
                      placeholder="Brief description of the issue"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="issueDescription">Description</label>
                    <textarea
                      id="issueDescription"
                      value={issueDescription}
                      onChange={(e) => setIssueDescription(e.target.value)}
                      placeholder="Provide detailed information about the issue"
                      rows="6"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="submit-button">Submit Report</button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'feedback' && (
            <div className="content-section">
              <div className="section-header">
                <h2>Provide Feedback</h2>
              </div>
              <div className="form-container">
                <form onSubmit={handleSubmitFeedback} className="report-form">
                  <div className="form-group">
                    <label htmlFor="feedbackAmenity">Amenity/Service</label>
                    <input
                      type="text"
                      id="feedbackAmenity"
                      value={feedbackAmenity}
                      onChange={(e) => setFeedbackAmenity(e.target.value)}
                      placeholder="Which amenity or service?"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="feedbackRating">Rating</label>
                    <select
                      id="feedbackRating"
                      value={feedbackRating}
                      onChange={(e) => setFeedbackRating(Number(e.target.value))}
                    >
                      <option value={5}>5 - Excellent</option>
                      <option value={4}>4 - Good</option>
                      <option value={3}>3 - Average</option>
                      <option value={2}>2 - Poor</option>
                      <option value={1}>1 - Very Poor</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="feedbackComment">Comments</label>
                    <textarea
                      id="feedbackComment"
                      value={feedbackComment}
                      onChange={(e) => setFeedbackComment(e.target.value)}
                      placeholder="Share your experience and suggestions"
                      rows="6"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="submit-button">Submit Feedback</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
