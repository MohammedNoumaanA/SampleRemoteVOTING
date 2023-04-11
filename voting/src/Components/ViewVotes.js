import React, { useState, useEffect } from 'react';

export default function ViewVotes({ setScreen, viewVotes, IDtoCandidate }) {
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    const fetchVotes = async () => {
      const votesArray = [];
      for (let i = 1; i <= IDtoCandidate.length; i++) {
        const voteCount = await viewVotes(i);
        votesArray.push(voteCount);
      }
      setVotes(votesArray);
    };
    fetchVotes();
  }, [viewVotes, IDtoCandidate]);

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
      <button className="absolute top-14 left-10 underline" onClick={() => setScreen('home')}>
        Back
      </button>
      <h1 className="text-4xl font-extrabold">Votes</h1>
      <div className="flex flex-col gap-4 items-center justify-center">
        {IDtoCandidate.map((candidate, i) => {
          return (
            <div key={i} className="flex flex-col gap-4 items-center justify-center">
              <img src={candidate.imageUrl} alt="Candidate" className="w-40 h-40 rounded-full" />
              <h1 className="text-2xl font-bold">{candidate.name}</h1>
              <p>Votes: {votes[i]?.toString()}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}