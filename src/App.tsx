import { useEffect } from 'react';
import { sdk } from '@farcaster/frame-sdk';
import ConnectMenu from './components/connect-wallet';
import MoodSelector from './components/mood-selector';

function App() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  return (
    <div className="min-h-screen crypto-gradient flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl mb-4 animate-pulse">Meme Mood 🚀🌙</h1>
      <p className="text-2xl text-meme-blue mb-8 text-center">
        Share your crypto vibe! 😎
      </p>
      <ConnectMenu />
      <MoodSelector />
      <p className="mt-8 text-meme-neon text-center">
        Join the fun in the{' '}
        <a
          href="https://warpcast.com/~/channel/memes"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          memes channel
        </a>!
      </p>
    </div>
  );
}

export default App;