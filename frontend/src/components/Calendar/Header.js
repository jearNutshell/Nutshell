import { format, addMonths, subMonths, getMonth, setYear } from "date-fns";
import { useState, useEffect } from "react";
import eachMonthOfInterval from "date-fns/eachMonthOfInterval";
import getYear from "date-fns/getYear";
import startOfToday from "date-fns/startOfToday";
import eachYearOfInterval from "date-fns/eachYearOfInterval";
import subYears from "date-fns/subYears";
import addYears from "date-fns/addYears";
import forwardArrow from "../../assets/arrows/right-arrow.png";
import backArrow from "../../assets/arrows/back-arrow.png";

const Header = ({ currentMonth, setCurrentMonth }) => {
  //guide for formatting:
  // https://date-fns.org/docs/format

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthNums = eachMonthOfInterval({
    start: new Date(getYear(currentMonth), 0, 1), //2022, 1, 1 is the format
    end: new Date(getYear(currentMonth), 11, 1),
  });

  // console.log(monthNums);
  const years = eachYearOfInterval({
    start: new Date(getYear(subYears(currentMonth, 10)), 0, 1),
    end: new Date(getYear(addYears(currentMonth, 10)), 11, 1),
  });

  const thisYear = getYear(new Date(startOfToday()));

  // console.log(years);
  // const formatForDate = "LLLL yyyy"

  const previousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  //dropdown logic - months
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);
  //end of dropdown logic for months

  //dropdown logic for year
  const [showMenuYear, setShowMenuYear] = useState(false);

  const openMenuYear = () => {
    if (showMenuYear) return;
    setShowMenuYear(true);
  };

  useEffect(() => {
    if (!showMenuYear) return;

    const closeMenuYear = () => {
      setShowMenuYear(false);
    };

    document.addEventListener("click", closeMenuYear);

    return () => document.removeEventListener("click", closeMenuYear);
  }, [showMenuYear]);
  //end

  //change date/year logic:
  const changeDate = (e) => {
    const monthNum = e.target.value;
    for (let i = 0; i < monthNums.length; i++) {
      if (getMonth(monthNums[i]) === monthNum) {
        setCurrentMonth(monthNums[i]);
      }
    }
    if (e.target.innerHTML === "December") {
      setCurrentMonth(monthNums[11]);
    }
  };

  const changeYear = (e) => {
    setCurrentMonth(setYear(currentMonth, e.target.value));
  };

  return (
    <>
      <div className="header-flex-row">
        <div className="back-button-div">
          <div className="back-icon point calBtn" onClick={previousMonth}>
            <img src={backArrow} alt="" width="42" />
          </div>
        </div>

        <div className="date-div h2">
          <span className="date-display point quikHover" onClick={openMenu}>
            {showMenu && (
              <div className="dropdown-root">
                <div className="dropdown-container">
                  <ul className="ul-dropdown">
                    {months.map((month, idx) => (
                      <div
                        className="list-container-dropdown"
                        onClick={(e) => changeDate(e)}
                      >
                        <li value={idx}>{month}</li>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {format(currentMonth, "LLLL")}
          </span>

          <span
            className="date-display-year point quikHover"
            onClick={openMenuYear}
          >
            {showMenuYear && (
              <div className="dropdown-root">
                <div className="dropdown-container">
                  <ul className="ul-dropdown year-height">
                    <div
                      // className="list-container-dropdown"
                      onClick={(e) => changeYear(e)}
                    >
                      <li id="this-year" value={thisYear}>
                        {thisYear}
                      </li>
                    </div>
                    {years.map((year) => (
                      <div
                        className="list-container-dropdown"
                        onClick={(e) => changeYear(e)}
                      >
                        <li value={getYear(year)}>{getYear(year)}</li>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {format(currentMonth, "yyyy")}
          </span>
        </div>

        <div className="forward-button-div">
          <div className="forward-icon point calBtn" onClick={nextMonth}>
            <img src={forwardArrow} alt="" width="42" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
