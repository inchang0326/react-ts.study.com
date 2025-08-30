import { useState, useEffect } from "react";
import * as DateAndTime from "date-and-time";

export enum TimeFormatEnum {
  HHmmss = "HH:mm:ss",
  HHmm = "HH:mm",
  HHmmKOR = "HH시 mm분",
  HHmmssKOR = "HH시 mm분 ss초",
}

// Custom React Hooks .. prefix 'use' 필수
export const useClockTime = (interval: number, format: TimeFormatEnum) => {
  const [currentTime, setCurrentTime] = useState(
    DateAndTime.format(new Date(), format)
  );
  useEffect(() => {
    // mount
    const handle = window.setInterval(() => {
      setCurrentTime(DateAndTime.format(new Date(), format));
    }, interval);

    // un-mount
    return () => {
      window.clearInterval(handle);
    };
  }, []);

  return currentTime;
};

export default function CustomHooksTestApp() {
  const currentTime = useClockTime(1000, TimeFormatEnum.HHmmss);

  console.log("계속 리랜더링 되고 있구나");

  return (
    <>
      <h2>현재 시각</h2>
      <hr></hr>
      <div>{currentTime}</div>
    </>
  );
}
