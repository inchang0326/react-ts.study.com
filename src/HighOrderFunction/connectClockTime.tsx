import React, { useState, useEffect } from "react";
import * as DateAndTime from "date-and-time";

export enum TimeFormatEnum {
  HHmmss = "HH:mm:ss",
  HHmm = "HH:mm",
  HHmmKOR = "HH시 mm분",
  HHmmssKOR = "HH시 mm분 ss초",
}

// 컴포넌트를 반환하는 고차 함수
export const connectClockTime = (
  TargetComponent: React.ComponentType<any>,
  format: TimeFormatEnum,
  interval: number
) => {
  return (props: any) => {
    const [currentTime, setCurrentTime] = useState<string>(
      DateAndTime.format(new Date(), format)
    );

    useEffect(() => {
      const handle = window.setInterval(() => {
        setCurrentTime(DateAndTime.format(new Date(), format));
      }, interval);

      return () => {
        window.clearInterval(handle);
      };
    }, []);

    return (
      <TargetComponent {...props} currentTime={currentTime}></TargetComponent>
    );
  };
};
