import React, { useEffect, useState } from "react";
import { Progress } from "antd";

const Bar = ({ targetPercent }) => {
  const [currentPercent, setCurrentPercent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPercent((prevPercent) => {
        // Increase the percentage by 1 on each interval
        const newPercent = prevPercent + 1;

        // Clear the interval when reaching the target percentage
        if (newPercent >= targetPercent) {
          clearInterval(timer);
        }

        return newPercent;
      });
    }, 10); // Interval duration in milliseconds (adjust as needed)

    return () => {
      clearInterval(timer); // Cleanup the interval on component unmount
    };
  }, [targetPercent]);

  return <Progress percent={currentPercent} />;
};

export default Bar;
