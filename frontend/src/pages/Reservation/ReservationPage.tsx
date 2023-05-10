import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Property } from "../../types/property";
import { useAppSelector } from "../../app/hooks";
import { selectUserId } from "../../app/loginSlice";
import { getProperty } from "../../api/getProperty";
import ReservationBody from "./ReservationBody";
import { getUnavailableDates } from "../../api/manageReservations";
import { DateRange } from "../../types/dates";

const ReservationPage = () => {
  const { id } = useParams();
  const [propertyInfo, setPropertyInfo] = useState({} as Property);
  const [unavailableDates, setUnavailableDates] = useState<DateRange[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const userId = useAppSelector(selectUserId);

  const fetchedProperty = async () => {
    const { hasError, message, property } = await getProperty(id!);

    if (hasError || message || !property) {
      setErrorMessage(message!);
      return;
    }

    setPropertyInfo(property);
  };

  const fetchAvailability = async () => {
    const response = await getUnavailableDates(id!);
    if (!response.data || response.error) {
      console.log(response.error);
      return;
    }

    setUnavailableDates(response.data);
  };

  useEffect(() => {
    fetchedProperty();
    fetchAvailability();
  }, [userId, id]);

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return (
    <div>
      <ReservationBody
        propertyInfo={propertyInfo}
        unavailableDates={unavailableDates}
      />
    </div>
  );
};

export default ReservationPage;
