import Calendar from "react-calendar";
import { Value } from "react-calendar/dist/cjs/shared/types";
import styled from "styled-components";
import { DateRange } from "../types/dates";
import { colors } from "../constants/colors";
import "react-calendar/dist/Calendar.css";

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
    background: ${colors.white};
    border: 1px solid ${colors.navyBlue};
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
  }

  .react-calendar__month-view__weekdays {
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
    color: ${colors.navyBlue};
  }

  .react-calendar__month-view__days__day--weekend {
    color: ${colors.red};
  }

  .react-calendar__tile--now {
    background: #f5f5f5;
    text-decoration: underline;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: ${colors.navyBlue};
    color: ${colors.white};
  }

  .react-calendar__tile--active {
    background: ${colors.navyBlue};
    color: ${colors.white};
  }

  .react-calendar__tile--hasActive {
    background: ${colors.navyBlue};
  }

  .react-calendar__navigation button {
    background: transparent;
    border: none;
    outline: none;
    box-shadow: none;
    font-size: 20px;
    font-weight: bold;
    color: ${colors.navyBlue};
  }

  .react-calendar__tile:disabled {
    background: ${colors.lightGrey};
    text-decoration: line-through;
  }
`;
