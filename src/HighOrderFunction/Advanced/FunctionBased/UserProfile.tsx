import React from "react";
import authenticated from "./withAuth";
import useApi from "./useApi";
import withLoading from "../ClassBased/withLoading";
type UserType = {
  id: number;
  name: string;
};

interface UserProfileProps {
  user?: UserType;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  console.log("UserProfile");
  const {
    data: profile, // 비구조화 할당에서 데이터 : 별칭임
    loading,
    error,
    refetch,
  } = useApi(
    () => fetch(`/api/users/${user?.id}`).then((res) => res),
    [user?.id]
  );

  if (loading) return <div>프로필 로딩 중..</div>;
  if (error) return <div>error: {error} </div>;
  return (
    <div>
      <h2>{user?.name}님의 프로필</h2>
      <button onClick={refetch}>새로고침</button>
      {profile?.status}
    </div>
  );
};

export default authenticated(withLoading(UserProfile));
