import React, { Component } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

interface SongType {
  id: number;
  title: string;
  musician: string;
  youtube: string;
}

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

type SongParamType = {
  id?: string;
};

interface ClassBasedSongDetailProps {
  navigate: Function;
  params: SongParamType;
}

interface ExternalClassBasedSongDetailProps {
  test: string;
}

interface ClassBasedSongDetailState {
  title: string;
  musician: string;
  youtube: string;
}

const withSongParams = <P extends object>( // 외부에서 추가 Props를 입력받기 위해, props 객체 P를 제네릭 및 객체 제한함
  WrappedComponent: React.ComponentType<P & ClassBasedSongDetailProps> // 외부에서의 추가 Props가 없다면, ClassBasedSongDetailProps로만 제한해도 됨
) => {
  // 외부에서 보는 컴포넌트, 그리고 외부에서 추가 입력하는 props 객체 P
  return function WithSongParamsComponent(props: P) {
    return (
      // Wrapping 후 반환하는 매개 된 컴포넌트, 그리고 요구하는 ClassBasedSongDetailProps도 입력함
      <WrappedComponent
        {...props} // 요구하는 ClassBasedSongDetailProps 외 추가 ExternalClassBasedSongDetailProps에 대해 입력함(=P)
        navigate={useNavigate()}
        params={useParams<SongParamType>()}
      ></WrappedComponent>
    );
  };
};

class ClassBasedSongDetail extends Component<
  ExternalClassBasedSongDetailProps & ClassBasedSongDetailProps,
  ClassBasedSongDetailState
> {
  constructor(
    props: ExternalClassBasedSongDetailProps & ClassBasedSongDetailProps
  ) {
    super(props);
    this.state = { title: "", musician: "", youtube: "" };
    console.log(props.test); // 외부로부터 추가 Props를 받는 확장성 테스트
  }

  render() {
    return (
      <div className="mt-5">
        <h2>{this.state.title}</h2>
        <p>Original Musician: {this.state.musician}</p>
        <p>
          <a href={this.state.youtube} target="new">
            View on Youtube
          </a>
        </p>
        <Link to="/songs">Return to list</Link>
      </div>
    );
  }

  componentDidMount(): void {
    const id = this.props.params.id;
    const song = songs.find((song) => song.id === parseInt(id ? id : ""));
    if (song) {
      this.setState({
        title: song?.title ? song.title : "",
        musician: song?.musician ? song.musician : "",
        youtube: song?.youtube ? song.youtube : "",
      });
    } else {
      this.props.navigate("/songs");
    }
  }
}

export default withSongParams(ClassBasedSongDetail);
