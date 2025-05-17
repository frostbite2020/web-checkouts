'use client'

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const goToProducts = () => {
    router.push(`/products`);
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Welcome to WebCheckouts</h1>
      <p className="text-gray-600">Use the menu to explore products.</p>
      <Button onClick={goToProducts} color="success" variant='contained'>Go to Products</Button>
    </main>
  );
}