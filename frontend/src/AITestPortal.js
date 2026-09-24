

import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./AITestPortal.css";

/*
============================================================
FASTAPI + DATABASE PLACEHOLDER
============================================================

const FASTAPI_BASE_URL = "http://localhost:8000/api";

Suggested endpoints:

GET  /student/profile
GET  /student/interests
GET  /student/resume
GET  /student/dashboard-selection
POST /ai-test/start
POST /ai-test/submit
POST /ai-test/save-score
GET  /ai-test/history

Suggested database tables:

students
student_interests
student_skills
student_resumes
test_sessions
test_questions
test_answers
test_results

Database flow:

React
  ↓
FastAPI
  ↓
AI/Gemini Question Generator
  ↓
FastAPI
  ↓
PostgreSQL / MySQL
*/


const FASTAPI_BASE_URL = "http://localhost:8000/api";

/*
============================================================
GEMINI QUESTION GENERATION PLACEHOLDER
============================================================

The Gemini logic can be written here.

Input:
{
  studentProfile,
  resume,
  interests,
  selectedTopics,
  targetRole,
  difficultyMix
}

Expected response:

[
  {
    id: 1,
    difficulty: "Easy",
    topic: "React",
    type: "coding",
    question: "...",
    starterCode: "...",
    expectedOutput: "...",
    timeLimit: 600
  }
]

Do NOT put the Gemini API key inside React.

Recommended architecture:

React
  ↓
FastAPI
  ↓
Gemini API
  ↓
FastAPI
  ↓
React
*/


const generateQuestionsWithGemini = async ({
  studentProfile,
  resume,
  interests,
  selectedTopics,
  targetRole,
  difficultyMix,
}) => {
  /*
  ============================================================
  WRITE YOUR GEMINI LOGIC HERE
  ============================================================

  Example:

  const response = await fetch(
    `${FASTAPI_BASE_URL}/ai-test/generate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentProfile,
        resume,
        interests,
        selectedTopics,
        targetRole,
        difficultyMix,
      }),
    }
  );

  return await response.json();

  ============================================================
  TEMPORARY MOCK
  ============================================================
  */

  return [
    {
      id: 1,
      difficulty: "Easy",
      topic: "JavaScript",
      type: "coding",
      question:
        "Write a function that returns the first non-repeating character in a string.",
      description:
        "Given a string s, return the first character that occurs exactly once. If no such character exists, return null.",
      constraints: [
        "1 <= s.length <= 100000",
        "The string may contain lowercase English letters.",
      ],
      examples: [
        {
          input: 's = "leetcode"',
          output: '"l"',
        },
        {
          input: 's = "aabb"',
          output: "null",
        },
      ],
      starterCode:
        'function firstUniqueChar(s) {\n    // Write your solution here\n}',
      timeLimit: 180,
    },
    {
      id: 2,
      difficulty: "Medium",
      topic: "React",
      type: "coding",
      question:
        "Build a React component that filters a list of students using a search input.",
      description:
        "Create a functional React component that accepts a students array and displays only students whose name matches the search text.",
      constraints: [
        "Use React functional components.",
        "Use useState for search state.",
        "Filtering should be case insensitive.",
      ],
      examples: [
        {
          input: '["Rishabh", "Aman", "Priya"]',
          output: 'Search "ri" → ["Rishabh"]',
        },
      ],
      starterCode:
        'import React, { useState } from "react";\n\nfunction StudentSearch({ students }) {\n    // Write your solution here\n}',
      timeLimit: 300,
    },
    {
      id: 3,
      difficulty: "Hard",
      topic: "Machine Learning",
      type: "coding",
      question:
        "Implement a function that calculates precision, recall and F1-score from prediction results.",
      description:
        "Given arrays of actual and predicted binary labels, calculate precision, recall and F1-score.",
      constraints: [
        "Labels are either 0 or 1.",
        "Both arrays have the same length.",
        "Return values rounded to four decimal places.",
      ],
      examples: [
        {
          input:
            "actual = [1,1,1,0,0], predicted = [1,1,0,1,0]",
          output:
            "precision = 0.6667, recall = 0.6667, f1 = 0.6667",
        },
      ],
      starterCode:
        "def calculate_metrics(actual, predicted):\n    # Write your solution here\n    pass",
      timeLimit: 420,
    },
    {
      id: 4,
      difficulty: "Medium",
      topic: "SQL",
      type: "coding",
      question:
        "Find the second highest salary from an employee table.",
      description:
        "Write a SQL query that returns the second highest distinct salary from an Employee table.",
      constraints: [
        "Salary values may contain duplicates.",
        "Return NULL when a second highest salary does not exist.",
      ],
      examples: [
        {
          input: "Employee(id, name, salary)",
          output: "Second highest distinct salary",
        },
      ],
      starterCode:
        "SELECT\n    -- Write your SQL query here\n",
      timeLimit: 240,
    },
    {
      id: 5,
      difficulty: "Easy",
      topic: "Python",
      type: "coding",
      question:
        "Return the frequency of every element in a list.",
      description:
        "Write a Python function that returns a dictionary containing the frequency of each element.",
      constraints: [
        "The input list can contain integers.",
        "Return an empty dictionary for an empty list.",
      ],
      examples: [
        {
          input: "[1, 2, 2, 3, 3, 3]",
          output: "{1: 1, 2: 2, 3: 3}",
        },
      ],
      starterCode:
        "def frequency_count(items):\n    # Write your solution here\n    pass",
      timeLimit: 180,
    },
  ];
};


