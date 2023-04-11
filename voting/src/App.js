import { ConnectButton } from "@rainbow-me/rainbowkit";
import Logo from './RemoteVoting.png';
import { useAccount, useContract, useSigner } from 'wagmi'
import { useState,useEffect } from "react";

import AddCandidate from "./Components/AddCandidate";
import Voting from "./Components/Voting";
import RemoveCandidate from "./Components/RemoveCandidate";
import ViewVotes from "./Components/ViewVotes";

import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./CONTRACT";

function App() {

  const { address } = useAccount()
  const [screen, setScreen] = useState('home')

  const { data: signer } = useSigner()
	const contract = useContract({
		address: CONTRACT_ADDRESS,
		abi: CONTRACT_ABI,
		signerOrProvider: signer
	})

	console.log(contract)

  const [IDtoCandidate, setIDtoCandidate] = useState([])
  const [totalVotes, setTotalVotes] = useState([])

  const getCandidates = async() => {
    try {
      const count = await contract.candidateCount()
      console.log("Candidate Count ", count.toString())
      let candidatesArr = []
      for(let i = 1; i <= count; i++) {
        const candidate = await contract.IDtoCandidate(i)
        console.log(candidate)
        let candidate_obj = {
          id: candidate[0],
          name: candidate[1],
          party: candidate[2],
          imageUrl: candidate[3]
        }
        candidatesArr.push(candidate_obj)
      }
      setIDtoCandidate(candidatesArr)
    } catch(err) {
      console.log(err)
    }
  }

  const getTotalVotes = async() => {
    try {
      const count = await contract.totalVotes()
      console.log("Total Votes ", count.toString())
      setTotalVotes(count.toString())
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
		if(contract) {
			getCandidates();
      getTotalVotes();
		}
  }, [contract])

	console.log(IDtoCandidate)

  const addCandidate = async(id, name, party, imageUri) => {
    try {
      const tx = await contract.addCandidate(id, name, party, imageUri)
      await tx.wait()
      console.log(tx)
      console.log("Candidate Added")
    } catch(err) {
      console.log(err)
    }
  }
  
  const vote = async(candidateId) => {
    try {
      const tx = await contract.vote(candidateId)
      await tx.wait()
      console.log(tx)
      console.log("Voted")
    } catch(err) {
      console.log(err)
    }
  }

  const removeCandidate = async (candidateId) => {
    try {
      const tx = await contract.removeCandidate(candidateId);
      await tx.wait();
      console.log(tx);
      console.log("Candidate Removed");
    } catch (err) {
      console.log(err);
    }
  };
  
  const viewVotes = async (id) => {
    try {
      const votes = await contract.viewVotes(id);
      console.log(votes);
      // alert(votes)
      return votes;
    } catch (err) {
      console.log(err);
    }
  };

  const RenderScreen = () => {
    return (
      <div className="flex flex-col gap-4 items-center justify-center min-h-screen flex-wrap">
        {screen === "addCandidate" ? (
          <AddCandidate setScreen={setScreen} addCandidate={addCandidate} />
        ) : screen === "vote" ? (
          <Voting setScreen={setScreen} vote={vote} IDtoCandidate={IDtoCandidate} />
        ) : screen === "removeCandidate" ? (
          <RemoveCandidate setScreen={setScreen} removeCandidate={removeCandidate} />
        ) : screen === "viewVotes" ? (
          <ViewVotes setScreen={setScreen} viewVotes={viewVotes} IDtoCandidate={IDtoCandidate} />
        ) : console.log("")}
      </div>
    );
  };

	return (
		<div className=" bg-purple-500 text-white">
			<div className="flex items-center justify-between flex-row px-4 py-2">
				<img src={Logo} alt="React Logo" className="w-12" />
				<h1 className="text-2xl font-bold">Remote Voting</h1>
        <div className="flex flex-col"><ConnectButton />
        <p>(Connect Wallet to Start Voting)</p></div>
				
			</div>
        {
          screen === 'home' ? (
            <div className="flex items-center justify-center min-h-screen flex-col ">
				<h1 className="text-4xl font-extrabold min-h-[50%] py-4">Start Voting</h1>
              {
                address ? (
                  <div className="flex flex-row gap-4 items-center justify-center">
                    <button onClick={() => setScreen('addCandidate')} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Add Candidate</button>
                    <button onClick={() => setScreen('vote')} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Vote</button>
                    <button onClick={() => setScreen('removeCandidate')} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Remove Candidate</button>
                    <button onClick={() => setScreen('viewVotes')} className="bg-blue-500 text-white px-4 py-2 rounded-lg">View Votes</button>
                  </div>
                ) : (
                  <ConnectButton />
                )
              }
            </div>
          ) : (
            <RenderScreen />
          )
        }
      <div><footer className="text-gray-600 body-font bg-black">
  <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
    <a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-purple-500 rounded-full" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
      <span class="ml-3 text-xl text-white">Remote Voting</span>
    </a>
    <p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2023 —
      <a href="https://twitter.com/knyttneve" class="text-gray-600 ml-1" rel="noopener noreferrer" target="_blank">@Bad#Hash</a>
    </p>
    <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
      <a class="text-gray-500">
        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
        </svg>
      </a>
      <a class="ml-3 text-gray-500">
        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
        </svg>
      </a>
      <a class="ml-3 text-gray-500">
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
        </svg>
      </a>
      <a class="ml-3 text-gray-500">
        <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0" class="w-5 h-5" viewBox="0 0 24 24">
          <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
          <circle cx="4" cy="4" r="2" stroke="none"></circle>
        </svg>
      </a>
    </span>
  </div>
</footer></div>
		</div>
	);
}

export default App;
