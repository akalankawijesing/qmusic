import Link from 'next/link';
export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
            <p className="text-lg">The page you are looking for does not exist.</p>
            <p className="text-lg">Please check the URL or return to the homepage.</p>  
            <Link href="/" className="mt-4 text-blue-500 hover:underline">Go to Homepage</Link>
        </div>
    );
}