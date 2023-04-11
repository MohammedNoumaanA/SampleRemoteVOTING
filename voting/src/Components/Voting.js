import { useState, useEffect } from 'react';

export default function Voting({ setScreen, vote, IDtoCandidate }) {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft === 0) {
      setScreen('home');
    } else {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, setScreen]);

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
      <button className="absolute top-14 left-10 underline" onClick={() => setScreen('home')}>
        Back
      </button>
      <h1 className="text-4xl font-extrabold">Voting</h1>
      <div className="flex flex-col gap-4 items-center justify-center">
        {IDtoCandidate.map((candidate, i) => {
          return (
            <div key={i} className="flex flex-col gap-4 items-center justify-center">
              <img src={candidate.imageUrl} alt="Candidate" className="w-40 h-40 rounded-full" />
              <h1 className="text-2xl font-bold">{candidate.name}</h1>
              <button onClick={() => vote(i + 1)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Vote
              </button>
            </div>
          );
        })}
      </div>
      <p className="text-lg font-bold mt-4">{timeLeft} seconds remaining</p>
    </div>
  );
}