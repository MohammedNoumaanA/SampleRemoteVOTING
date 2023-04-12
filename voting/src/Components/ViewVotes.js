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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button className="absolute top-6 left-6 bg-transparent text-black font-semibold py-2 px-4 border border-black rounded hover:bg-black hover:text-white hover:border-transparent transition duration-200" onClick={() => setScreen('home')}>
        Back
      </button>
      <h1 className="text-4xl font-extrabold text-black mt-8 mb-4">Votes</h1>
      <div className="flex flex-row gap-4 items-center justify-center">
        {IDtoCandidate.map((candidate, i) => {
          return (
            <div key={i} className="flex flex-col items-center justify-center bg-white rounded-lg p-4">
              <img src={candidate.imageUrl} alt="Candidate" className="w-28 h-28 rounded-full mb-2" />
              <h1 className="text-lg font-bold text-black">{candidate.name}</h1>
              <p className="text-base text-black">Votes: {votes[i]?.toString()}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}