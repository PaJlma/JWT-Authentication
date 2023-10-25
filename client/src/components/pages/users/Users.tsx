import { FC } from "react";

import { useGetAllUsersQuery } from "@/store/reducers/apis/users.api";
import { useAccount } from "@/hooks/useAccount";

import RefreshButton from "@/components/ui/refreshButton/RefreshButton";
import UserStrip from "@/components/ui/userStrip/UserStrip";

import styles from "./Users.module.scss";

interface IUser {}

const Users: FC<IUser> = (props) => {
  const { getAccount } = useAccount();
  const account = getAccount();
  const { data, refetch } = useGetAllUsersQuery();

  const users = data?.filter(user => user._id !== account?._id);

  return (
    <main className={styles.body}>
      <RefreshButton onClick={refetch} />
      <UserStrip nick="You" email={account?.email} createdAt={account?.createdAt} />
      {
        users?.map(user => <UserStrip 
          nick={user.nick}
          email={user.email}
          createdAt={user.createdAt}
          key={user.email}
        />)
      }
    </main>
  );
}

export default Users;