import Link from "next/link";

export default function Radio() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Browse</h1>
      <p className="text-lg">Coming soon...</p>
      <Link href="/" className="mt-4 text-blue-500 hover:underline">Go to Homepage</Link>
    </div>
  );
}