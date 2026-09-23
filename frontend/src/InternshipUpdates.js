// ============================================================
// src/InternshipUpdates.jsx
// STUDENT INTERNSHIP / JOB BROWSING PAGE
// ============================================================

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./InternshipUpdates.css";

const API_BASE_URL = "http://localhost:8000/api";

// FastAPI placeholders:
// GET ${API_BASE_URL}/jobs
// GET ${API_BASE_URL}/jobs/:id
// POST ${API_BASE_URL}/jobs/:id/apply
//
// Database:
// React → FastAPI → PostgreSQL
//
// The production API should return the same shape used below.

const initialJobs = [
  {
    id: 1,
    company: "TechNova Solutions",
    companyShort: "TN",
    title: "AI / ML Intern",
    location: "Remote",
    type: "Internship",
    duration: "3 Months",
    stipend: "₹15,000 / month",
    match: 94,
    posted: "2 days ago",
    applicants: 42,
    skills: ["Python", "Machine Learning", "SQL"],
    description:
      "Work with the AI team on machine learning models, data pipelines and experimentation.",
  },
  {
    id: 2,
    company: "DevCore Technologies",
    companyShort: "DC",
    title: "Frontend Developer Intern",
    location: "Hybrid",
    type: "Internship",
    duration: "6 Months",
    stipend: "₹18,000 / month",
    match: 89,
    posted: "3 days ago",
    applicants: 31,
    skills: ["React", "JavaScript", "CSS"],
    description:
      "Build responsive interfaces and work with the frontend engineering team.",
  },
  {
    id: 3,
    company: "NextGen Analytics",
    companyShort: "NG",
    title: "Data Science Intern",
    location: "Bangalore",
    type: "Internship",
    duration: "4 Months",
    stipend: "₹20,000 / month",
    match: 86,
    posted: "5 days ago",
    applicants: 27,
    skills: ["Python", "SQL", "Statistics"],
    description:
      "Analyze business datasets and build data-driven insights and dashboards.",
  },
  {
    id: 4,
    company: "CloudCore Labs",
    companyShort: "CC",
    title: "Cloud Engineering Intern",
    location: "Pune",
    type: "Internship",
    duration: "6 Months",
    stipend: "₹17,000 / month",
    match: 82,
    posted: "1 week ago",
    applicants: 19,
    skills: ["AWS", "Docker", "Linux"],
    description:
      "Learn cloud infrastructure, deployment pipelines and containerized applications.",
  },
  {
    id: 5,
    company: "Alpha Technologies",
    companyShort: "AT",
    title: "Software Developer Intern",
    location: "Delhi NCR",
    type: "Internship",
    duration: "3 Months",
    stipend: "₹14,000 / month",
    match: 79,
    posted: "1 week ago",
    applicants: 38,
    skills: ["Java", "DSA", "Git"],
    description:
      "Work with software engineers on real-world product development.",
  },
];

