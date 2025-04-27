import {
  tech,
  service,
  company,
  projects as projectImages
} from "../../public/assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: service.web,
  },
  {
    title: "React Developer",
    icon: service.mobile,
  },
  {
    title: "Backend Developer",
    icon: service.backend,
  },
  {
    title: "Open Source Contributor",
    icon: service.creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: tech.html,
  },
  {
    name: "CSS 3",
    icon: tech.css,
  },
  {
    name: "JavaScript",
    icon: tech.javascript,
  },
  {
    name: "TypeScript",
    icon: tech.typescript,
  },
  {
    name: "React JS",
    icon: tech.reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: tech.redux,
  },
  {
    name: "Tailwind CSS",
    icon: tech.tailwind,
  },
  {
    name: "Node JS",
    icon: tech.nodejs,
  },
  {
    name: "MongoDB",
    icon: tech.mongodb,
  },
  {
    name: "Three JS",
    icon: tech.threejs,
  },
  {
    name: "git",
    icon: tech.git,
  },
  {
    name: "figma",
    icon: tech.figma,
  },
  {
    name: "docker",
    icon: tech.docker,
  },
];

const experiences = [
  {
    title: "MERN Stack Developer Intern",
    company_name: "CodeXIntern",
    icon: company.starbucks,
    iconBg: "#383E56",
    date: "June 2023 - Present",
    points: [
      "Developing and maintaining web applications using React.js, Node.js, and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Open Source Contributor",
    company_name: "Hacktoberfest",
    icon: company.tesla,
    iconBg: "#E6DEDD",
    date: "Oct 2023 - Nov 2023",
    points: [
      "Contributing to multiple open-source projects during Hacktoberfest 2023.",
      "Implementing new features and fixing bugs in various repositories.",
      "Collaborating with project maintainers and other contributors.",
      "Learning best practices for open-source development and version control.",
    ],
  },
  {
    title: "Google Cloud Developer",
    company_name: "Google Cloud Platform",
    icon: company.google,
    iconBg: "#383E56",
    date: "Jan 2023 - Present",
    points: [
      "Designing and deploying cloud-based solutions using Google Cloud Platform.",
      "Implementing serverless architectures with Cloud Functions and Firebase.",
      "Optimizing application performance and scalability in cloud environments.",
      "Participating in Google Cloud certification training programs.",
    ],
  },
  {
    title: "Freelance Web Developer",
    company_name: "Self Employed",
    icon: company.freelance,
    iconBg: "#E6DEDD",
    date: "Jan 2022 - Present",
    points: [
      "Developing custom websites and web applications for various clients.",
      "Creating responsive and user-friendly interfaces using modern frameworks.",
      "Managing client relationships and delivering projects on schedule.",
      "Providing ongoing maintenance and support for completed projects.",
    ],
  },
];

const projects = [
  {
    name: "MDU IITM LEARN",
    description:
      "MDU IITM Learn is a comprehensive web-based platform built specifically for MDU IITM B.Tech students. It provides easy access to academic notes, previous year question papers (PYQs), a CGPA calculator, and detailed syllabi, all in one place. Designed to simplify and enhance the learning experience, the platform ensures that students have all essential resources readily available for academic success.",
    tags: [
      {
        name: "Next js 14",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind css",
        color: "pink-text-gradient",
      },
      {
        name: "React Context API",
        color: "green-text-gradient",
      },
      {
        name: "Vercel",
        color: "pink-text-gradient",
      },
      {
        name: "TypeScript",
        color: "blue-text-gradient",
      },
    ],
    image: '/pro1.jpg',
    source_code_link: "https://github.com/shbhmexe/Project-2025/tree/main/MDU_IITM_Learn",
    live_demo_link: "https://mduiitmlearn.vercel.app/"
  },
  {
    name: "Communion",
    description:
      "Communion is a modern web application designed to connect communities across different faiths and backgrounds. The platform enables users to discover events, join communities, and build meaningful relationships with people from diverse backgrounds.",
    tags: [
      {
        name: "React.js",
        color: "blue-text-gradient",
      },
      {
        name: "React Context API",
        color: "green-text-gradient",
      },
      {
        name: "Tailwind CSS",
        color: "pink-text-gradient",
      },
      {
        name: "Leaflet.js",
        color: "blue-text-gradient",
      },
      {
        name: "Local Storage",
        color: "green-text-gradient",
      },
      {
        name: "Auth",
        color: "pink-text-gradient",
      },
    ],
    image: '/pro2.jpg',
    source_code_link: "https://github.com/shbhmexe/Project-2025/tree/main/communion-app",
    live_demo_link: "https://communion-liard.vercel.app/"
  },
  {
    name: "Trip Guide",
    description:
      "A next-generation hiring platform developed using Next.js, designed to revolutionize the recruitment process. It leverages AI technologies for advanced resume parsing, intelligent job matching based on candidate profiles, and in-depth application analysis. The platform streamlines the hiring workflow for both recruiters and applicants, providing faster, smarter, and more accurate hiring decisions.",
    tags: [
      {
        name: "Next.js 15",
        color: "blue-text-gradient",
      },
      {
        name: "TypeScript",
        color: "green-text-gradient",
      },
      {
        name: "Prisma ORM",
        color: "pink-text-gradient",
      },
      {
        name: "PostgreSQL",
        color: "blue-text-gradient",
      },
      {
        name: "NextAuth.js",
        color: "green-text-gradient",
      },
      {
        name: "OpenAI API",
        color: "pink-text-gradient",
      },
    ],
    image: '/pro3.jpg',
    source_code_link: "https://github.com/shbhmexe/Project-2025/tree/main/AI-hiring-platform",
    live_demo_link: "https://ai-hiring-platform.vercel.app/"
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but this developer proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like this person does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After this developer optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

export { services, technologies, experiences, testimonials, projects }; 