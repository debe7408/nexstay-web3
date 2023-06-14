import { Chip } from "@mui/material";
import { web3Selectors } from "../app/web3Slice";
import { useAppSelector } from "../app/hooks";
import {
  formatBigNumberForDisplay,
  getWalletBalance,
} from "../web3/web3Functions";
import { useEffect, useState } from "react";

const BalanceChip = () => {
  const { provider } = useAppSelector(web3Selectors);
  const [balance, setBalance] = useState("0.0000");

  useEffect(() => {
    const fetchWalletBalance = async () => {
      if (!provider) return;
      const balance = await getWalletBalance(provider);

      setBalance(formatBigNumberForDisplay(balance));
    };

    fetchWalletBalance();
  }, [provider]);

  return provider ? (
    <Chip
      color={"success"}
      variant="outlined"
      clickable={false}
      label={`Balance: ${balance} BNB`}
    />
  ) : (
    <></>
  );
};

export default BalanceChip;
