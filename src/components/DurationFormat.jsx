import React from "react";

const DurationFormat = ({ duration }) => {
  let convertedDuration;

  duration
    ? (convertedDuration = new Date(duration).toISOString().slice(11, 19))
    : (convertedDuration = "--");

  return (
    <>
      <span>{convertedDuration}</span>
    </>
  );
};

export default DurationFormat;
