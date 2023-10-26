import { FC, useState } from "react";
import "../../styles/day-grid.css";
import { getSortedDays, DAYS } from "../../utils/utility-functions";

interface IDayGridProps {
  currentDate: Date;
  commitsData: {
    node: {
      message: string;
      author: {
        name: string;
        date: Date;
      };
    };
  };
}

interface Edge {
  node: {
    message: string;
    author: {
      name: string;
      date: Date;
    };
  };
}

const DayGrid: FC<IDayGridProps> = (props) => {
  const { currentDate, commitsData } = props;
  const [popUpData, setPopUpData] = useState<{
    date: Date;
    name: string;
    message: string;
  } | null>(null);

  const moreData = (date: Date, name: string, message: string) => {
    setPopUpData({ date, name, message });
  };
  const commitsArray = Array.isArray(commitsData) ? commitsData : [commitsData];

  return (
    <>
      <div className="big-day-wrap">
        {DAYS.map((day) => (
          <div key={day} className="big-day">
            {day}
          </div>
        ))}
      </div>
      <div className="small-day-wrap">
        {getSortedDays(currentDate).map((day) => (
          <article className="small-day-s" key={day}>
            <p className="day-num-in-month">{day}</p>
            {commitsArray.map((x: Edge) => {
              if (
                new Date(x.node.author.date).getDate() === day &&
                new Date(x.node.author.date).getMonth() ===
                  currentDate.getMonth()
              ) {
                return (
                  <div
                    key={x.node.message}
                    onClick={() =>
                      moreData(
                        new Date(x.node.author.date),
                        x.node.author.name,
                        x.node.message
                      )
                    }
                  >
                    <p>
                      {new Date(x.node.author.date).getHours()}:
                      {new Date(x.node.author.date).getMinutes() < 10
                        ? `0` + new Date(x.node.author.date).getMinutes()
                        : new Date(x.node.author.date).getMinutes()}
                    </p>
                    <p>{x.node.message}</p>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </article>
        ))}
      </div>
      {popUpData ? (
        <div className="pop-up">
          <p>
            On {popUpData.date.getDate()}{" "}
            {popUpData.date.toLocaleString("default", { month: "long" })}{" "}
            {popUpData.date.getFullYear()} at {popUpData.date.getHours()}:
            {popUpData.date.getMinutes() < 10
              ? "0" + popUpData.date.getMinutes()
              : popUpData.date.getMinutes()}{" "}
            {popUpData.name} commited an update with a message:{" "}
            {popUpData.message}
          </p>
          <button onClick={() => setPopUpData(null)}>Close</button>
        </div>
      ) : null}
    </>
  );
};

export default DayGrid;
