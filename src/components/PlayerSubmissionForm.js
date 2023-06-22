import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './PlayerSubmissionForm.css';

const buildInitialState = (fields) => {
  const initialState = {};
  for (const field of fields) {
    if (field.key) {
      initialState[field.key] = ''
    }
  }
  return initialState
}

const PlayerSubmissionForm = ({ index, sendSubmission, fields }) => {
  const [formData, setFormData] = useState(buildInitialState(fields));

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => {
      return { ...prevData, [name]: value }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendSubmission(formData);
    setFormData(buildInitialState(fields))
  };

  return (
    <div className="PlayerSubmissionForm">
      <h3>Player Submission Form for Player #{index}</h3>

      <form className="PlayerSubmissionForm__form" onSubmit={handleSubmit}>
        <div className="PlayerSubmissionForm__poem-inputs">
          {
            fields.map((field) => {
              if (field.key) {
                const { key, placeholder } = field;
                const value = formData[key];
                return <input
                  key={key}
                  placeholder={placeholder}
                  name={key}
                  type="text"
                  value={value}
                  className={value ? '' : 'PlayerSubmissionFormat__input--invalid'}
                  onChange={handleChange}
                />
              } else {
                return field;
              }
            })
          }
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
