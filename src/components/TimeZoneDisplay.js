// src/components/TimeZoneDisplay.js
import React from 'react';
import moment from 'moment-timezone';

const TimeZoneDisplay = ({ timeZone, currentTime, onDelete }) => {
  const timeInZone = currentTime.tz(timeZone).format('YYYY-MM-DD HH:mm:ss');

  return (
    <div style={{ marginBottom: '10px' }}>
      <span>{timeZone}: {timeInZone}</span>
      <button onClick={onDelete} style={{ marginLeft: '10px' }}>
        Delete
      </button>
    </div>
  );
};

export default TimeZoneDisplay;
