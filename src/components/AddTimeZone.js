// src/components/AddTimeZone.js
import React, { useState } from 'react';
import moment from 'moment-timezone';

const AddTimeZone = ({ onAdd }) => {
  const [newTimeZone, setNewTimeZone] = useState('');

  const handleAdd = () => {
    if (newTimeZone && moment.tz.zone(newTimeZone)) {
      onAdd(newTimeZone);
      setNewTimeZone('');
    } else {
      alert('Invalid time zone');
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <input
        type="text"
        value={newTimeZone}
        onChange={(e) => setNewTimeZone(e.target.value)}
        placeholder="Enter time zone (e.g., America/New_York)"
      />
      <button onClick={handleAdd} style={{ marginLeft: '10px' }}>
        Add Time Zone
      </button>
    </div>
  );
};

export default AddTimeZone;
