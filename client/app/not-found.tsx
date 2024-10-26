import Link from 'next/link';

export default function Custom404() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404 - Page Not Found</h1>
            <p>Oops! The page you are looking for has been moved or doesn't exist.</p>
            <Link href="/">Go to Home</Link>
        </div>
    );
}
