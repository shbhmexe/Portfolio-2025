# Modern 3D Portfolio Website

![Portfolio Preview](/public/pro1.jpg)

A captivating 3D portfolio website built with cutting-edge web technologies to showcase your skills, projects, and professional experience.

## ✨ Features

- **Interactive 3D Elements** - Engaging Three.js animations and models
- **Modern UI Design** - Clean and professional interface with smooth transitions
- **Dark/Light Mode** - Toggle between themes for comfortable viewing
- **Responsive Layout** - Optimized for all devices from mobile to desktop
- **Dynamic Content Sections**:
  - About/Bio
  - Work Timeline
  - Projects Showcase
  - Skills & Technologies
  - Contact Form
- **Performance Optimized** - Fast loading times with Next.js
- **SEO Ready** - Built with best practices for search engines
- **Email Integration** - Functional contact form with MongoDB storage

## 🛠️ Tech Stack

- **Frontend Framework**: [Next.js 14](https://nextjs.org/) - React framework with server-side rendering
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **3D Graphics**:
  - [Three.js](https://threejs.org/) - JavaScript 3D library
  - [React Three Fiber](https://github.com/pmndrs/react-three-fiber) - React renderer for Three.js
  - [Drei](https://github.com/pmndrs/drei) - Helper components for R3F
  - [Spline](https://spline.design/) - 3D design tool integration
- **Animations**: [Framer Motion](https://www.framer.com/motion/) - React animation library
- **UI Components**:
  - [React Vertical Timeline](https://www.npmjs.com/package/react-vertical-timeline-component) - For experience timeline
  - [React Parallax Tilt](https://www.npmjs.com/package/react-parallax-tilt) - For tilting card effects
  - [React Icons](https://react-icons.github.io/react-icons/) - Icon library
- **Backend Integration**:
  - [MongoDB](https://www.mongodb.com/) - Database for storing form submissions
  - [Mongoose](https://mongoosejs.com/) - MongoDB object modeling
  - [Nodemailer](https://nodemailer.com/) - For sending emails from contact form
- **Deployment**: [Vercel](https://vercel.com/) - Platform optimized for Next.js

## 📋 Project Structure

```
/
├── app/                # Next.js application code
│   ├── api/            # API routes for form handling
│   ├── components/     # React components
│   │   ├── canvas/     # Three.js components
│   │   └── ...         # UI components
│   ├── constants/      # App constants and data
│   ├── context/        # React context providers
│   └── pages/          # App pages
├── public/             # Static assets
│   └── assets/         # Images and media files
├── lib/                # Utility functions
├── models/             # MongoDB models
└── types/              # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16.8.0 or later
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
   - Create a `.env.local` file in the project root
   - Add the required variables as described in the Environment Setup section

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔧 Customization

1. Update your personal information in `app/constants/index.ts`
2. Replace project images in the `public` directory
3. Modify 3D models in `app/components/canvas/` to match your preferences
4. Customize color themes in `tailwind.config.js`
5. Add or remove sections as needed in `app/page.tsx`

## 📬 Contact Form Setup

To enable the contact form functionality:

1. Create a `.env.local` file with the following variables:

```bash
# MongoDB Connection String
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password  # Use App Password for Gmail
PERSONAL_EMAIL=your_receiving_email@example.com
```

2. For Gmail users:
   - Enable 2-Step Verification in your Google Account
   - Generate an App Password in security settings
   - Use this password in the EMAIL_PASS environment variable

## 📦 Deployment

This portfolio is optimized for deployment on Vercel:

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Configure environment variables in the Vercel dashboard
4. Deploy!

For other deployment options, refer to [Next.js deployment documentation](https://nextjs.org/docs/deployment)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👏 Acknowledgements

- 3D models and design inspiration from various sources
- JavaScript Mastery for educational resources
- Vercel for hosting platform
- Open source community for amazing libraries 