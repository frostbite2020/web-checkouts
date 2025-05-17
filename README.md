# Product Listing Web App

This is a responsive two-page web application built with **Next.js**. It features:

- **Product List Page**: Displays a list of products in a responsive table layout with filter functionality.
- **Product Detail Page**: Shows detailed information about a selected product.

## Features

- 🧾 **Product Table**: View products in a responsive table powered by **TanStack Table**.
- 🔍 **Filter Support**: Filter products based on various criteria.
- 📱 **Responsive Design**: Works smoothly on both desktop and mobile devices.
- ⚛️ **React Query (TanStack Query)**: Efficient data fetching, caching, and synchronization.
- 🎨 **Tailwind CSS**: Utility-first CSS for rapid UI development.
- 🧩 **Material UI (MUI)**: Clean and accessible UI components.

## Tech Stack

- [Next.js](https://nextjs.org/) – React framework for server-side rendering and routing
- [React Query (TanStack Query)](https://tanstack.com/query) – For managing server state and data fetching
- [TanStack Table](https://tanstack.com/table) – Headless UI for managing tables
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework
- [Material UI (MUI)](https://mui.com/) – UI component library

## Getting Started

Follow these steps to run the app on your local machine:

### 1. Clone the repository
```bash
git clone https://github.com/frostbite2020/web-checkouts.git

cd web-checkouts

npm install
# or
yarn install
# or
pnpm install
# or
bun install
```
run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
