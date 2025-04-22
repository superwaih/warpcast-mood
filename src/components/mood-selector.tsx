import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Timeframe } from '../types';
import { saveVote, getMoodCounts, getTotalVotes, moods } from '../lib/supabase';


interface Leaderboard {
  timeframe: Timeframe;
  percentages: { mood: string; percentage: number }[];
}

export default function MoodSelector() {
  const { address } = useAccount();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [leaderboards, setLeaderboards] = useState<Leaderboard[]>([]);
  const [error, setError] = useState<string | null>(null);
  const imageUrl = import.meta.env.VITE_IMAGE_URL;

  const handleVote = async (moodIndex: number) => {
    if (!address) {
      setError('Please connect your wallet to vote.');
      return;
    }

    try {
      setError(null);
      await saveVote({ fid: address, mood_index: moodIndex });
      setSelectedMood(moodIndex);

      // Fetch leaderboards
      const timeframes = [Timeframe.Daily, Timeframe.Weekly, Timeframe.AllTime];
      const newLeaderboards = await Promise.all(
        timeframes.map(async (timeframe) => {
          const counts = await getMoodCounts(timeframe);
          const total = await getTotalVotes(timeframe);
          const percentages = counts.map((count, i) => ({
            mood: moods[i],
            percentage: total > 0 ? Math.round((count / total) * 100) : 0,
          }));
          return { timeframe, percentages };
        })
      );
      setLeaderboards(newLeaderboards);
    } catch (err) {
      setError('Failed to save vote. Try again.');
      console.error(err);
    }
  };

  return (
    <div className="bg-meme-dark border-4 border-meme-neon rounded-lg p-6 shadow-lg w-full max-w-md">
      <h2 className="text-3xl text-center mb-4">What’s your Meme Mood? 🚀🌙</h2>
      <img
        src={imageUrl}
        alt="Meme Mood"
        className="w-full rounded-lg border-2 border-meme-neon mb-4"
      />
      <div className="grid grid-cols-2 gap-4">
        {moods.map((mood, index) => (
          <button
            key={index}
            onClick={() => handleVote(index)}
            disabled={selectedMood !== null}
            className={`bg-meme-pink text-white px-4 py-2 rounded-lg border-2 border-meme-neon hover:bg-meme-blue transition ${
              selectedMood === index ? 'opacity-50' : ''
            }`}
          >
            {mood}
          </button>
        ))}
      </div>
      {error && <p className="text-meme-pink mt-4 text-center">{error}</p>}
      {selectedMood !== null && leaderboards.length > 0 && (
        <div className="mt-6">
          <h3 className="text-2xl text-center mb-2">Leaderboards</h3>
          {leaderboards.map((lb) => (
            <div key={lb.timeframe} className="mb-4">
              <p className="text-meme-neon font-bold capitalize">{lb.timeframe}</p>
              {lb.percentages.map((p, i) => (
                <p key={i} className="text-meme-blue">
                  {p.mood}: {p.percentage}%
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}