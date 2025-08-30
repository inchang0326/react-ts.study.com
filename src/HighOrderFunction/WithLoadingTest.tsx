import React from "react";

interface UserProfileProps {
  name: string;
  email: string;
  loadingComplete?: boolean;
}

// <>에 Props만 받는 이유는, FC의 경우가 그럼, state는 FC 특성상 내부에서 선언하기 때문임
const UserProfile: React.FC<UserProfileProps> = (props: UserProfileProps) => {
  return (
    <div>
      <h2>사용자 프로필</h2>
      <p>이름: {props.name}</p>
      <p>이메일: {props.email}</p>
      {props.loadingComplete && <p>로딩 완료!</p>}
    </div>
  );
};

export default UserProfile;
