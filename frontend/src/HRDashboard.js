// ============================================================
// src/HRDashboard.jsx
// ============================================================

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./HRDashboard.css";

const API_BASE_URL = "http://localhost:8000/api";

// FastAPI placeholders:
// GET  ${API_BASE_URL}/hr/applications
// GET  ${API_BASE_URL}/hr/applications/:id/performance
// POST ${API_BASE_URL}/hr/jobs
// PUT  ${API_BASE_URL}/hr/jobs/:id
// DELETE ${API_BASE_URL}/hr/jobs/:id
//
// Database flow:
// React → FastAPI → PostgreSQL
//
// Keep database credentials on the FastAPI server only.

export default function HRDashboard() {
  const [activeTab, setActiveTab] = useState("applications");
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showPostForm, setShowPostForm] = useState(false);
  const [postedJobs, setPostedJobs] = useState([]);
  const [notification, setNotification] = useState("");

  const [jobForm, setJobForm] = useState({
    title: "",
    type: "Internship",
    location: "",
    duration: "",
    skills: "",
    description: "",
    deadline: "",
  });

  const applicants = [
    {
      id: 1,
      name: "Rishabh Suroshi",
      role: "AI / ML Intern",
      university: "B.Tech CSE",
      score: 92,
      match: 94,
      status: "Shortlisted",
      applied: "2 days ago",
      skills: ["Python", "Machine Learning", "SQL", "Pandas"],
      performance: {
        overall: 92,
        python: 95,
        machineLearning: 88,
        dataStructures: 91,
        communication: 86,
      },
    },
    {
      id: 2,
      name: "Ananya Sharma",
      role: "Frontend Developer Intern",
      university: "B.Tech IT",
      score: 87,
      match: 89,
      status: "Under Review",
      applied: "3 days ago",
      skills: ["React", "JavaScript", "CSS", "Git"],
      performance: {
        overall: 87,
        python: 65,
        machineLearning: 60,
        dataStructures: 82,
        communication: 91,
      },
    },
    {
      id: 3,
      name: "Aditya Kumar",
      role: "Data Science Intern",
      university: "B.Sc Data Science",
      score: 83,
      match: 86,
      status: "New",
      applied: "5 hours ago",
      skills: ["Python", "SQL", "Statistics", "Excel"],
      performance: {
        overall: 83,
        python: 89,
        machineLearning: 81,
        dataStructures: 78,
        communication: 84,
      },
    },
    {
      id: 4,
      name: "Priya Singh",
      role: "Software Developer Intern",
      university: "B.Tech CSE",
      score: 79,
      match: 81,
      status: "Under Review",
      applied: "1 week ago",
      skills: ["Java", "DSA", "Spring", "Git"],
      performance: {
        overall: 79,
        python: 55,
        machineLearning: 52,
        dataStructures: 88,
        communication: 80,
      },
    },
  ];

  const handleJobChange = (e) => {
    setJobForm({
      ...jobForm,
      [e.target.name]: e.target.value,
    });
  };

  const createPosting = async (e) => {
    e.preventDefault();

    /*
    // FASTAPI CONNECTION

    const response = await fetch(`${API_BASE_URL}/hr/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(jobForm),
    });

    const data = await response.json();
    */

    const newJob = {
      id: Date.now(),
      ...jobForm,
      skills: jobForm.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
      posted: "Just now",
      applicants: 0,
    };

    setPostedJobs((previous) => [newJob, ...previous]);

    setJobForm({
      title: "",
      type: "Internship",
      location: "",
      duration: "",
      skills: "",
      description: "",
      deadline: "",
    });

    setShowPostForm(false);
    setNotification("Posting published successfully.");

    setTimeout(() => setNotification(""), 3000);
  };

  const updateApplication = async (applicant, status) => {
    /*
    // FASTAPI CONNECTION

    await fetch(
      `${API_BASE_URL}/hr/applications/${applicant.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );
    */

    setNotification(`${applicant.name} marked as ${status}.`);

    setTimeout(() => setNotification(""), 2500);
  };

  return (
    <div className="hr-app">

      {/* SIDEBAR */}

      <aside className="hr-sidebar">
        <Link to="/" className="hr-logo">
          <span> S </span>
          <strong>SkillBridge</strong>
        </Link>

        <div className="company-mini">
          <div className="company-avatar">TN</div>
          <div>
            <strong>TechNova</strong>
            <small>Recruiter Account</small>
          </div>
        </div>

        <nav className="hr-nav">
          <button
            className={activeTab === "applications" ? "active" : ""}
            onClick={() => setActiveTab("applications")}
          >
            <span>▣</span>
            Applications
          </button>

          <button
            className={activeTab === "postings" ? "active" : ""}
            onClick={() => setActiveTab("postings")}
          >
            <span>＋</span>
            Job Postings
          </button>

          <button
            className={activeTab === "analytics" ? "active" : ""}
            onClick={() => setActiveTab("analytics")}
          >
            <span>◈</span>
            Analytics
          </button>

          <button
            className={activeTab === "company" ? "active" : ""}
            onClick={() => setActiveTab("company")}
          >
            <span>◇</span>
            Company Profile
          </button>
        </nav>

        <div className="hr-sidebar-bottom">
          <button>⚙ Settings</button>
          <button>↪ Logout</button>
        </div>
      </aside>

      {/* MAIN */}

      <main className="hr-main">

        {/* HEADER */}

        <header className="hr-header">
          <div>
            <div className="breadcrumb">
              Company /{" "}
              {activeTab === "applications"
                ? "Applications"
                : activeTab === "postings"
                ? "Job Postings"
                : activeTab === "analytics"
                ? "Analytics"
                : "Company Profile"}
            </div>

            <h1>
              {activeTab === "applications"
                ? "Applicant Intelligence"
                : activeTab === "postings"
                ? "Internship & Job Postings"
                : activeTab === "analytics"
                ? "Recruitment Analytics"
                : "Company Profile"}
            </h1>

            <p>
              {activeTab === "applications"
                ? "Review applications and verified candidate performance."
                : activeTab === "postings"
                ? "Create and manage opportunities for students."
                : activeTab === "analytics"
                ? "Track your recruitment pipeline and candidate quality."
                : "Manage your company information."}
            </p>
          </div>

          <div className="hr-header-actions">
            <button className="hr-notification">♢</button>

            <div className="hr-user">
              <div className="company-avatar">TN</div>
              <div>
                <strong>TechNova Solutions</strong>
                <small>HR / Recruiter</small>
              </div>
            </div>
          </div>
        </header>

        {notification && (
          <div className="hr-toast">
            ✓ {notification}
          </div>
        )}

        {/* APPLICATIONS */}

        {activeTab === "applications" && (
          <>
            <section className="hr-stat-grid">

              <div className="hr-stat-card">
                <div className="hr-stat-icon purple">◉</div>
                <span>Total Applications</span>
                <strong>148</strong>
                <small>↑ 18% this month</small>
              </div>

              <div className="hr-stat-card">
                <div className="hr-stat-icon blue">♙</div>
                <span>New Applicants</span>
                <strong>36</strong>
                <small>Last 7 days</small>
              </div>

              <div className="hr-stat-card">
                <div className="hr-stat-icon green">✓</div>
                <span>Shortlisted</span>
                <strong>24</strong>
                <small>16% of applications</small>
              </div>

              <div className="hr-stat-card">
                <div className="hr-stat-icon orange">★</div>
                <span>Average Skill Score</span>
                <strong>84%</strong>
                <small>Across applicants</small>
              </div>

            </section>

            <section className="hr-content-grid">

              {/* APPLICATION TABLE */}

              <div className="hr-panel applicants-panel">

                <div className="hr-panel-header">
                  <div>
                    <h2>Applications</h2>
                    <p>Applicants ranked by verified skill information.</p>
                  </div>

                  <div className="application-filter">
                    <select>
                      <option>All Applications</option>
                      <option>New</option>
                      <option>Shortlisted</option>
                      <option>Under Review</option>
                    </select>

                    <button>Filter</button>
                  </div>
                </div>

                <div className="applicant-table">

                  <div className="table-head">
                    <span>Applicant</span>
                    <span>Applied Role</span>
                    <span>Verified Score</span>
                    <span>Match</span>
                    <span>Status</span>
                    <span></span>
                  </div>

                  {applicants.map((applicant) => (
                    <div className="applicant-row" key={applicant.id}>

                      <div className="applicant-name">
                        <div className="candidate-avatar">
                          {applicant.name
                            .split(" ")
                            .map((x) => x[0])
                            .join("")}
                        </div>

                        <div>
                          <strong>{applicant.name}</strong>
                          <small>{applicant.university}</small>
                        </div>
                      </div>

                      <div className="role-cell">
                        {applicant.role}
                      </div>

                      <div>
                        <strong className="score-green">
                          {applicant.score}%
                        </strong>
                      </div>

                      <div>
                        <span className="match-badge">
                          {applicant.match}% Match
                        </span>
                      </div>

                      <div>
                        <span
                          className={`status-badge ${applicant.status
                            .toLowerCase()
                            .replaceAll(" ", "-")}`}
                        >
                          {applicant.status}
                        </span>
                      </div>

                      <button
                        className="view-applicant"
                        onClick={() => setSelectedApplicant(applicant)}
                      >
                        View
                      </button>

                    </div>
                  ))}

                </div>
              </div>

              {/* PERFORMANCE REPORT */}

              <div className="hr-panel performance-panel">

                <div className="hr-panel-header">
                  <div>
                    <h2>Performance Report</h2>
                    <p>
                      {selectedApplicant
                        ? selectedApplicant.name
                        : "Select an applicant"}
                    </p>
                  </div>
                </div>

                {selectedApplicant ? (
                  <>
                    <div className="candidate-summary">

                      <div className="candidate-large-avatar">
                        {selectedApplicant.name
                          .split(" ")
                          .map((x) => x[0])
                          .join("")}
                      </div>

                      <div>
                        <h3>{selectedApplicant.name}</h3>
                        <span>{selectedApplicant.role}</span>

                        <div className="candidate-skills">
                          {selectedApplicant.skills.map((skill) => (
                            <small key={skill}>{skill}</small>
                          ))}
                        </div>
                      </div>

                    </div>

                    <div className="overall-score">
                      <div
                        className="score-ring"
                        style={{
                          "--score":
                            selectedApplicant.performance.overall,
                        }}
                      >
                        <strong>
                          {selectedApplicant.performance.overall}%
                        </strong>
                        <small>Verified</small>
                      </div>

                      <div>
                        <strong>Overall Skill Score</strong>
                        <p>
                          Based on personalized technical and
                          competency assessments.
                        </p>
                      </div>
                    </div>

                    <div className="performance-bars">

                      {[
                        ["Python", selectedApplicant.performance.python],
                        [
                          "Machine Learning",
                          selectedApplicant.performance.machineLearning,
                        ],
                        [
                          "Data Structures",
                          selectedApplicant.performance.dataStructures,
                        ],
                        [
                          "Communication",
                          selectedApplicant.performance.communication,
                        ],
                      ].map(([label, value]) => (
                        <div className="performance-item" key={label}>
                          <div>
                            <span>{label}</span>
                            <strong>{value}%</strong>
                          </div>

                          <div className="performance-track">
                            <i style={{ width: `${value}%` }} />
                          </div>
                        </div>
                      ))}

                    </div>

                    <div className="report-insight">
                      <span>✦</span>
                      <div>
                        <strong>Verified Skill Insight</strong>
                        <p>
                          Candidate demonstrates strong technical
                          performance based on assessment evidence.
                        </p>
                      </div>
                    </div>

                    <div className="candidate-actions">
                      <button
                        className="reject-btn"
                        onClick={() =>
                          updateApplication(
                            selectedApplicant,
                            "Rejected"
                          )
                        }
                      >
                        Reject
                      </button>

                      <button
                        className="shortlist-btn"
                        onClick={() =>
                          updateApplication(
                            selectedApplicant,
                            "Shortlisted"
                          )
                        }
                      >
                        Shortlist Candidate
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="empty-performance">
                    <div>◉</div>
                    <h3>No Applicant Selected</h3>
                    <p>
                      Select an applicant to view their complete
                      performance report.
                    </p>
                  </div>
                )}

              </div>

            </section>
          </>
        )}

        {/* POSTINGS */}

        {activeTab === "postings" && (
          <section className="postings-page">

            <div className="posting-topbar">
              <div>
                <h2>Your Opportunities</h2>
                <p>
                  Publish internships, jobs and company announcements.
                </p>
              </div>

              <button
                className="create-post-btn"
                onClick={() => setShowPostForm(!showPostForm)}
              >
                + Create New Posting
              </button>
            </div>

            {showPostForm && (
              <form
                className="posting-form"
                onSubmit={createPosting}
              >

                <div className="posting-form-title">
                  <div className="posting-form-icon">＋</div>
                  <div>
                    <h2>Create Opportunity</h2>
                    <p>
                      Publish a new internship, job or announcement.
                    </p>
                  </div>
                </div>

                <div className="form-grid">

                  <label>
                    Position / Announcement Title
                    <input
                      name="title"
                      value={jobForm.title}
                      onChange={handleJobChange}
                      placeholder="e.g. AI / ML Intern"
                      required
                    />
                  </label>

                  <label>
                    Type
                    <select
                      name="type"
                      value={jobForm.type}
                      onChange={handleJobChange}
                    >
                      <option>Internship</option>
                      <option>Full Time</option>
                      <option>Part Time</option>
                      <option>Announcement</option>
                    </select>
                  </label>

                  <label>
                    Location
                    <input
                      name="location"
                      value={jobForm.location}
                      onChange={handleJobChange}
                      placeholder="Remote / City"
                      required
                    />
                  </label>

                  <label>
                    Duration
                    <input
                      name="duration"
                      value={jobForm.duration}
                      onChange={handleJobChange}
                      placeholder="3 Months"
                    />
                  </label>

                  <label>
                    Required Skills
                    <input
                      name="skills"
                      value={jobForm.skills}
                      onChange={handleJobChange}
                      placeholder="Python, React, SQL"
                    />
                  </label>

                  <label>
                    Application Deadline
                    <input
                      type="date"
                      name="deadline"
                      value={jobForm.deadline}
                      onChange={handleJobChange}
                    />
                  </label>

                </div>

                <label className="description-field">
                  Description
                  <textarea
                    name="description"
                    value={jobForm.description}
                    onChange={handleJobChange}
                    placeholder="Describe the opportunity, responsibilities and requirements..."
                    rows="5"
                    required
                  />
                </label>

                <div className="posting-form-actions">
                  <button
                    type="button"
                    className="cancel-post"
                    onClick={() => setShowPostForm(false)}
                  >
                    Cancel
                  </button>

                  <button type="submit" className="publish-post">
                    Publish Opportunity →
                  </button>
                </div>

              </form>
            )}

            <div className="posting-list">

              <div className="active-posting-card">
                <div className="posting-company-icon">TN</div>

                <div className="posting-details">
                  <span className="live-label">● LIVE</span>
                  <h3>AI / ML Intern</h3>
                  <p>TechNova Solutions</p>

                  <div className="posting-meta">
                    <span>Remote</span>
                    <span>3 Months</span>
                    <span>Python</span>
                    <span>Machine Learning</span>
                  </div>
                </div>

                <div className="posting-stats">
                  <strong>42</strong>
                  <small>Applicants</small>
                  <span>12 Shortlisted</span>
                </div>

                <button className="manage-post">
                  Manage
                </button>
              </div>

              <div className="active-posting-card">
                <div className="posting-company-icon blue-company">
                  TN
                </div>

                <div className="posting-details">
                  <span className="live-label">● LIVE</span>
                  <h3>Frontend Developer Intern</h3>
                  <p>TechNova Solutions</p>

                  <div className="posting-meta">
                    <span>Hybrid</span>
                    <span>6 Months</span>
                    <span>React</span>
                    <span>JavaScript</span>
                  </div>
                </div>

                <div className="posting-stats">
                  <strong>31</strong>
                  <small>Applicants</small>
                  <span>8 Shortlisted</span>
                </div>

                <button className="manage-post">
                  Manage
                </button>
              </div>

              {postedJobs.map((job) => (
                <div
                  className="active-posting-card newly-posted"
                  key={job.id}
                >
                  <div className="posting-company-icon">
                    TN
                  </div>

                  <div className="posting-details">
                    <span className="live-label">● NEW</span>
                    <h3>{job.title}</h3>
                    <p>TechNova Solutions</p>

                    <div className="posting-meta">
                      <span>{job.location}</span>
                      <span>{job.duration}</span>

                      {job.skills.map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div className="posting-stats">
                    <strong>0</strong>
                    <small>Applicants</small>
                    <span>Just Published</span>
                  </div>

                  <button className="manage-post">
                    Manage
                  </button>
                </div>
              ))}

            </div>
          </section>
        )}

        {/* ANALYTICS */}

        {activeTab === "analytics" && (
          <section className="analytics-page">

            <div className="analytics-grid">

              <div className="analytics-big-card">
                <span>Total Applicants</span>
                <strong>148</strong>

                <div className="fake-chart">
                  <i style={{ height: "32%" }} />
                  <i style={{ height: "48%" }} />
                  <i style={{ height: "43%" }} />
                  <i style={{ height: "65%" }} />
                  <i style={{ height: "58%" }} />
                  <i style={{ height: "82%" }} />
                  <i style={{ height: "75%" }} />
                  <i style={{ height: "95%" }} />
                </div>
              </div>

              <div className="analytics-small-card">
                <span>Shortlist Rate</span>
                <strong>16.2%</strong>
                <small>24 shortlisted</small>
              </div>

              <div className="analytics-small-card">
                <span>Average Skill Score</span>
                <strong>84%</strong>
                <small>+6% from previous cycle</small>
              </div>

              <div className="analytics-small-card">
                <span>Active Opportunities</span>
                <strong>8</strong>
                <small>3 new this month</small>
              </div>

            </div>

            <div className="analytics-insight-card">
              <div className="insight-icon">✦</div>

              <div>
                <h2>Skill Intelligence Overview</h2>
                <p>
                  Your applicant pool currently shows strong
                  representation in Python, React and Data Structures.
                  Skill verification data can be used to refine your
                  hiring pipeline.
                </p>
              </div>
            </div>

          </section>
        )}

        {/* COMPANY PROFILE */}

        {activeTab === "company" && (
          <section className="company-profile-page">

            <div className="company-cover">
              <div className="large-company-logo">
                TN
              </div>
            </div>

            <div className="company-profile-content">

              <div className="company-profile-heading">
                <div>
                  <h2>TechNova Solutions</h2>
                  <p>
                    Technology • Software • Artificial Intelligence
                  </p>
                </div>

                <button className="edit-company">
                  Edit Company Profile
                </button>
              </div>

              <div className="company-profile-grid">

                <div>
                  <h3>About Company</h3>
                  <p>
                    TechNova Solutions builds technology products
                    across artificial intelligence, software
                    engineering and data platforms.
                  </p>
                </div>

                <div>
                  <h3>Recruitment Focus</h3>
                  <div className="focus-tags">
                    <span>AI / ML</span>
                    <span>Frontend</span>
                    <span>Backend</span>
                    <span>Data Science</span>
                    <span>Cloud</span>
                  </div>
                </div>

              </div>

            </div>
          </section>
        )}

      </main>

      {/* APPLICANT MODAL */}

      {selectedApplicant && (
        <div
          className="applicant-modal-overlay"
          onClick={() => setSelectedApplicant(null)}
        >
          <div
            className="applicant-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="modal-close"
              onClick={() => setSelectedApplicant(null)}
            >
              ×
            </button>

            <div className="modal-profile">
              <div className="candidate-large-avatar">
                {selectedApplicant.name
                  .split(" ")
                  .map((x) => x[0])
                  .join("")}
              </div>

              <div>
                <h2>{selectedApplicant.name}</h2>
                <p>{selectedApplicant.role}</p>
                <span>{selectedApplicant.university}</span>
              </div>
            </div>

            <div className="modal-section">
              <h3>Verified Skills</h3>

              <div className="modal-skills">
                {selectedApplicant.skills.map((skill) => (
                  <span key={skill}>✓ {skill}</span>
                ))}
              </div>
            </div>

            <div className="modal-performance-grid">

              <div>
                <span>Overall</span>
                <strong>
                  {selectedApplicant.performance.overall}%
                </strong>
              </div>

              <div>
                <span>Python</span>
                <strong>
                  {selectedApplicant.performance.python}%
                </strong>
              </div>

              <div>
                <span>ML</span>
                <strong>
                  {selectedApplicant.performance.machineLearning}%
                </strong>
              </div>

              <div>
                <span>DSA</span>
                <strong>
                  {selectedApplicant.performance.dataStructures}%
                </strong>
              </div>

            </div>

            <div className="modal-actions">
              <button
                className="reject-btn"
                onClick={() =>
                  updateApplication(
                    selectedApplicant,
                    "Rejected"
                  )
                }
              >
                Reject
              </button>

              <button
                className="shortlist-btn"
                onClick={() =>
                  updateApplication(
                    selectedApplicant,
                    "Shortlisted"
                  )
                }
              >
                Shortlist
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}