export default function InternshipUpdates() {
  const [jobs, setJobs] = useState(initialJobs);
  const [selectedJob, setSelectedJob] = useState(null);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [type, setType] = useState("All Types");
  const [sort, setSort] = useState("match");
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  // FASTAPI LOAD PLACEHOLDER
  useEffect(() => {
    /*
    const loadJobs = async () => {
      setLoading(true);

      try {
        const response = await fetch(`${API_BASE_URL}/jobs`);
        const data = await response.json();

        setJobs(data.jobs);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
    */
  }, []);

  const applyForJob = async (job) => {
    /*
    // FASTAPI APPLICATION

    await fetch(`${API_BASE_URL}/jobs/${job.id}/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        job_id: job.id,
      }),
    });
    */

    setAppliedJobs((previous) => [...previous, job.id]);

    setToast(`Application sent to ${job.company}.`);

    setTimeout(() => setToast(""), 2500);
  };

  const filteredJobs = jobs
    .filter((job) => {
      const searchMatch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.skills.some((skill) =>
          skill.toLowerCase().includes(search.toLowerCase())
        );

      const locationMatch =
        location === "All Locations" ||
        job.location === location;

      const typeMatch =
        type === "All Types" ||
        job.type === type;

      return searchMatch && locationMatch && typeMatch;
    })
    .sort((a, b) => {
      if (sort === "match") return b.match - a.match;
      if (sort === "newest") return a.id - b.id;
      return a.title.localeCompare(b.title);
    });

  return (
    <div className="internship-app">

      {/* HEADER */}

      <header className="student-job-header">

        <Link to="/" className="job-brand">
          <span>S</span>
          <strong>SkillBridge</strong>
        </Link>

        <nav>
          <Link to="/student-dashboard">
            Dashboard
          </Link>

          <a className="active">
            Internships
          </a>

          <a>Applications</a>
          <a>Skill Profile</a>
        </nav>

        <div className="student-job-user">
          <div className="job-user-avatar">RS</div>

          <div>
            <strong>Rishabh Suroshi</strong>
            <small>Student</small>
          </div>
        </div>

      </header>

      {toast && (
        <div className="job-toast">
          ✓ {toast}
        </div>
      )}

      {/* HERO */}

      <section className="jobs-hero">

        <div className="jobs-hero-content">

          <span className="jobs-eyebrow">
            ✦ PERSONALIZED OPPORTUNITIES
          </span>

          <h1>
            Find opportunities
            <span> matched to your skills.</span>
          </h1>

          <p>
            Browse internships and jobs from companies looking for
            verified student capabilities.
          </p>

          <div className="hero-profile-match">
            <div className="job-match-circle">
              82%
            </div>

            <div>
              <strong>Your profile is ready</strong>
              <small>
                12 opportunities match your current skills
              </small>
            </div>
          </div>

        </div>

        <div className="hero-job-visual">

          <div className="floating-job-card card-a">
            <span>AI / ML</span>
            <strong>94% Match</strong>
          </div>

          <div className="floating-job-card card-b">
            <span>Frontend</span>
            <strong>89% Match</strong>
          </div>

          <div className="job-visual-center">
            <div>💼</div>
            <strong>12</strong>
            <small>Matches</small>
          </div>

        </div>

      </section>

      {/* SEARCH */}

      <section className="job-search-section">

        <div className="job-search-box">

          <span>⌕</span>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by role, company or skill..."
          />

        </div>

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option>All Locations</option>
          <option>Remote</option>
          <option>Hybrid</option>
          <option>Bangalore</option>
          <option>Pune</option>
          <option>Delhi NCR</option>
        </select>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option>All Types</option>
          <option>Internship</option>
          <option>Full Time</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="match">Best Match</option>
          <option value="newest">Newest</option>
          <option value="title">Role Name</option>
        </select>

      </section>

      {/* CONTENT */}

      <main className="jobs-main">

        <div className="jobs-main-header">

          <div>
            <span>OPPORTUNITIES</span>
            <h2>
              {filteredJobs.length} opportunities found
            </h2>
          </div>

          <div className="verified-info">
            ✓ Verified companies
          </div>

        </div>

        {loading ? (
          <div className="jobs-loading">
            <div className="loading-spinner" />
            Loading opportunities...
          </div>
        ) : (
          <div className="jobs-layout">

            {/* JOB LIST */}

            <div className="jobs-list">

              {filteredJobs.map((job) => (
                <article
                  className={`job-card ${
                    selectedJob?.id === job.id
                      ? "selected"
                      : ""
                  }`}
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                >

                  <div className="job-card-top">

                    <div className="company-job-logo">
                      {job.companyShort}
                    </div>

                    <div className="job-card-title">

                      <div className="job-match-label">
                        {job.match}% Match
                      </div>

                      <h3>{job.title}</h3>

                      <p>{job.company}</p>

                    </div>

                    <button
                      className="save-job"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      ♡
                    </button>

                  </div>

                  <div className="job-card-meta">
                    <span>⌖ {job.location}</span>
                    <span>◷ {job.duration}</span>
                    <span>₹ {job.stipend}</span>
                  </div>

                  <div className="job-skills">
                    {job.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>

                  <div className="job-card-footer">
                    <small>
                      Posted {job.posted} • {job.applicants} applicants
                    </small>

                    <span>
                      View details →
                    </span>
                  </div>

                </article>
              ))}

              {filteredJobs.length === 0 && (
                <div className="no-jobs">
                  <div>⌕</div>
                  <h3>No opportunities found</h3>
                  <p>
                    Try changing your search or filters.
                  </p>
                </div>
              )}

            </div>

            {/* DETAILS */}

            <aside className="job-details-panel">

              {selectedJob ? (
                <div className="job-details">

                  <div className="details-company">

                    <div className="details-logo">
                      {selectedJob.companyShort}
                    </div>

                    <div>
                      <strong>{selectedJob.company}</strong>
                      <small>Verified Company ✓</small>
                    </div>

                  </div>

                  <div className="details-match">
                    <div>
                      <strong>
                        {selectedJob.match}% Match
                      </strong>
                      <small>
                        Based on your verified skill profile
                      </small>
                    </div>

                    <div
                      className="details-match-circle"
                      style={{
                        "--match": `${selectedJob.match}%`,
                      }}
                    >
                      {selectedJob.match}
                    </div>
                  </div>

                  <h2>{selectedJob.title}</h2>

                  <div className="details-meta">
                    <span>⌖ {selectedJob.location}</span>
                    <span>◷ {selectedJob.duration}</span>
                    <span>₹ {selectedJob.stipend}</span>
                  </div>

                  <div className="details-section">
                    <h3>About the Opportunity</h3>
                    <p>
                      {selectedJob.description}
                    </p>
                  </div>

                  <div className="details-section">
                    <h3>Required Skills</h3>

                    <div className="details-skills">
                      {selectedJob.skills.map((skill) => (
                        <span key={skill}>
                          ✓ {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="details-section">
                    <h3>Why you match</h3>

                    <div className="why-match">
                      <span>✓</span>
                      <p>
                        Your verified skill profile aligns with
                        this opportunity.
                      </p>
                    </div>

                    <div className="why-match">
                      <span>✓</span>
                      <p>
                        Your assessment performance meets the
                        expected role requirements.
                      </p>
                    </div>
                  </div>

                  <button
                    className={`apply-job-button ${
                      appliedJobs.includes(selectedJob.id)
                        ? "applied"
                        : ""
                    }`}
                    disabled={appliedJobs.includes(selectedJob.id)}
                    onClick={() => applyForJob(selectedJob)}
                  >
                    {appliedJobs.includes(selectedJob.id)
                      ? "✓ Application Submitted"
                      : "Apply for this Opportunity →"}
                  </button>

                  <small className="application-note">
                    Your verified skill profile will be shared
                    with the company.
                  </small>

                </div>
              ) : (
                <div className="job-details-empty">

                  <div className="details-empty-icon">
                    💼
                  </div>

                  <h3>
                    Select an opportunity
                  </h3>

                  <p>
                    Choose an internship from the list to view
                    company details, skill requirements and your
                    personalized match.
                  </p>

                </div>
              )}

            </aside>

          </div>
        )}

      </main>

      {/* BOTTOM CTA */}

      <section className="skill-improve-banner">

        <div>
          <span>SKILL INTELLIGENCE</span>

          <h2>
            Want more internship matches?
          </h2>

          <p>
            Improve your verified skill profile through personalized
            assessments.
          </p>
        </div>

        <Link to="/student-dashboard">
          Improve My Skills →
        </Link>

      </section>

      <footer className="jobs-footer">
        <Link to="/">SkillBridge</Link>

        <span>
          Degree + Resume + Verified Skill Intelligence
        </span>

        <Link to="/student-dashboard">
          Student Dashboard
        </Link>
      </footer>

    </div>
  );
}