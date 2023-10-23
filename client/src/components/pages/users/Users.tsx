import { FC } from "react";

import { useGetAllUsersQuery } from "@/store/reducers/apis/users.api";

import styles from "./Users.module.scss";
import UserStrip from "@/components/ui/userStrip/UserStrip";
import { useAccount } from "@/hooks/useAccount";

interface IUser {}

const Users: FC<IUser> = (props) => {
  const { data } = useGetAllUsersQuery();
  const { getAccount } = useAccount();
  const account = getAccount();

  return (
    <main className={styles.body}>
      <UserStrip nick="You" email={account?.email} createdAt={account?.createdAt} />
      {
        data?.filter(user => user._id !== account?._id).map(user => <UserStrip 
          nick={user.nick}
          email={user.email}
          createdAt={user.createdAt}
        />)
      }
    </main>
  );
}

export default Users;