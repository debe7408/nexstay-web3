import React, { useCallback, useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import { PropertyWithOwner } from "../../types/property";
import WalletChip from "../../components/WalletChip";
import ReusableTable from "./components/ReusableTable";
import { getAllProperties } from "../../api/adminAPI";
import { useSnackbar } from "notistack";

const headers = ["ID", "Owner", "Name", "Location", "Price (USDT)", "Status"];

const PropertyManagement: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [propertyData, setPropertyData] = useState<PropertyWithOwner[]>([]);

  const fetchPropertyData = useCallback(async () => {
    const { message, error, properties } = await getAllProperties();

    if (error || !properties) {
      enqueueSnackbar(message, { variant: "error" });
    } else {
      setPropertyData(properties);
    }
  }, []);

  useEffect(() => {
    fetchPropertyData();
  }, [fetchPropertyData]);

  const onClickHandler = (rowIndex: number) => {
    console.log(propertyData.at(rowIndex));
  };

  return (
    <ReusableTable
      headers={headers}
      data={propertyData.map((data) => [
        data.id,
        <WalletChip address={data.ownerAddress} />,
        data.name,
        `${data.city}, ${data.country}, ${data.address}`,
        data.price,
        <Chip
          label={data.booking_status ? "Enabled" : "Disabled"}
          color={data.booking_status ? "success" : "warning"}
        />,
      ])}
      onClickHandler={onClickHandler}
    />
  );
};

export default PropertyManagement;
