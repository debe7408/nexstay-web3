import Calendar from "react-calendar";
import { Value } from "react-calendar/dist/cjs/shared/types";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";
import { DateRange } from "../types/dates";

interface Props {
  unavailableDates: DateRange[];
  value: Value;
  onChange: (value: Value) => void;
}

const CalendarComponent: React.FC<Props> = ({
  unavailableDates,
  value,
  onChange,
}) => {
  const isDateRangeOverlapping = (startDate: Date, endDate: Date) => {
    return unavailableDates.some(([startUnavailable, endUnavailable]) => {
      return (
        (endDate >= startUnavailable && endDate <= endUnavailable) ||
        (startDate <= startUnavailable && endDate >= endUnavailable)
      );
    });
  };

  // TODO implement this
  // const firstDateOverlaps = () => {
  //   const currentDate = new Date();
  //   const overlaps = unavailableDates.some(([startDate, endDate]) => {
  //     currentDate >= startDate && currentDate <= endDate;
  //   });
  // };

  const handleActiveStartDateChange = (value: Value) => {
    if (Array.isArray(value)) {
      const [startDate, endDate] = value;
      if (isDateRangeOverlapping(startDate!, endDate!)) {
        alert("You cannot select overlapping dates.");
        onChange(endDate);
      } else {
        onChange(value);
      }
    }
  };

  return (
    <StyledCalendarWrapper>
      <Calendar
        onChange={handleActiveStartDateChange}
        value={value}
        minDate={new Date()}
        selectRange
        tileDisabled={({ date }) => {
          return unavailableDates.some(([startDate, endDate]) => {
            return date >= startDate && date <= endDate;
          });
        }}
      />
    </StyledCalendarWrapper>
  );
};

export default CalendarComponent;

const StyledCalendarWrapper = styled.div`
  .react-calendar {
    background: white;
    border: 1px solid #eee;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 350px;
    margin: 0 auto;
  }

  .react-calendar__month-view__weekdays {
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
    color: #666;
  }

  .react-calendar__month-view__days__day--weekend {
    color: red;
  }

  .react-calendar__tile--now {
    background: #f5f5f5;
    color: #333;
  }

  .react-calendar__tile--active {
    background: #1e90ff;
    color: white;
  }

  .react-calendar__tile--hasActive {
    background: #e6f7ff;
  }

  .react-calendar__navigation button {
    background: transparent;
    border: none;
    outline: none;
    box-shadow: none;
    font-size: 20px;
    font-weight: bold;

    color: #1e90ff;
  }
`;
