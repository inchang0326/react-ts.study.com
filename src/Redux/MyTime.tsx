import * as DateAndTime from "date-and-time";

interface MyTimeProps {
  currentTime: string;
  changeTime: (currentTime: string) => void;
}

const MyTime = ({ currentTime, changeTime }: MyTimeProps) => {
  console.log("MyTime Rendering");
  return (
    <div className="row">
      <div className="col">
        <button
          className="btn btn-primary"
          onClick={() =>
            changeTime(DateAndTime.format(new Date(), "HH시 mm분 ss초"))
          }
        >
          현재 시각 확인
        </button>
        <h4>
          <span className="label label-default">
            {currentTime.toLocaleString()}
          </span>
        </h4>
      </div>
    </div>
  );
};

export default MyTime;
