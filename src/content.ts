import { PortfolioContent } from './types';

/**
 * ============================================================================
 * PORTFOLIO CONTENT CONFIGURATION
 * ============================================================================
 * Hi Anuska! You can edit all your portfolio content directly in this file.
 * 
 * - To change text: Edit the text inside the quotation marks "..."
 * - To change links: Replace URLs with your actual links
 * - To add/remove items: Follow the existing array structure [ ... ]
 * - To rename case study sections: Change the "title" fields inside the sections array
 * ============================================================================
 */

export const portfolioContent: PortfolioContent = {
  // 1. PERSONAL INFORMATION (Hero & Header)
  personal: {
    name: "Anuska Mukherjee",
    role: "Aspiring Product Manager",
    heroSubtitle: "Dedicated to solving real user problems through evidence-based product discovery, thoughtful prioritization, and collaborative execution.",
    location: "Available for PM & APM roles",
    tagline: "Exploring user needs • Framing opportunities • Crafting impact",
  },

  // 2. ABOUT ME SECTION
  about: {
    title: "About Me",
    bioParagraphs: [
      "Hello! I'm Anuska Mukherjee, an aspiring Product Manager with a passion for understanding the 'why' behind user behavior and translating ambiguous problems into clear, impactful digital solutions.",
      "My approach centers on rigorous user research, continuous discovery, and empathetic stakeholder communication. I enjoy bridging cross-functional boundaries between design, engineering, and business strategy to deliver value incrementally.",
      "Currently seeking Associate Product Manager (APM) and Product Manager opportunities where I can contribute to user-centric products and learn within a high-velocity team.",
    ],
    focusAreas: [
      "Product Discovery & User Interviews",
      "Problem Framing & Value Proposition Design",
      "Feature Prioritization & MVP Scoping",
      "Cross-functional Collaboration (Design & Eng)",
    ],
    quickFacts: [
      { label: "Target Roles", value: "APM / Associate PM / Product Analyst" },
      { label: "Core Mindset", value: "Customer Empathy & Data-Informed Action" },
      { label: "Work Style", value: "Curious, Structured, Collaborative" },
    ],
  },

  // 3. WORK & CASE STUDIES (Drawer with 9 Expandable Sections)
  projects: [
    {
      id: "project-01",
      number: "01",
      title: "Project One — [Title Placeholder]",
      tagline: "[Short 1-line project summary / hook placeholder]",
      summary: "This is a placeholder for your primary case study. Replace this summary with a concise 2-3 sentence overview of the problem space, target user segment, and core product proposition.",
      role: "Product Manager (Case Study)",
      timeline: "Q1 • 4 Weeks",
      status: "Case Study / Concept",
      tags: ["Product Discovery", "User Research", "MVP Scoping", "Wireframing"],
      links: [
        { label: "Prototype", url: "#", type: "prototype" },
        { label: "GitHub", url: "#", type: "github" },
        { label: "Live Demo", url: "#", type: "demo" },
      ],
      sections: [
        {
          id: "problem",
          title: "Problem",
          content: "[Placeholder: Describe the core user pain point or business challenge. What friction exists today, why does it matter, and what is the cost of not solving it?]",
          guidingQuestions: "What unmet need did users face? What evidence points to this being a high-value problem?",
        },
        {
          id: "discovery",
          title: "Discovery / Research",
          content: "[Placeholder: Outline your research methodology. Include quantitative data, qualitative user interviews, survey findings, competitive landscape teardowns, and key synthesis insights.]",
          guidingQuestions: "Who did you speak with? What surprising insights emerged from user discovery?",
        },
        {
          id: "target-user",
          title: "Target User",
          content: "[Placeholder: Define your primary persona, their mental models, specific behavioral patterns, jobs-to-be-done (JTBD), and current workarounds.]",
          guidingQuestions: "Who is the primary persona? What are their functional, emotional, and social goals?",
        },
        {
          id: "solution",
          title: "Solution",
          content: "[Placeholder: Explain the conceptual solution and value proposition. How does this address the root causes identified in research without introducing unnecessary complexity?]",
          guidingQuestions: "What is the core product hypothesis? How does the solution uniquely solve the user friction?",
        },
        {
          id: "mvp",
          title: "MVP",
          content: "[Placeholder: Detail the Minimum Viable Product scope. What core user journey was built first, and what was intentionally deferred to test the riskiest assumptions fastest?]",
          guidingQuestions: "What was the thinnest slice of value delivered to validate the initial hypothesis?",
        },
        {
          id: "prioritization",
          title: "Prioritization / Decisions",
          content: "[Placeholder: Document your decision-making frameworks (e.g., RICE, MoSCoW, Effort vs. Impact matrix). Explain trade-offs made and features explicitly left out.]",
          guidingQuestions: "What difficult trade-offs were made? What did you say 'no' to and why?",
        },
        {
          id: "testing",
          title: "Testing & Iterations",
          content: "[Placeholder: Share usability testing protocols, feedback loops, friction points observed during testing sessions, and how you iterated on the experience.]",
          guidingQuestions: "What failed or surprised you during prototype testing? How did user feedback reshape the design?",
        },
        {
          id: "outcomes",
          title: "Outcome / Metrics",
          content: "[Placeholder: Define your success metrics (North Star metric, adoption rates, task completion time, retention signals). Outline hypothetical or measured results.]",
          guidingQuestions: "What primary and secondary metrics measure success? What guardrail metrics prevent unintended side-effects?",
        },
        {
          id: "learnings",
          title: "What I Learned",
          content: "[Placeholder: Reflect on your key takeaways as a product thinker. What would you do differently with more time, data, or engineering resources?]",
          guidingQuestions: "What did this project teach you about user empathy, scoping discipline, and product trade-offs?",
        },
      ],
    },
    {
      id: "project-02",
      number: "02",
      title: "Project Two — [Title Placeholder]",
      tagline: "[Short 1-line project summary / hook placeholder]",
      summary: "This is a placeholder for your second project case study. Use this space to demonstrate a different facet of your PM toolkit, such as growth experimentation, workflow redesign, or B2B SaaS tooling.",
      role: "Associate PM / Researcher",
      timeline: "Q2 • 6 Weeks",
      status: "In Progress",
      tags: ["Competitive Analysis", "User Journey Mapping", "Usability Testing"],
      links: [
        { label: "Prototype", url: "#", type: "prototype" },
        { label: "PRD / Spec", url: "#", type: "other" },
      ],
      sections: [
        {
          id: "problem",
          title: "Problem",
          content: "[Placeholder: Describe the specific friction in user workflow or market gap you chose to tackle.]",
          guidingQuestions: "Why does this problem exist and who suffers the most friction?",
        },
        {
          id: "discovery",
          title: "Discovery / Research",
          content: "[Placeholder: Share insights from user discussions, heuristic evaluations, or funnel drop-off analytics.]",
          guidingQuestions: "What primary research or market signals informed this direction?",
        },
        {
          id: "target-user",
          title: "Target User",
          content: "[Placeholder: Profile the user persona, context of use, and behavioral triggers.]",
          guidingQuestions: "What context triggers the user to seek a solution in this space?",
        },
        {
          id: "solution",
          title: "Solution",
          content: "[Placeholder: Overview of the proposed product experience, key features, and core workflows.]",
          guidingQuestions: "What is the primary value proposition?",
        },
        {
          id: "mvp",
          title: "MVP",
          content: "[Placeholder: The initial feature set scoped for rapid validation.]",
          guidingQuestions: "What was included in Phase 1 vs. deferred to Phase 2?",
        },
        {
          id: "prioritization",
          title: "Prioritization / Decisions",
          content: "[Placeholder: Explain the scoring criteria or constraints (technical feasibility, time to market) that shaped the roadmap.]",
          guidingQuestions: "How did you balance business viability with user desire?",
        },
        {
          id: "testing",
          title: "Testing & Iterations",
          content: "[Placeholder: How prototype feedback shaped the visual hierarchy or simplified steps.]",
          guidingQuestions: "What changes resulted directly from user feedback?",
        },
        {
          id: "outcomes",
          title: "Outcome / Metrics",
          content: "[Placeholder: Anticipated or measured conversion, retention, and satisfaction improvements.]",
          guidingQuestions: "Which key performance indicators determine validation?",
        },
        {
          id: "learnings",
          title: "What I Learned",
          content: "[Placeholder: PM reflection on stakeholder alignment, managing scope creep, and maintaining clarity.]",
          guidingQuestions: "What was the most challenging product decision?",
        },
      ],
    },
    {
      id: "project-03",
      number: "03",
      title: "Project Three — [Title Placeholder]",
      tagline: "[Short 1-line project summary / hook placeholder]",
      summary: "This is a placeholder for your third project. You can feature a product redesign, a strategy teardown, an end-to-end product requirements document (PRD), or an innovative micro-app.",
      role: "Product Strategist",
      timeline: "Q3 • 3 Weeks",
      status: "Concept Spec",
      tags: ["Product Strategy", "Roadmapping", "Feature Architecture"],
      links: [
        { label: "Design File", url: "#", type: "figma" },
        { label: "Live Demo", url: "#", type: "demo" },
      ],
      sections: [
        {
          id: "problem",
          title: "Problem",
          content: "[Placeholder: Define the problem statement, context, and why existing alternatives fall short.]",
        },
        {
          id: "discovery",
          title: "Discovery / Research",
          content: "[Placeholder: Summarize secondary research, user interviews, and market benchmarks.]",
        },
        {
          id: "target-user",
          title: "Target User",
          content: "[Placeholder: Target audience segments, pain points, and user journey gaps.]",
        },
        {
          id: "solution",
          title: "Solution",
          content: "[Placeholder: The solution concept and why it provides a 10x better experience.]",
        },
        {
          id: "mvp",
          title: "MVP",
          content: "[Placeholder: Boundary conditions, essential user stories, and acceptance criteria.]",
        },
        {
          id: "prioritization",
          title: "Prioritization / Decisions",
          content: "[Placeholder: Trade-offs made between implementation complexity and user benefit.]",
        },
        {
          id: "testing",
          title: "Testing & Iterations",
          content: "[Placeholder: Validation findings, prototype testing sessions, and user quotes.]",
        },
        {
          id: "outcomes",
          title: "Outcome / Metrics",
          content: "[Placeholder: Success metrics, North Star definition, and target milestones.]",
        },
        {
          id: "learnings",
          title: "What I Learned",
          content: "[Placeholder: Lessons on scoping, documentation, and product storytelling.]",
        },
      ],
    },
  ],

  // 4. JOURNEY (Education & Previous Work Experience in Chronological Order)
  journey: [
    {
      id: "journey-01",
      type: "education",
      period: "2020 – 2024",
      roleOrDegree: "[Degree / Major Placeholder — e.g. B.Tech / B.S. in Engineering or Business]",
      organization: "[University / Institute Name Placeholder]",
      location: "[City, Country]",
      shortSummary: "Foundational coursework in systems thinking, quantitative problem solving, and analytical methodologies.",
      details: [
        "[Placeholder: Relevant coursework: e.g. Data Structures, Business Analytics, Human-Computer Interaction]",
        "[Placeholder: Academic projects, capstone leadership, or campus organization initiatives]",
        "[Placeholder: Key academic honors, awards, or student leadership roles]",
      ],
    },
    {
      id: "journey-02",
      type: "experience",
      period: "2023 – 2024",
      roleOrDegree: "[Job Title Placeholder — e.g. Associate Product Intern / Business Analyst]",
      organization: "[Company / Organization Name Placeholder]",
      location: "[City, Country or Remote]",
      shortSummary: "Collaborated on customer discovery, mapped end-to-end user journeys, and supported sprint planning with engineering teams.",
      details: [
        "[Placeholder: Conducted customer feedback synthesis across user tickets and interview sessions]",
        "[Placeholder: Authored product requirements documents (PRDs) and user stories with acceptance criteria]",
        "[Placeholder: Partnered with UI/UX designers and software engineers during weekly agile ceremonies]",
      ],
    },
    {
      id: "journey-03",
      type: "experience",
      period: "2022 – 2023",
      roleOrDegree: "[Previous Role Placeholder — e.g. Project Lead / Product Operations Fellow]",
      organization: "[Organization / Startup Name Placeholder]",
      location: "[City, Country]",
      shortSummary: "Coordinated cross-functional initiatives, monitored operational workflows, and gathered user requirement data.",
      details: [
        "[Placeholder: Tracked engagement metrics and reported weekly progress to team stakeholders]",
        "[Placeholder: Led usability testing with early adopters to identify onboarding friction points]",
        "[Placeholder: Streamlined operational processes reducing turnaround times]",
      ],
    },
  ],

  // 5. SKILLS SECTION
  skills: [
    {
      category: "Product Discovery & Strategy",
      items: [
        "User Interviews & Qualitative Research",
        "Problem Framing & Opportunity Solution Trees",
        "Competitive Landscape Analysis",
        "Value Proposition Design",
        "Hypothesis Formulation",
      ],
    },
    {
      category: "Execution & Prioritization",
      items: [
        "PRD & User Story Writing",
        "MVP Scoping & Feature Trade-offs",
        "Frameworks (RICE, MoSCoW, Effort vs. Impact)",
        "Agile / Scrum Sprint Collaboration",
        "Roadmapping & Release Planning",
      ],
    },
    {
      category: "Analytics & Product Sense",
      items: [
        "North Star & Guardrail Metrics",
        "Funnel Drop-off Analysis",
        "User Journey & Empathy Mapping",
        "A/B Testing & Experimentation Principles",
        "Customer Feedback Loops",
      ],
    },
    {
      category: "Tools & Collaboration",
      items: [
        "Figma / FigJam (Wireframing)",
        "Jira / Notion / Linear",
        "Mixpanel / Google Analytics (Foundations)",
        "Miro (Workshops & Mapping)",
        "SQL & Data Querying Basics",
      ],
    },
  ],

  // 6. CONTACT LINKS & RESUME
  contact: {
    email: "mukherjeeanuska01@gmail.com",
    phone: "+91 90516 15043", 
    linkedin: "https://www.linkedin.com/in/anuska-mukherjee-1b1671190/",
    github: "https://github.com/anuska001",
    resumeUrl: "#", // Replace with your Google Drive, Dropbox, or hosted PDF link
    location: "Available Globally / Remote",
    availabilityNote: "Actively interviewing for Associate Product Manager and Product Intern roles. Always happy to connect!",
  },
};
