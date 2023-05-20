import { useParams } from "react-router-dom";
import { getProperty } from "../../api/getProperty";
import { useEffect, useState } from "react";
import AccommodationBody from "./AccommodationBody";
import { useAppSelector } from "../../app/hooks";
import { selectUserId } from "../../app/loginSlice";
import { PropertyWithOwner } from "../../types/property";

const AccommodationPage = () => {
  const { id } = useParams();
  const [propertyInfo, setPropertyInfo] = useState({} as PropertyWithOwner);
  const userId = useAppSelector(selectUserId);
  const [canEdit, setCanEdit] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const fetchedProperty = async () => {
    const { error, message, property } = await getProperty(id!);

    if (error || !property) {
      setErrorMessage(message);
      return;
    }

    setCanEdit(userId === property.owner_id);

    setPropertyInfo(property);
  };

  useEffect(() => {
    fetchedProperty();
  }, [userId, id]);

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return <AccommodationBody editor={canEdit} property={propertyInfo} />;
};

export default AccommodationPage;
