import React from "react";
import "./StudentDashboard.css";
import "./JobsInternships.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



export default function StudentDashboard() {
const [activeNav, setActiveNav] = React.useState("dashboard");
const [showAllInternships, setShowAllInternships] = React.useState(false);
const [requestSent, setRequestSent] = React.useState(false);
  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">S</div>
          <span>SkillBridge</span>
        </div>

        <nav>
  <a
    className={activeNav === "dashboard" ? "active" : ""}
    onClick={() => setActiveNav("dashboard")}
  >
    📊 <span>Dashboard</span>
  </a>

  <a
    className={activeNav === "profile" ? "active" : ""}
    onClick={() => {
      setActiveNav("profile");
      document
        .querySelector(".profile-card")
        ?.classList.add("profile-highlight");

      setTimeout(() => {
        document
          .querySelector(".profile-card")
          ?.classList.remove("profile-highlight");
      }, 900);
    }}
  >
    👤 <span>My Profile</span>
  </a>

  <a
    className={activeNav === "assessments" ? "active" : ""}
    onClick={() => {
      setActiveNav("assessments");
      document
        .querySelector(".tests-card")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }}
  >
    📝 <span>Assessments</span>
  </a>

  <a
    className={activeNav === "internships" ? "active" : ""}
    onClick={() => {
      setActiveNav("internships");
      document
        .querySelector(".internship-card")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }}
  >
    💼 <span>Internships</span>
  </a>

  <a
    className={activeNav === "applications" ? "active" : ""}
    onClick={() => {
      setActiveNav("applications");
      document
        .querySelector(".request-card")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }}
  >
    📄 <span>Applications</span>
  </a>
</nav>

        <div className="sidebar-bottom">
          <a>🔔 Notifications</a>
          <a>⚙ Settings</a>
        </div>
      </aside>

      {/* Main */}
      <main className="main">
        {/* Header */}
        <header className="header">
          <div>
            <h1>Student Dashboard</h1>
            <p>Track your skills, assessments and internship opportunities.</p>
          </div>

          <div className="header-right">
            <button className="notification">🔔</button>
            <div className="user">
              <div className="avatar">RS</div>
              <div>
                <strong>Rishabh Suroshi</strong>
                <small>Student</small>
              </div>
            </div>
          </div>
        </header>

        {/* Profile Summary */}
        <section className="profile-card">
          <div className="profile-left">
            <div className="large-avatar">RS</div>

            <div>
              <div className="name-row">
                <h2>Rishabh Suroshi</h2>
                <span className="verified">✓ Verified Profile</span>
              </div>

              <p className="course">
                B.Tech Computer Science Engineering
              </p>

              <p className="location">📍 India</p>

              <div className="tags">
                <span>Python</span>
                <span>React</span>
                <span>Machine Learning</span>
                <span>JavaScript</span>
              </div>
            </div>
          </div>

<button
  className="edit-btn"
  onClick={() => {
    setActiveNav("profile");
    document
      .querySelector(".profile-card")
      ?.classList.add("profile-highlight");

    setTimeout(() => {
      document
        .querySelector(".profile-card")
        ?.classList.remove("profile-highlight");
    }, 900);
  }}
>
  Edit Profile
</button>        </section>

        {/* Top Stats */}
        <section className="stats">
          <div className="stat-card">
            <div className="stat-icon purple">🎯</div>
            <div>
              <span>Profile Completion</span>
              <strong>86%</strong>
            </div>
            <div className="progress">
              <div style={{ width: "86%" }} />
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon blue">🧠</div>
            <div>
              <span>Verified Skills</span>
              <strong>8</strong>
            </div>
            <small>+2 this month</small>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">📊</div>
            <div>
              <span>Average Test Score</span>
              <strong>82%</strong>
            </div>
            <small className="positive">↑ 8% improvement</small>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">💼</div>
            <div>
              <span>Internship Matches</span>
              <strong>12</strong>
            </div>
            <small>4 new matches</small>
          </div>
        </section>

        {/* Grid */}
        <section className="dashboard-grid">
          {/* Interests */}
          <div className="card interests-card">
            <div className="card-header">
              <div>
                <h3>My Interests</h3>
                <p>Topics you are interested in</p>
              </div>
              <button className="text-btn">Edit</button>
            </div>

            <div className="interest-list">
              <div className="interest">
                <span className="interest-icon">🤖</span>
                <div>
                  <strong>Artificial Intelligence</strong>
                  <small>High interest</small>
                </div>
              </div>

              <div className="interest">
                <span className="interest-icon">💻</span>
                <div>
                  <strong>Web Development</strong>
                  <small>High interest</small>
                </div>
              </div>

              <div className="interest">
                <span className="interest-icon">📈</span>
                <div>
                  <strong>Data Science</strong>
                  <small>Medium interest</small>
                </div>
              </div>

              <div className="interest">
                <span className="interest-icon">☁️</span>
                <div>
                  <strong>Cloud Computing</strong>
                  <small>Medium interest</small>
                </div>
              </div>
            </div>

            <button className="outline-btn">+ Add Interest</button>
          </div>

          {/* Skill Progress */}
          <div className="card skills-card">
            <div className="card-header">
              <div>
                <h3>Skill Profile</h3>
                <p>Your verified skill strength</p>
              </div>
              <button className="text-btn">View All</button>
            </div>

            <div className="skill">
              <div>
                <span>Python</span>
                <strong>92%</strong>
              </div>
              <div className="skill-bar">
                <div style={{ width: "92%" }} />
              </div>
            </div>

            <div className="skill">
              <div>
                <span>React</span>
                <strong>84%</strong>
              </div>
              <div className="skill-bar">
                <div style={{ width: "84%" }} />
              </div>
            </div>

            <div className="skill">
              <div>
                <span>Machine Learning</span>
                <strong>76%</strong>
              </div>
              <div className="skill-bar">
                <div style={{ width: "76%" }} />
              </div>
            </div>

            <div className="skill">
              <div>
                <span>Data Structures</span>
                <strong>68%</strong>
              </div>
              <div className="skill-bar">
                <div style={{ width: "68%" }} />
              </div>
            </div>
          </div>
        </section>

        {/* Tests + Internship */}
        <section className="dashboard-grid bottom-grid">
          {/* Tests */}
          <div className="card tests-card">
            <div className="card-header">
              <div>
                <h3>Assessments</h3>
                <p>Test your skills and improve your profile</p>
              </div>
              <button className="primary-btn">+ Take Test</button>
            </div>

            <div className="test-item">
              <div className="test-icon">🐍</div>

              <div className="test-info">
                <strong>Python Programming</strong>
                <span>20 Questions · 30 Minutes</span>
              </div>

              <div className="score completed">
                <strong>92%</strong>
                <span>Completed</span>
              </div>

              <button className="small-btn">Retake</button>
            </div>

            <div className="test-item">
              <div className="test-icon">⚛️</div>

              <div className="test-info">
                <strong>React Development</strong>
                <span>25 Questions · 35 Minutes</span>
              </div>

              <div className="score completed">
                <strong>84%</strong>
                <span>Completed</span>
              </div>

              <button className="small-btn">Retake</button>
            </div>

            <div className="test-item">
              <div className="test-icon">🤖</div>

              <div className="test-info">
                <strong>Machine Learning</strong>
                <span>30 Questions · 40 Minutes</span>
              </div>

              <div className="score pending">
                <strong>Not Taken</strong>
                <span>Recommended</span>
              </div>

              <button className="small-btn start">Start</button>
            </div>

            <div className="test-item">
              <div className="test-icon">📊</div>

              <div className="test-info">
                <strong>Data Structures & Algorithms</strong>
                <span>30 Questions · 45 Minutes</span>
              </div>

              <div className="score completed">
                <strong>71%</strong>
                <span>Completed</span>
              </div>

              <button className="small-btn">Retake</button>
            </div>
          </div>

          {/* Internship Portal */}
          <div className="card internship-card">
            <div className="card-header">
              <div>
                <h3>Internship Portal</h3>
                <p>Opportunities matched to your skills</p>
              </div>
              <span className="match-count">12 Matches</span>
            </div>

            <div className="internship">
              <div className="company-logo">T</div>

              <div className="intern-info">
                <strong>AI / ML Intern</strong>
                <span>TechNova Solutions</span>
                <small>Remote · 3 Months</small>
              </div>

              <div className="match">94% Match</div>
            </div>

            <div className="internship">
              <div className="company-logo blue-logo">D</div>

              <div className="intern-info">
                <strong>Frontend Developer Intern</strong>
                <span>DevCore Technologies</span>
                <small>Hybrid · 6 Months</small>
              </div>

              <div className="match">89% Match</div>
            </div>

            <div className="internship">
              <div className="company-logo orange-logo">N</div>

              <div className="intern-info">
                <strong>Data Science Intern</strong>
                <span>NextGen Analytics</span>
                <small>On-site · 4 Months</small>
              </div>

              <div className="match">83% Match</div>
            </div>

            <button href="./JobsInternships.js"
    className="view-all-btn"to="./JobsInternships.js"
    //   onClick={() => setShowAllInternships(!showAllInternships)}
    >
        <Link to="/jobs-internships" className="view-all-btn">
  View All Internship Opportunities →
</Link>
    {/* {showAllInternships
        ? "Show Less ↑"
        : "View All Internship Opportunities →"} */}
        
    </button> 

{showAllInternships && (
  <div className="extra-internships">
    <div className="internship">
      <div className="company-logo">A</div>

      <div className="intern-info">
        <strong>Software Developer Intern</strong>
        <span>Alpha Technologies</span>
        <small>Remote · 6 Months</small>
      </div>

      <div className="match">81% Match</div>
    </div>

    <div className="internship">
      <div className="company-logo blue-logo">C</div>

      <div className="intern-info">
        <strong>Cloud Engineering Intern</strong>
        <span>CloudCore Labs</span>
        <small>Hybrid · 3 Months</small>
      </div>

      <div className="match">78% Match</div>
    </div>
  </div>
)}
          </div>
        </section>

        {/* Internship Request */}
        <section className="card request-card">
          <div className="request-content">
            <div className="request-icon">💼</div>

            <div>
              <h3>Looking for an Internship?</h3>
              <p>
                Submit your internship request and let companies discover your
                verified skills.
              </p>
            </div>
          </div>

        <button
  className="primary-btn large"
//   onClick={() => navigate("/jobs-internships")}

>


<Link to="/jobs-internships" className="primary-btn large">
            INTERNSHIP UPDATE
          </Link></button>
        </section>

        {/* Skill Gap */}
        <section className="card recommendation-card">
          <div>
            <h3>Personalized Recommendation</h3>
            <p>
              Based on your recent assessments, improving these skills can
              increase your internship matches.
            </p>
          </div>

          <div className="recommendations">
            <span>Advanced ML</span>
            <span>SQL</span>
            <span>System Design</span>
          </div>

          <button className="outline-btn">View Skill Gap</button>
        </section>
      </main>
    </div>
  );
}