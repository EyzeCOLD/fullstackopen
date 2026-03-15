import { useState } from "react";
import "./App.css";

function App() {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const initialVotes = Array(anecdotes.length).fill(0);
  const [votes, setVotes] = useState(initialVotes);
  const [selected, setSelected] = useState(0);
  console.log(votes, selected);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />

      <VoteButton selected={selected} votes={votes} setVotes={setVotes} />
      <NextButton setValue={setSelected} randMax={anecdotes.length} />

      <h1>Anecdote with most votes</h1>
      <MostVoted anecdotes={anecdotes} votes={votes} />
    </div>
  );
}

const Anecdote = ({ anecdote, votes }) => {
  console.log("Anecdote: anecdote:", anecdote, "votes:", votes);
  return (
    <>
      <p>
        <i>"{anecdote}"</i>
      </p>
      <p>Has {votes} votes. </p>
    </>
  );
};

const VoteButton = ({ selected, setVotes }) => {
  console.log("VoteButton: selected:", selected, "setVotes:", setVotes);
  return (
    <>
      <button
        onClick={() => {
          setVotes((prevVotes) => {
            const copy = [...prevVotes];
            copy[selected]++;
            return copy;
          });
        }}
      >
        Vote
      </button>
    </>
  );
};

const NextButton = ({ setValue, randMax }) => {
  console.log("NextButton: setValue:", setValue, "randMax:", randMax);
  return (
    <>
      <button
        onClick={() => {
          setValue(() => Math.floor(Math.random() * randMax));
        }}
      >
        Next anecdote
      </button>
    </>
  );
};

const MostVoted = ({ anecdotes, votes }) => {
  console.log("MostVoted: anecdotes:", anecdotes, "votes:", votes);
  const winner = votes.indexOf(Math.max(...votes));
  return (
    <>
      <Anecdote anecdote={anecdotes[winner]} votes={votes[winner]} />
    </>
  );
};

export default App;
