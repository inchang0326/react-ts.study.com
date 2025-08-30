import React, { useState } from "react";
import { Link, Outlet, useMatch } from "react-router-dom";

interface SongType {
  id: number;
  title: string;
  musician: string;
  youtube: string;
}

export default function Songs() {
  const songs: Array<SongType> = [
    {
      id: 1,
      title: "Falling in React.js",
      musician: "teady",
      youtube: "KCPS_F-lkCg",
    },
    {
      id: 2,
      title: "Falling in Typescript",
      musician: "teady",
      youtube: "",
    },
  ];

  // useMatch의 매개 path와 일치하는 Route 객체 정보를 조회함, 주로 네비게이션 메뉴 상 path와 일치하는 메뉴 활성 상태 관리를 위해 사용함
  const pathMatch = useMatch("/songs/:id");
  let paramId: number = pathMatch?.params?.id
    ? parseInt(pathMatch.params.id, 10)
    : -1;

  const songsRender = songs.map((song) => {
    let cn = "list-group-item";
    cn += paramId === song.id ? " list-group-item-secondary" : "";

    return (
      <li className={cn} key={song.id}>
        <Link to={`/songs/${song.id}`} style={{ textDecoration: "none" }}>
          {song.title} ({song.musician})
          <span className="float-end badge bg-secondary">
            <i className="fa fa-play"></i>
          </span>
        </Link>
      </li>
    );
  });

  return (
    <div className="card card-body">
      <h2 className="mt-4 mb-2">Songs</h2>
      <ul className="list-group">{songsRender}</ul>
      <Outlet context={{ songs: songs }}></Outlet>
    </div>
  );
}
