import { createClient } from '@supabase/supabase-js';
import { MoodVote, Timeframe } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export const moods: string[] = [
  'HODLing 🚀',
  'Dumping 📉',
  'Mooning 🌙',
  'Rekt 😭'
];

export const saveVote = async (vote: Omit<MoodVote, 'id' | 'created_at'>) => {
  const { error } = await supabase
    .from('votes')
    .insert([{ fid: vote.fid, mood_index: vote.mood_index }]);
  if (error) throw new Error(error.message);
};

export const getMoodCounts = async (timeframe: Timeframe) => {
  let query = supabase.from('votes').select('mood_index');

  if (timeframe === Timeframe.Daily) {
    const today = new Date().toISOString().split('T')[0];
    query = query.gte('created_at', `${today}T00:00:00Z`);
  } else if (timeframe === Timeframe.Weekly) {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    query = query.gte('created_at', weekAgo.toISOString());
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);

  const counts = Array(moods.length).fill(0);
  data.forEach((vote: MoodVote) => {
    counts[vote.mood_index]++;
  });
  return counts;
};

export const getTotalVotes = async (timeframe: Timeframe) => {
  let query = supabase.from('votes').select('id', { count: 'exact' });

  if (timeframe === Timeframe.Daily) {
    const today = new Date().toISOString().split('T')[0];
    query = query.gte('created_at', `${today}T00:00:00Z`);
  } else if (timeframe === Timeframe.Weekly) {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    query = query.gte('created_at', weekAgo.toISOString());
  }

  const { count, error } = await query;
  if (error) throw new Error(error.message);
  return count || 0;
};