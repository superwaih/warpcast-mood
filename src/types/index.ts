export interface MoodVote {
    id?: number;
    fid: string;
    mood_index: number;
    created_at: string;
  }
  
  export interface Mood {
    name: string;
    emoji: string;
  }
  
  export enum Timeframe {
    Daily = 'daily',
    Weekly = 'weekly',
    AllTime = 'all-time',
  }