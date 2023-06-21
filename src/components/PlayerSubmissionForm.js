import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './PlayerSubmissionForm.css';

const PlayerSubmissionForm = ({ index, sendSubmission, fields }) => {
  const [adj1, setAdj1] = useState('');

  const handleChange = (event) => {
    const newAdj = event.target.value;
    setAdj1(newAdj);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendSubmission(adj1);
    setAdj1('');
  };



  return (
    <div className="PlayerSubmissionForm">
      <h3>Player Submission Form for Player #{index}</h3>

      <form className="PlayerSubmissionForm__form" onSubmit={handleSubmit}>

        <div className="PlayerSubmissionForm__poem-inputs">
          <input
            placeholder="adjective"
            name="adj1"
            type="text"
            value={adj1}
            className={adj1 ? '' : 'PlayerSubmissionFormat__input--invalid'}
            onChange={handleChange}
          />

        </div>

        <div className="PlayerSubmissionForm__submit">
          <input type="submit" value="Submit Line" className="PlayerSubmissionForm__submit-btn" />
        </div>
      </form>
    </div>
  );
}

PlayerSubmissionForm.propTypes = {
  index: PropTypes.number.isRequired,
  sendSubmission: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
    }),
  ])).isRequired,
}

export default PlayerSubmissionForm;
