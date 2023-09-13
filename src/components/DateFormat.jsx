import React from "react";

const DateFormat = ({ date }) => {
  let convertedDate;

  date
    ? (convertedDate = new Date(date).toISOString().split("T")[0])
    : (convertedDate = "--");

  return (
    <>
      <span>{convertedDate}</span>
    </>
  );
};

export default DateFormat;
