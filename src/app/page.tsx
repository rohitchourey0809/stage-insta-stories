"use client"
import StoriesList from './components/StoriesList'

const Home: React.FC = () => {
  return (
    <div>
      <StoriesList />
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
      `}</style>
    </div>
  )
}

export default Home
