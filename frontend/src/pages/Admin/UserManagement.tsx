import React, { useState, useEffect, useCallback } from "react";
import { useSnackbar } from "notistack";
import { User } from "../../types/user";
import WalletChip from "../../components/WalletChip";
import ReusableTable from "./components/ReusableTable";
import { getAllUsers } from "../../api/adminAPI";

const headers = [
  "ID",
  "Public Address",
  "Banned",
  "Type",
  "Email",
  "First Name",
  "Last Name",
  "Age",
];

const UserManagement: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [userData, setUserData] = useState<User[]>([]);

  const fetchUserData = useCallback(async () => {
    const { message, error, users } = await getAllUsers();

    if (error || !users) {
      enqueueSnackbar(message, { variant: "error" });
    } else {
      setUserData(users);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const onClickHandler = (rowIndex: number) => {
    console.log(userData.at(rowIndex));
  };

  return (
    <ReusableTable
      headers={headers}
      data={userData.map((user) => [
        user.id,
        <WalletChip address={user.publicAddress} />,
        user.banned ? "Yes" : "No",
        user.type,
        user.email,
        user.firstName,
        user.lastName,
        user.age,
      ])}
      onClickHandler={onClickHandler}
    />
  );
};

export default UserManagement;