function AITestPortal() {
  const navigate = useNavigate();
  const location = useLocation();

  const [student, setStudent] = useState({
    name: "Rishabh",
    role: "Computer Science Student",
    targetRole: "Software Developer",
    resume: {
      skills: [
        "React",
        "JavaScript",
        "Python",
        "SQL",
        "Machine Learning",
        "Git",
      ],
      experience: [],
      education: "Computer Science",
    },
    interests: [
      "Web Development",
      "Artificial Intelligence",
      "Machine Learning",
      "Data Science",
    ],
  });

  const [selectedTopics, setSelectedTopics] = useState([
    "React",
    "JavaScript",
    "Python",
    "Machine Learning",
    "SQL",
  ]);

  const [difficultyMix, setDifficultyMix] = useState({
    easy: 30,
    medium: 50,
    hard: 20,
  });

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [answers, setAnswers] = useState({});
  const [questionStartTimes, setQuestionStartTimes] = useState({});
  const [questionTimeLeft, setQuestionTimeLeft] = useState(180);

  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  const [testStartTime, setTestStartTime] = useState(null);
  const [testEndTime, setTestEndTime] = useState(null);

  const [scoreJSON, setScoreJSON] = useState(null);

  const [codeLanguage, setCodeLanguage] = useState("javascript");

  const currentQuestion = questions[currentQuestionIndex];

  /*
  ============================================================
  LOAD STUDENT PROFILE FROM FASTAPI
  ============================================================
  */

  useEffect(() => {
    /*
    const loadStudentProfile = async () => {
      try {
        const response = await fetch(
          `${FASTAPI_BASE_URL}/student/profile`
        );

        if (!response.ok) {
          throw new Error("Profile request failed");
        }

        const data = await response.json();

        setStudent(data);

        if (data.selectedTopics) {
          setSelectedTopics(data.selectedTopics);
        }
      } catch (error) {
        console.error("FastAPI profile error:", error);
      }
    };

    loadStudentProfile();
    */
  }, []);

  /*
  ============================================================
  READ OPTION SELECTED FROM STUDENT DASHBOARD
  ============================================================
  */

  useEffect(() => {
    const stateTopics = location.state?.selectedTopics;

    if (stateTopics?.length) {
      setSelectedTopics(stateTopics);
    }
  }, [location.state]);

  /*
  ============================================================
  QUESTION TIMER
  ============================================================
  */

  useEffect(() => {
    if (!testStarted || testCompleted || !currentQuestion) {
      return;
    }

    const timer = setInterval(() => {
      setQuestionTimeLeft((previous) => {
        if (previous <= 1) {
          handleNextQuestion(true);
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [
    testStarted,
    testCompleted,
    currentQuestionIndex,
    currentQuestion,
  ]);

  const startQuestionTimer = (question) => {
    const limit = question?.timeLimit || 180;

    setQuestionTimeLeft(limit);

    setQuestionStartTimes((previous) => ({
      ...previous,
      [question.id]: Date.now(),
    }));
  };

  /*
  ============================================================
  START TEST
  ============================================================
  */

  const startTest = async () => {
    setLoadingQuestions(true);

    try {
      /*
      ==========================================================
      FASTAPI REQUEST
      ==========================================================

      const response = await fetch(
        `${FASTAPI_BASE_URL}/ai-test/start`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentId: student.id,
            interests: student.interests,
            resume: student.resume,
            selectedTopics,
            targetRole: student.targetRole,
            difficultyMix,
          }),
        }
      );

      const generatedQuestions = await response.json();

      ==========================================================
      */

      const generatedQuestions =
        await generateQuestionsWithGemini({
          studentProfile: student,
          resume: student.resume,
          interests: student.interests,
          selectedTopics,
          targetRole: student.targetRole,
          difficultyMix,
        });

      setQuestions(generatedQuestions);

      setCurrentQuestionIndex(0);
      setAnswers({});
      setTestCompleted(false);
      setScoreJSON(null);
      setTestStarted(true);

      setTestStartTime(Date.now());

      if (generatedQuestions.length) {
        startQuestionTimer(generatedQuestions[0]);
      }
    } catch (error) {
      console.error("Question generation failed:", error);
    } finally {
      setLoadingQuestions(false);
    }
  };

  /*
  ============================================================
  ANSWER MANAGEMENT
  ============================================================
  */

  const updateAnswer = (value) => {
    if (!currentQuestion) return;

    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: value,
    }));
  };

  /*
  ============================================================
  NEXT QUESTION
  ============================================================
  */

  const handleNextQuestion = (autoSubmitted = false) => {
    if (!currentQuestion) return;

    if (
      currentQuestionIndex >=
      questions.length - 1
    ) {
      finishTest();
      return;
    }

    const nextIndex = currentQuestionIndex + 1;

    setCurrentQuestionIndex(nextIndex);

    startQuestionTimer(questions[nextIndex]);
  };

  /*
  ============================================================
  PREVIOUS QUESTION
  ============================================================
  */

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex === 0) return;

    const previousIndex = currentQuestionIndex - 1;

    setCurrentQuestionIndex(previousIndex);

    startQuestionTimer(questions[previousIndex]);
  };

  /*
  ============================================================
  SCORE CALCULATION
  ============================================================

  This is intentionally simple.

  Replace this with your real code-execution/evaluation
  system later.

  For example:

  React
      ↓
  FastAPI
      ↓
  Secure Code Runner
      ↓
  Test Cases
      ↓
  Score
  */

  const evaluateAnswer = (question, answer) => {
    if (!answer || !answer.trim()) {
      return {
        correct: false,
        score: 0,
      };
    }

    /*
    TODO:
    Connect this with FastAPI code evaluation.

    POST:
    /ai-test/evaluate

    Body:
    {
      questionId,
      answer,
      language,
      testCases
    }
    */

    return {
      correct: true,
      score:
        question.difficulty === "Hard"
          ? 30
          : question.difficulty === "Medium"
          ? 20
          : 10,
    };
  };

  /*
  ============================================================
  FINISH TEST
  ============================================================
  */

  const finishTest = async () => {
    const results = questions.map((question) => {
      const answer = answers[question.id] || "";

      const evaluation = evaluateAnswer(
        question,
        answer
      );

      return {
        questionId: question.id,
        topic: question.topic,
        difficulty: question.difficulty,
        answer,
        correct: evaluation.correct,
        score: evaluation.score,
        maxScore:
          question.difficulty === "Hard"
            ? 30
            : question.difficulty === "Medium"
            ? 20
            : 10,
        timeLimit: question.timeLimit,
        timeUsed: questionStartTimes[question.id]
          ? Math.round(
              (Date.now() -
                questionStartTimes[question.id]) /
                1000
            )
          : 0,
      };
    });

    const totalScore = results.reduce(
      (sum, item) => sum + item.score,
      0
    );

    const maximumScore = results.reduce(
      (sum, item) => sum + item.maxScore,
      0
    );

    const percentage =
      maximumScore > 0
        ? Math.round(
            (totalScore / maximumScore) * 100
          )
        : 0;

    /*
    ============================================================
    JSON SCORE STRUCTURE
    ============================================================
    */

    const finalResult = {
      testId: `AI-${Date.now()}`,
      studentId: student.id || "STUDENT_ID",
      studentName: student.name,

      testProfile: {
        targetRole: student.targetRole,
        interests: student.interests,
        resumeSkills: student.resume.skills,
        selectedTopics,
        difficultyMix,
      },

      testMetadata: {
        totalQuestions: questions.length,
        startTime: testStartTime,
        endTime: Date.now(),
        durationSeconds: testStartTime
          ? Math.round(
              (Date.now() - testStartTime) /
                1000
            )
          : 0,
      },

      score: {
        obtained: totalScore,
        maximum: maximumScore,
        percentage,
      },

      performance: {
        correctAnswers: results.filter(
          (item) => item.correct
        ).length,

        attemptedAnswers: results.filter(
          (item) => item.answer
        ).length,

        skippedAnswers: results.filter(
          (item) => !item.answer
        ).length,
      },

      questionResults: results,

      skillAnalysis: {
        /*
        TODO:
        Generate this from FastAPI/Gemini.
        */
        strengths: [],
        weaknesses: [],
        recommendedSkills: [],
      },

      createdAt: new Date().toISOString(),
    };

    setScoreJSON(finalResult);

    setTestEndTime(Date.now());
    setTestCompleted(true);

    /*
    ============================================================
    SAVE SCORE TO FASTAPI + DATABASE
    ============================================================

    try {
      await fetch(
        `${FASTAPI_BASE_URL}/ai-test/save-score`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalResult),
        }
      );
    } catch (error) {
      console.error("Score saving failed:", error);
    }

    ============================================================
    */

    localStorage.setItem(
      "latestAITestResult",
      JSON.stringify(finalResult)
    );
  };

  /*
  ============================================================
  RESET TEST
  ============================================================
  */

  const restartTest = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setScoreJSON(null);
    setTestStarted(false);
    setTestCompleted(false);
    setTestStartTime(null);
    setTestEndTime(null);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const timerPercentage = useMemo(() => {
    if (!currentQuestion) return 100;

    return Math.max(
      0,
      Math.min(
        100,
        (questionTimeLeft /
          currentQuestion.timeLimit) *
          100
      )
    );
  }, [questionTimeLeft, currentQuestion]);

  /*
  ============================================================
  SETUP PAGE
  ============================================================
  */

  if (!testStarted && !testCompleted) {
    return (
      <div className="ai-test-page">
        <div className="ai-floating-orb ai-orb-one"></div>
        <div className="ai-floating-orb ai-orb-two"></div>

        <header className="ai-test-header">
          <button
            className="ai-test-brand"
            onClick={() =>
              navigate("/student/dashboard")
            }
          >
            <span>SI</span>
            <div>
              <strong>SkillBridge</strong>
              <small>AI Skill Assessment</small>
            </div>
          </button>

          <div className="ai-header-actions">
            <button
              onClick={() =>
                navigate("/student/dashboard")
              }
            >
              Student Dashboard
            </button>

            <div className="ai-student-avatar">
              RS
            </div>
          </div>
        </header>

        <main className="ai-test-setup">
          <section className="ai-test-intro">
            <div className="ai-status-pill">
              <span></span>
              AI PERSONALIZED TEST
            </div>

            <h1>
              Prove what
              <span> you can build.</span>
            </h1>

            <p>
              Your test is generated around your
              interests, resume, selected career path
              and current skill profile.
            </p>

            <div className="ai-test-flow">
              <div>
                <span>01</span>
                <strong>Profile</strong>
                <small>Resume + interests</small>
              </div>

              <div className="flow-line"></div>

              <div>
                <span>02</span>
                <strong>AI Test</strong>
                <small>Personalized questions</small>
              </div>

              <div className="flow-line"></div>

              <div>
                <span>03</span>
                <strong>Verification</strong>
                <small>Skill intelligence</small>
              </div>
            </div>
          </section>

          <section className="ai-test-config">
            <div className="config-header">
              <div>
                <span>TEST CONFIGURATION</span>
                <h2>Personalized for you</h2>
              </div>

              <div className="ai-spark">✦ AI</div>
            </div>

            <div className="profile-context-card">
              <div className="context-avatar">
                RS
              </div>

              <div className="context-info">
                <strong>{student.name}</strong>
                <span>{student.targetRole}</span>
              </div>

              <div className="context-score">
                <small>Profile</small>
                <strong>82%</strong>
              </div>
            </div>

            <div className="config-block">
              <div className="config-title">
                <span>INTERESTS</span>
                <small>From your profile</small>
              </div>

              <div className="interest-tags">
                {student.interests.map((interest) => (
                  <span key={interest}>
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div className="config-block">
              <div className="config-title">
                <span>SELECTED TEST TOPICS</span>
                <small>From dashboard</small>
              </div>

              <div className="topic-selection">
                {[
                  "React",
                  "JavaScript",
                  "Python",
                  "SQL",
                  "Machine Learning",
                  "Data Science",
                  "FastAPI",
                  "DSA",
                ].map((topic) => {
                  const selected =
                    selectedTopics.includes(topic);

                  return (
                    <button
                      key={topic}
                      className={
                        selected ? "selected" : ""
                      }
                      onClick={() => {
                        setSelectedTopics(
                          (previous) =>
                            previous.includes(topic)
                              ? previous.filter(
                                  (item) =>
                                    item !== topic
                                )
                              : [
                                  ...previous,
                                  topic,
                                ]
                        );
                      }}
                    >
                      {selected ? "✓ " : "+ "}
                      {topic}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="config-block">
              <div className="config-title">
                <span>DIFFICULTY MIX</span>
                <small>AI adaptive distribution</small>
              </div>

              <div className="difficulty-bars">
                <div className="difficulty-row">
                  <span>Easy</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={difficultyMix.easy}
                    onChange={(event) =>
                      setDifficultyMix({
                        ...difficultyMix,
                        easy: Number(
                          event.target.value
                        ),
                      })
                    }
                  />
                  <strong>
                    {difficultyMix.easy}%
                  </strong>
                </div>

                <div className="difficulty-row">
                  <span>Medium</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={difficultyMix.medium}
                    onChange={(event) =>
                      setDifficultyMix({
                        ...difficultyMix,
                        medium: Number(
                          event.target.value
                        ),
                      })
                    }
                  />
                  <strong>
                    {difficultyMix.medium}%
                  </strong>
                </div>

                <div className="difficulty-row">
                  <span>Hard</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={difficultyMix.hard}
                    onChange={(event) =>
                      setDifficultyMix({
                        ...difficultyMix,
                        hard: Number(
                          event.target.value
                        ),
                      })
                    }
                  />
                  <strong>
                    {difficultyMix.hard}%
                  </strong>
                </div>
              </div>
            </div>

            <div className="test-rules">
              <div>
                <span>⌁</span>
                <strong>AI Generated</strong>
                <small>Based on your profile</small>
              </div>

              <div>
                <span>◷</span>
                <strong>Timed</strong>
                <small>Each question timed</small>
              </div>

              <div>
                <span>◆</span>
                <strong>Adaptive</strong>
                <small>Mixed difficulty</small>
              </div>
            </div>

            <button
              className="start-test-button"
              onClick={startTest}
              disabled={
                loadingQuestions ||
                selectedTopics.length === 0
              }
            >
              {loadingQuestions
                ? "Generating Your Test..."
                : "Generate & Start Test"}
              <span>→</span>
            </button>
          </section>
        </main>
      </div>
    );
  }

  /*
  ============================================================
  RESULT PAGE
  ============================================================
  */

  if (testCompleted && scoreJSON) {
    return (
      <div className="ai-result-page">
        <header className="ai-test-header">
          <button
            className="ai-test-brand"
            onClick={() =>
              navigate("/student/dashboard")
            }
          >
            <span>SI</span>
            <div>
              <strong>SkillBridge</strong>
              <small>Test Results</small>
            </div>
          </button>

          <button
            className="result-dashboard-button"
            onClick={() =>
              navigate(
                "/student/dashboard?section=skills"
              )
            }
          >
            Update Skill Profile →
          </button>
        </header>

        <main className="result-container">
          <section className="result-hero">
            <div className="result-check">
              ✓
            </div>

            <span>TEST COMPLETED</span>

            <h1>Your assessment is complete.</h1>

            <p>
              Your performance data has been structured
              for your student skill profile.
            </p>
          </section>

          <section className="result-score-grid">
            <div className="main-score-card">
              <div className="score-ring">
                <div>
                  <strong>
                    {scoreJSON.score.percentage}%
                  </strong>
                  <span>Score</span>
                </div>
              </div>

              <div>
                <span>OVERALL PERFORMANCE</span>
                <h2>
                  {scoreJSON.score.obtained} /{" "}
                  {scoreJSON.score.maximum}
                </h2>

                <p>
                  {scoreJSON.performance.correctAnswers}{" "}
                  correct •{" "}
                  {
                    scoreJSON.performance.attemptedAnswers
                  }{" "}
                  attempted
                </p>
              </div>
            </div>

            <div className="result-stat">
              <span>QUESTIONS</span>
              <strong>
                {scoreJSON.testMetadata.totalQuestions}
              </strong>
              <small>Total Questions</small>
            </div>

            <div className="result-stat">
              <span>TIME</span>
              <strong>
                {Math.round(
                  scoreJSON.testMetadata
                    .durationSeconds / 60
                )}
                m
              </strong>
              <small>Time Taken</small>
            </div>

            <div className="result-stat">
              <span>ACCURACY</span>
              <strong>
                {scoreJSON.performance.correctAnswers >
                0
                  ? Math.round(
                      (scoreJSON.performance
                        .correctAnswers /
                        scoreJSON.testMetadata
                          .totalQuestions) *
                        100
                    )
                  : 0}
                %
              </strong>
              <small>Question Accuracy</small>
            </div>
          </section>

          <section className="result-details">
            <div className="result-panel">
              <div className="result-panel-header">
                <div>
                  <span>QUESTION ANALYSIS</span>
                  <h2>Performance Breakdown</h2>
                </div>
              </div>

              <div className="question-result-list">
                {scoreJSON.questionResults.map(
                  (result, index) => (
                    <div
                      className="question-result"
                      key={result.questionId}
                    >
                      <div className="question-result-number">
                        {index + 1}
                      </div>

                      <div>
                        <strong>
                          {result.topic}
                        </strong>

                        <span>
                          {result.difficulty}
                        </span>
                      </div>

                      <div className="question-result-status">
                        {result.correct ? "✓" : "×"}
                      </div>

                      <strong>
                        {result.score}/
                        {result.maxScore}
                      </strong>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="json-panel">
              <div className="json-header">
                <span>RESULT JSON</span>

                <button
                  onClick={() =>
                    navigator.clipboard.writeText(
                      JSON.stringify(
                        scoreJSON,
                        null,
                        2
                      )
                    )
                  }
                >
                  Copy JSON
                </button>
              </div>

              <pre>
                {JSON.stringify(
                  scoreJSON,
                  null,
                  2
                )}
              </pre>
            </div>
          </section>

          <section className="result-actions">
            <button
              className="retry-test-button"
              onClick={restartTest}
            >
              Retake Test
            </button>

            <button
              className="result-primary-button"
              onClick={() =>
                navigate(
                  "/student/dashboard?section=skills"
                )
              }
            >
              View My Skill Profile →
            </button>
          </section>
        </main>
      </div>
    );
  }

  /*
  ============================================================
  LEETCODE-STYLE TEST PLAYGROUND
  ============================================================
  */

  return (
    <div className="leetcode-test-page">
      <header className="leetcode-topbar">
        <div className="leetcode-left">
          <button
            className="leetcode-logo"
            onClick={() =>
              navigate("/student/dashboard")
            }
          >
            SI
          </button>

          <div className="test-title">
            <span>AI ASSESSMENT</span>
            <strong>
              {student.targetRole}
            </strong>
          </div>

          <div className="test-progress">
            Question{" "}
            <strong>
              {currentQuestionIndex + 1}
            </strong>{" "}
            / {questions.length}
          </div>
        </div>

        <div className="leetcode-right">
          <div
            className={`question-timer ${
              questionTimeLeft <= 30
                ? "danger"
                : ""
            }`}
          >
            <span>◷</span>
            {formatTime(questionTimeLeft)}
          </div>

          <button
            className="finish-test-top"
            onClick={finishTest}
          >
            Submit Test
          </button>

          <div className="test-user">
            <span>RS</span>
          </div>
        </div>
      </header>

      <div className="question-progress-line">
        <div
          style={{
            width: `${timerPercentage}%`,
          }}
        ></div>
      </div>

      <main className="leetcode-workspace">
        <aside className="question-sidebar">
          <div className="sidebar-test-info">
            <span>TEST TOPICS</span>
            <div className="sidebar-topic-list">
              {selectedTopics.map((topic) => (
                <span key={topic}>{topic}</span>
              ))}
            </div>
          </div>

          <div className="question-list">
            <span className="sidebar-heading">
              QUESTIONS
            </span>

            {questions.map((question, index) => {
              const answered =
                Boolean(answers[question.id]);

              return (
                <button
                  key={question.id}
                  className={`question-number ${
                    index === currentQuestionIndex
                      ? "active"
                      : ""
                  } ${
                    answered ? "answered" : ""
                  }`}
                  onClick={() => {
                    setCurrentQuestionIndex(index);
                    startQuestionTimer(question);
                  }}
                >
                  <span>{index + 1}</span>

                  <div>
                    <strong>
                      {question.topic}
                    </strong>

                    <small>
                      {question.difficulty}
                    </small>
                  </div>

                  {answered && (
                    <i>✓</i>
                  )}
                </button>
              );
            })}
          </div>

          <div className="sidebar-profile">
            <span>YOUR PROFILE</span>

            <div className="mini-profile">
              <div>RS</div>
              <section>
                <strong>{student.name}</strong>
                <small>
                  {student.targetRole}
                </small>
              </section>
            </div>

            <button
              onClick={() =>
                navigate("/student/dashboard")
              }
            >
              View Profile
            </button>
          </div>
        </aside>

        <section className="problem-panel">
          <div className="problem-header">
            <div>
              <span className="problem-topic">
                {currentQuestion?.topic}
              </span>

              <h1>
                {currentQuestion?.question}
              </h1>
            </div>

            <span
              className={`difficulty-badge ${currentQuestion?.difficulty.toLowerCase()}`}
            >
              {currentQuestion?.difficulty}
            </span>
          </div>

          <div className="problem-description">
            <p>
              {currentQuestion?.description}
            </p>

            <h3>Constraints</h3>

            <ul>
              {currentQuestion?.constraints?.map(
                (constraint) => (
                  <li key={constraint}>
                    {constraint}
                  </li>
                )
              )}
            </ul>

            <h3>Examples</h3>

            <div className="examples">
              {currentQuestion?.examples?.map(
                (example, index) => (
                  <div
                    className="example-box"
                    key={index}
                  >
                    <span>
                      Example {index + 1}
                    </span>

                    <pre>
                      Input: {example.input}
                      {"\n"}
                      Output: {example.output}
                    </pre>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        <section className="code-panel">
          <div className="code-toolbar">
            <div className="editor-tabs">
              <button className="editor-tab active">
                solution.
                {codeLanguage === "python"
                  ? "py"
                  : codeLanguage === "sql"
                  ? "sql"
                  : "js"}
              </button>
            </div>

            <div className="editor-tools">
              <select
                value={codeLanguage}
                onChange={(event) =>
                  setCodeLanguage(
                    event.target.value
                  )
                }
              >
                <option value="javascript">
                  JavaScript
                </option>

                <option value="python">
                  Python
                </option>

                <option value="sql">
                  SQL
                </option>
              </select>

              <button
                onClick={() =>
                  updateAnswer(
                    currentQuestion?.starterCode ||
                      ""
                  )
                }
              >
                Reset
              </button>
            </div>
          </div>

          <div className="code-editor">
            <div className="line-numbers">
              {Array.from(
                {
                  length: Math.max(
                    14,
                    (
                      answers[
                        currentQuestion?.id
                      ] ||
                      currentQuestion
                        ?.starterCode ||
                      ""
                    ).split("\n").length
                  ),
                },
                (_, index) => (
                  <span key={index}>
                    {index + 1}
                  </span>
                )
              )}
            </div>

            <textarea
              value={
                answers[currentQuestion?.id] ??
                currentQuestion?.starterCode ??
                ""
              }
              onChange={(event) =>
                updateAnswer(
                  event.target.value
                )
              }
              spellCheck="false"
              autoCapitalize="off"
              autoCorrect="off"
              placeholder="// Write your solution here..."
            />
          </div>

          <div className="code-console">
            <div className="console-header">
              <div>
                <span>CONSOLE</span>
                <strong>
                  Test environment
                </strong>
              </div>

              <button
                onClick={() =>
                  alert(
                    "Code execution placeholder. Connect this button to FastAPI secure code runner."
                  )
                }
              >
                ▶ Run Code
              </button>
            </div>

            <div className="console-output">
              <span>⌘</span>
              <p>
                Run your code to test against sample
                cases.
              </p>
            </div>
          </div>

          <div className="code-footer">
            <button
              className="previous-question"
              disabled={
                currentQuestionIndex === 0
              }
              onClick={
                handlePreviousQuestion
              }
            >
              ← Previous
            </button>

            <div className="answer-status">
              {answers[currentQuestion?.id] ? (
                <>
                  <span className="saved-dot"></span>
                  Answer saved
                </>
              ) : (
                <>
                  <span className="empty-dot"></span>
                  Not answered
                </>
              )}
            </div>

            <button
              className="next-question"
              onClick={() =>
                handleNextQuestion(false)
              }
            >
              {currentQuestionIndex ===
              questions.length - 1
                ? "Finish Test"
                : "Next Question →"}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AITestPortal;