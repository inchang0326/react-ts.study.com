import { useEffect, useState } from "react";
import {
  Link,
  useOutletContext,
  useParams,
  Navigate,
  useNavigate,
  Outlet,
} from "react-router-dom";
import Youtube from "react-youtube";

interface SongType {
  id: number;
  title: string;
  musician: string;
  youtube: string;
}

type SongParamType = {
  id?: string;
};

interface OutLetContextType {
  songs: Array<SongType>;
}

const YoutubePlayer: React.FC = () => {
  // 중첩 라우트 시 상위 컴포넌트의 props를 하위 컴포넌트로 context 통해 전달할 수 있음 => useOutletContext
  const { songs } = useOutletContext<OutLetContextType>();

  const params = useParams<SongParamType>();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [youtube, setYoutube] = useState<string>("");

  useEffect(() => {
    const id = params.id ? parseInt(params.id, 10) : 0;
    const song = songs.find((song) => song.id === id);
    if (song) {
      setTitle(song?.title ? song.title : "");
      setYoutube(song?.youtube ? song.youtube : "");
    } else {
      navigate("/songs");
    }
  }, []);

  return (
    <div className="modal">
      <div className="box">
        <div className="heading">
          <Link className="menu" to="/songs">
            <span className="float-start badge bg-secondary pointer">X</span>
          </Link>
          <span className="title">&nbsp;&nbsp;&nbsp;{title}</span>
        </div>
        <div className="player">
          <div>
            <Youtube
              videoId={youtube}
              opts={{
                width: "320",
                height: "240",
                playerVars: { autoplay: 1 },
              }}
            ></Youtube>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoutubePlayer;
