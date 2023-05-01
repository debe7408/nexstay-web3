import { useParams } from "react-router-dom";
import { getProperty } from "../../api/getProperty";
import { useEffect, useState } from "react";
import { Property } from "../../types/property";
import AccommodationBody from "./AccommodationBody";
import { useAppSelector } from "../../app/hooks";
import { selectUserId } from "../../app/loginSlice";

const AccommodationPage = () => {
  const { id } = useParams();
  const [propertyInfo, setPropertyInfo] = useState({} as Property);
  const userId = useAppSelector(selectUserId);
  const [canEdit, setCanEdit] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const fetchedProperty = async () => {
    const { hasError, message, property } = await getProperty(id!);

    if (hasError || message || !property) {
      setErrorMessage(message!);
      return;
    }

    if (property.owner_id === userId) {
      setCanEdit(true);
    }

    setPropertyInfo(property);
  };

  useEffect(() => {
    fetchedProperty();
  }, [userId, id]);

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return <AccommodationBody property={propertyInfo} />;
};

export default AccommodationPage;
