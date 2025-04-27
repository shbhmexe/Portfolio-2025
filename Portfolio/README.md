# 3D Portfolio Website

A modern 3D portfolio website built with Next.js, TypeScript, Tailwind CSS, Three.js, and Framer Motion.

![Portfolio Preview](./preview.png)

## Features

- Modern and sleek UI design with 3D elements
- Interactive 3D models using Three.js
- Smooth animations with Framer Motion
- Responsive design for all device sizes
- Dark theme
- Contact form functionality
- SEO optimized

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework for production
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Three.js](https://threejs.org/) - 3D library
- [React Three Fiber](https://github.com/pmndrs/react-three-fiber) - React renderer for Three.js
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [EmailJS](https://www.emailjs.com/) - Client-side email sending

## Getting Started

### Prerequisites

- Node.js 16.8.0 or later
- npm or yarn

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/portfolio.git
```

2. Install dependencies
```
npm install
```

3. Run the development server
```
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Customization

1. Replace the placeholder content in `app/constants/index.ts` with your information
2. Update the 3D models in `app/components/canvas/` as needed
3. Add your own projects, skills, and experiences
4. Customize the theme colors in `tailwind.config.js`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [JavaScript Mastery](https://www.youtube.com/@javascriptmastery) for inspiration
- [Maath](https://github.com/pmndrs/maath) for math helpers
- [React Icons](https://react-icons.github.io/react-icons/) for icons 

## Environment Setup for Contact Form

To set up the contact form functionality, you'll need to configure the following environment variables:

1. Create a `.env.local` file in the project root
2. Add the following variables:

```bash
# MongoDB Connection String
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority

# Gmail Email Configuration (for sending emails)
EMAIL_USER=your_gmail_email@gmail.com
EMAIL_PASS=your_gmail_app_password  # Use App Password, not regular password

# Your personal email to receive contact form submissions
PERSONAL_EMAIL=your_personal_email@example.com
```

### Important Notes:
- For `EMAIL_PASS`, generate an App Password in your Google Account settings
- Ensure MongoDB connection string is correct
- Keep `.env.local` private and never commit it to version control

### Recommended Gmail Setup:
1. Enable 2-Step Verification in your Google Account
2. Go to App Passwords section
3. Generate a new App Password for your application
4. Use this password in `EMAIL_PASS` 