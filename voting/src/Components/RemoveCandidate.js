import { useState } from 'react'

export default function RemoveCandidate({ setScreen, removeCandidate }) {

    const [id, setid] = useState('');

    const candidateRemove = async(e) => {
        e.preventDefault()
        console.log(id)
        try {
            if(id === '') {
                alert('Please fill in the candidate ID')
                return
            }
            await removeCandidate(id)
            setScreen('home')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
            <button className="absolute top-14 left-10 underline" onClick={() => setScreen('home')}>Back</button>
            <h1 className="text-4xl font-extrabold">Remove Candidate</h1>
            <form onSubmit={(e) => candidateRemove(e)} className="flex flex-col gap-4 items-center justify-center">
                <input type="text" placeholder="id" onChange={(e) => setid(e.target.value)} className="bg-gray-800 text-white px-4 py-2 rounded-lg" />
                <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded-lg">Remove Candidate</button>
            </form>
        </div>
    );
}