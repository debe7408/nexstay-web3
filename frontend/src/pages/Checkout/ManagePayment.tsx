import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "../../constants/colors";
import { paymentTransaction } from "../../web3/transactions";
import { useAppSelector } from "../../app/hooks";
import { web3Selectors } from "../../app/web3Slice";
import { getReservation } from "../../api/manageReservations";
import { Reservation } from "../../types/reservation";
import { useParams } from "react-router-dom";
import DataNotFound from "../DataNotFound";
import { getProperty } from "../../api/getProperty";
import { Property } from "../../types/property";
import PaymentDetailsContainer from "./components/PaymentDetailsContainer";
import ReservationDetailsContainer from "./components/ReservationDetailsContainer";

const propertyOwnerAddress = "0xd83bF311d2e0036C3D0432DBab8664Cf062B836f";

const ManagePayment: React.FC = () => {
  const { chainId, signerAddress, provider } = useAppSelector(web3Selectors);
  const [loading, setLoading] = useState(false);
  const [reservationData, setReservationData] = useState<Reservation>();
  const [propertyInfo, setPropertyInfo] = useState<Property>();
  const { id } = useParams();

  const fetchReservationData = useCallback(async () => {
    const response = await getReservation(id!);
    if (!response.data || response.error) {
      console.log(response.error);
      return;
    }

    setReservationData(response.data);
  }, [id]);

  const fetchedProperty = useCallback(async () => {
    if (!reservationData) return;
    const { hasError, message, property } = await getProperty(
      reservationData.property_id!
    );

    if (hasError || message || !property) {
      return;
    }

    setPropertyInfo(property);
  }, [reservationData]);

  useEffect(() => {
    fetchReservationData();
  }, [fetchReservationData]);

  useEffect(() => {
    fetchedProperty();
  }, [fetchedProperty]);

  const handlePayment = async () => {
    if (!provider) return;
    setLoading(true);

    const response = await paymentTransaction(
      provider,
      1,
      propertyOwnerAddress
    );
    setLoading(false);
  };

  return reservationData && propertyInfo ? (
    <Container>
      <PaymentDetailsContainer
        propertyInfo={propertyInfo}
        handlePayment={handlePayment}
        loading={loading}
        status={reservationData.status}
      />
      <ReservationDetailsContainer reservationInfo={reservationData} />
    </Container>
  ) : (
    <DataNotFound />
  );
};

export default ManagePayment;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2%;
  margin-bottom: 2%;
  margin-left: 10%;
  margin-right: 10%;
  gap: 20px;
  padding: 20px;
  background-color: ${colors.white};
  border-radius: 10px;
`;
