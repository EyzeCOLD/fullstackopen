import { useState } from "react";
import "./App.css";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header text="Give feedback" />
      <Button text="Good" setValue={setGood} />
      <Button text="Neutral" setValue={setNeutral} />
      <Button text="Bad" setValue={setBad} />
      <Header text="Statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

const Header = (props) => {
  console.log("Header:", props);
  const text = props.text;
  return (
    <>
      <h1>{text}</h1>
    </>
  );
};

const Button = (props) => {
  console.log("Button:", props);
  const { text, setValue } = props;
  return (
    <>
      <button
        onClick={() => {
          setValue((prev) => prev + 1);
        }}
      >
        {text}
      </button>
    </>
  );
};

const Statistics = (props) => {
  const { good, neutral, bad } = props;
  const sum = good + neutral + bad;
  if (sum == 0) {
    return (
      <>
        {" "}
        <p>No feedback given</p>{" "}
      </>
    );
  }
  const avg = (good - bad) / sum;
  const positivity = good / sum;
  return (
    <>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="Sum" value={sum} />
          <StatisticLine text="Average" value={avg} />
          <StatisticLine text="Positive" value={positivity} />
        </tbody>
      </table>
    </>
  );
};

const StatisticLine = (props) => {
  const { text, value } = props;
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  );
};

export default App;
