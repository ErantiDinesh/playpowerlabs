// src/components/TimeZoneConverter.js
import React, { Component } from 'react';
import moment from 'moment-timezone';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TimeZoneDisplay from './TimeZoneDisplay';
import AddTimeZone from './AddTimeZone';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class TimeZoneConverter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeZones: ['UTC', 'Asia/Kolkata'], // Default time zones
      currentTime: moment(),
    };
  }

  handleTimeZoneAddition = (timeZone) => {
    this.setState((prevState) => ({
      timeZones: [...prevState.timeZones, timeZone],
    }));
  };

  handleTimeZoneDeletion = (index) => {
    this.setState((prevState) => ({
      timeZones: prevState.timeZones.filter((_, i) => i !== index),
    }));
  };

  onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(this.state.timeZones);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    this.setState({ timeZones: items });
  };

  handleTimeChange = (date) => {
    this.setState({ currentTime: moment(date) });
  };

  handleReverseOrder = () => {
    this.setState((prevState) => ({
      timeZones: prevState.timeZones.reverse(),
    }));
  };

  handleToggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
  };

  handleScheduleMeet = () => {
    const eventTime = this.state.currentTime.format('YYYYMMDDTHHmmss');
    const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=Meeting&dates=${eventTime}/${eventTime}`;
    window.open(calendarUrl, '_blank');
  };

  render() {
    const { timeZones, currentTime } = this.state;

    return (
      <div>
        <h1>Time Zone Converter</h1>
        <DatePicker
          selected={currentTime.toDate()}
          onChange={this.handleTimeChange}
          showTimeSelect
          dateFormat="Pp"
        />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {timeZones.map((zone, index) => (
                  <Draggable key={zone} draggableId={zone} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TimeZoneDisplay
                          timeZone={zone}
                          currentTime={currentTime}
                          onDelete={() => this.handleTimeZoneDeletion(index)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <AddTimeZone onAdd={this.handleTimeZoneAddition} />
        <button onClick={this.handleReverseOrder} style={{ marginTop: '10px' }}>
          Reverse Order
        </button>
        <button onClick={this.handleToggleDarkMode} style={{ marginTop: '10px', marginLeft: '10px' }}>
          Toggle Dark Mode
        </button>
        <button onClick={this.handleScheduleMeet} style={{ marginTop: '10px', marginLeft: '10px' }}>
          Schedule Meet
        </button>
      </div>
    );
  }
}

export default TimeZoneConverter;
