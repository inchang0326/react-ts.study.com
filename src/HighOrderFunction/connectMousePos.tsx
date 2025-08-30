import React, { useState, useEffect } from "react";

type PositionType = {
  x: number;
  y: number;
};

export const connectMousePos = (TargetComponent: React.ComponentType<any>) => {
  return (props: any) => {
    // 컴포넌트 형태로 보면 됨
    const [position, setPosition] = useState<PositionType>({ x: 0, y: 0 });
    useEffect(() => {
      const onMove = (e: MouseEvent) => {
        setPosition({ x: e.pageX, y: e.pageY });
      };
      window.addEventListener("mousemove", onMove);

      return () => {
        window.removeEventListener("mousemove", onMove);
      };
    }, []);

    return <TargetComponent {...props} position={position}></TargetComponent>;
  };
};
