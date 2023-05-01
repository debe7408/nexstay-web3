import { useParams } from "react-router-dom";
import { getProperty } from "../../api/getProperty";
import { useEffect, useState } from "react";
import { Property } from "../../types/property";
import { Skeleton } from "@mui/material";
import AccommodationBody from "./AccommodationBody";

const AccommodationPage = () => {
  const { id } = useParams();
  const [propertyInfo, setPropertyInfo] = useState({} as Property);

  const [errorMessage, setErrorMessage] = useState("");

  const fetchedProperty = async () => {
    const { hasError, message, property } = await getProperty(id!);

    if (hasError || message || !property) {
      setErrorMessage(message!);
      return;
    }

    setPropertyInfo(property);
  };

  useEffect(() => {
    fetchedProperty();
  }, []);

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return <AccommodationBody property={propertyInfo} />;
};

export default AccommodationPage;
