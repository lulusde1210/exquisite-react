import React, { useState } from 'react';
import './Game.css';
import PlayerSubmissionForm from './PlayerSubmissionForm';
import FinalPoem from './FinalPoem';
import RecentSubmission from './RecentSubmission';

const Game = () => {
  const [lines, setLines] = useState([]);
  const [done, setDone] = useState(false);
  const exampleFormat = FIELDS.map((field) => {
    if (field.key) {
      return field.placeholder;
    } else {
      return field;
    }
  }).join(' ');

  const convertToLine = (fields, formData) => {
    return fields.map((field) => {
      if (field.key) {
        return formData[field.key];
      } else {
        return field;
      }
    }).join(' ');
  }

  const sendSubmission = (formData) => {
    setLines(preLines => [...preLines, convertToLine(FIELDS, formData)])
  };

  const revealPoem = () => {
    setDone(true);
  };

  return (
    <div className="Game">
      <h2>Game</h2>
      <p>Each player should take turns filling out and submitting the form below. Each turn should be done individually and <em>in secret!</em> Take inspiration from the revealed recent submission. When all players are finished, click the final button on the bottom to reveal the entire poem.</p>
      <p>Please follow the following format for your poetry submission:</p>
      <p className="Game__format-example">
        {exampleFormat}
      </p>

      {
        lines.length > 0 && !done &&
        <RecentSubmission submission={lines.at(-1)} />
      }

      {
        !done &&
        <PlayerSubmissionForm index={lines.length + 1} sendSubmission={sendSubmission} fields={FIELDS} />
      }
      <FinalPoem isSubmitted={done} submissions={lines} revealPoem={revealPoem} />

    </div>
  );
}


const FIELDS = [
  'The',
  {
    key: 'adj1',
    placeholder: 'adjective',
  },
  {
    key: 'noun1',
    placeholder: 'noun',
  },
  {
    key: 'adv',
    placeholder: 'adverb',
  },
  {
    key: 'verb',
    placeholder: 'verb',
  },
  'the',
  {
    key: 'adj2',
    placeholder: 'adjective',
  },
  {
    key: 'noun2',
    placeholder: 'noun',
  },
  '.',
];

export default Game;
