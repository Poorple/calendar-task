import { FC } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import "../../styles/header-styling.css";
import {
  nextMonth,
  prevMonth,
  formatDate,
} from "../../utils/utility-functions";

interface ICalendarHeaderProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  updateURL: () => void;
}

const CalendarHeader: FC<ICalendarHeaderProps> = (props) => {
  const { currentDate, setCurrentDate, updateURL } = props;

  return (
    <>
      <div className="wrap">
        <button
          className="leftBtn"
          onClick={() => {
            const newDate = prevMonth(currentDate, setCurrentDate);
            setCurrentDate(newDate);
            updateURL();
          }}
        >
          <BsChevronLeft className="centered-icon" />
        </button>
        <div style={{ color: "black" }}>{formatDate(currentDate)}</div>
        <button
          className="rightBtn"
          onClick={() => {
            const newDate = nextMonth(currentDate, setCurrentDate);
            setCurrentDate(newDate);
            updateURL();
          }}
        >
          <BsChevronRight className="centered-icon" />
        </button>
      </div>
    </>
  );
};

export default CalendarHeader;
