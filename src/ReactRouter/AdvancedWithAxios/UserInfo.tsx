import { fetchUser } from "./BackendAPI";

interface UserItemType {
  id: number;
  userid: string;
  username: string;
}

const reader = fetchUser();

const UserInfo = () => {
  const user: UserItemType = reader.read() as UserItemType;

  return (
    <div>
      <h2>{user.username} 정보</h2>
      <ul>
        <li>UserID : {user.userid}</li>
      </ul>
    </div>
  );
};

export default UserInfo;
