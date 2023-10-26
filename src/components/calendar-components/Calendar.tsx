import CalendarHeader from "./CalendarHeader";
import DayGrid from "./DayGrid";
import "../../styles/main-cal.css";
import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";

const GET_COMMITS = gql`
  {
    repository(owner: "Poorple", name: "my-pokemon-app") {
      defaultBranchRef {
        target {
          ... on Commit {
            history(first: 20) {
              edges {
                node {
                  message
                  author {
                    name
                    date
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const Calendar = () => {
  const { year, month } = useParams();
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());

  const { loading, error, data } = useQuery(GET_COMMITS, {
    context: {
      headers: {
        Authorization: `Bearer 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`,
      },
    },
  });

  useEffect(() => {
    if (year && month) {
      const yearNumber = parseInt(year, 10);
      const monthNumber = parseInt(month, 10) - 1;

      if (!isNaN(yearNumber) && !isNaN(monthNumber)) {
        setCurrentDate(new Date(yearNumber, monthNumber));
      }
    }
  }, [year, month]);

  const updateURL = () => {
    const newURL = `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}`;
    navigate(`/calendar/${newURL}`);
  };

  if (loading) return <p className="msg">Loading</p>;
  if (error) return <p className="msg">Error</p>;

  const commitsData = data.repository.defaultBranchRef.target.history.edges;

  return (
    <div className="calendar-wrap">
      <CalendarHeader
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        updateURL={updateURL}
      />
      <DayGrid currentDate={currentDate} commitsData={commitsData} />
    </div>
  );
};

export default Calendar;
