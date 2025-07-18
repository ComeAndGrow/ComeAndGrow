// app/page.jsx
import HomeFeed from '../components/HomeFeed';

// This is a Server Component by default in the App Router
export default function HomePage() {
  return (
    // You can add global layouts or providers here if needed
    <HomeFeed />
  );
}