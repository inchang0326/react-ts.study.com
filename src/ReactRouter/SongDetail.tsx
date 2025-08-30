import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

interface SongType {
  id: number;
  title: string;
  musician: string;
  youtube: string;
}

type SongParamType = {
  id?: string;
};

export default function SongDetail() {
  const songs: Array<SongType> = [
    {
      id: 1,
      title: "Falling in React.js",
      musician: "teady",
      youtube: "",
    },
    {
      id: 2,
      title: "Falling in Typescript",
      musician: "teady",
      youtube: "",
    },
  ];

  const { id } = useParams<SongParamType>();
  const nevigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [musician, setMusician] = useState<string>("");
  const [youtube, setYoutube] = useState<string>("");

  useEffect(() => {
    const song = songs.find((song) => song.id === parseInt(id ? id : "", 10));
    if (song) {
      setTitle(song?.title ? song.title : "");
      setMusician(song?.musician ? song.musician : "");
      setYoutube(song?.youtube ? song.youtube : "");
    } else {
      nevigate("/songs");
    }
  }, []);

  return (
    <div className="mt-5">
      <h2>{title}</h2>
      <p>Original Musician: {musician}</p>
      <p>
        <a href={youtube} target="new">
          View on Youtube
        </a>
      </p>
      <Link to="/songs">Return to list</Link>
    </div>
  );
}
