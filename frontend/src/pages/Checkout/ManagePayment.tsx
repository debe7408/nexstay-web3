import React, { useCallback, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../constants/colors";
import {
  paymentTransaction,
  approvalTransaction,
} from "../../web3/transactions";
import { useAppSelector } from "../../app/hooks";
import { web3Selectors } from "../../app/web3Slice";
import {
  confirmReservation,
  getReservation,
  getTransactionInfo,
} from "../../api/manageReservations";
import { Reservation, ReservationStatus } from "../../types/reservation";
import { useParams } from "react-router-dom";
import DataNotFound from "../DataNotFound";
import { getProperty } from "../../api/getProperty";
import { Property } from "../../types/property";
import PaymentDetailsContainer from "./components/PaymentDetailsContainer";
import ReservationDetailsContainer from "./components/ReservationDetailsContainer";
import PaymentInfoAlert from "../../components/PaymentInfoAlert";
import { Transaction } from "../../types/transaction";
import { calculateDayDifference } from "../../helperFunctions/dateFunctions";

const ManagePayment: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { provider } = useAppSelector(web3Selectors);
  const [loading, setLoading] = useState(false);
  const [reservationData, setReservationData] = useState<Reservation>();
  const [propertyInfo, setPropertyInfo] = useState<Property>();
  const [transactionInfo, setTransactionInfo] = useState<Transaction>();
  const { id: reservationId } = useParams();

  const fetchReservationData = useCallback(async () => {
    const response = await getReservation(reservationId!);
    if (!response.data || response.error) {
      console.log(response.error);
      return;
    }

    setReservationData(response.data);
  }, [reservationId]);

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

  const fetchTransaction = useCallback(async () => {
    if (
      !reservationData ||
      (reservationData.status !== ReservationStatus.CONFIRMED &&
        reservationData.status !== ReservationStatus.COMPLETED)
    ) {
      return;
    }

    const { error, transaction } = await getTransactionInfo(reservationId!);

    if (error || !transaction) {
      return;
    }

    setTransactionInfo(transaction);
  }, [reservationData, reservationId]);

  useEffect(() => {
    fetchReservationData();
  }, [fetchReservationData]);

  useEffect(() => {
    fetchedProperty();
  }, [fetchedProperty]);

  useEffect(() => {
    fetchTransaction();
  }, [fetchTransaction]);

  const handlePayment = async () => {
    if (!propertyInfo || !reservationData) return;
    const totalNights = calculateDayDifference(
      reservationData.end_date,
      reservationData.start_date
    );

    const totalAmount = (
      Number(propertyInfo?.price) *
      1.05 *
      totalNights
    ).toFixed(4);
    if (!provider) return;
    setLoading(true);

    const approveResponse = await approvalTransaction(provider, totalAmount);

    if (!approveResponse.hash || approveResponse.error) {
      enqueueSnackbar(approveResponse.error, { variant: "error" });
      setLoading(false);
      return;
    }

    enqueueSnackbar(
      `Approvall sucessfull. Transaction hash: ${approveResponse.hash}`,
      {
        variant: "success",
      }
    );

    const response = await paymentTransaction(
      provider,
      totalAmount,
      propertyInfo?.owner_publicAddress
    );

    if (!response.hash || response.error) {
      enqueueSnackbar(response.error, { variant: "error" });
      setLoading(false);
      return;
    }

    enqueueSnackbar(`Payment sucessfull. Transaction hash: ${response.hash}`, {
      variant: "success",
    });

    const confirmResponse = await confirmReservation(
      reservationId!,
      response.hash
    );

    enqueueSnackbar(confirmResponse.message, {
      variant: confirmResponse.error ? "error" : "success",
    });

    setLoading(false);
    if (confirmResponse.error) return;

    navigate("/myProfile/manage-reservations");
  };

  return reservationData && propertyInfo ? (
    <Container>
      <Header>
        <PaymentInfoAlert status={reservationData.status} />
      </Header>
      <Wrapper>
        <PaymentDetailsContainer
          propertyInfo={propertyInfo}
          reservationInfo={reservationData}
          handlePayment={handlePayment}
          loading={loading}
        />
        <ReservationDetailsContainer
          reservationInfo={reservationData}
          transactionInfo={transactionInfo}
        />
      </Wrapper>
      <Wrapper>Labas</Wrapper>
    </Container>
  ) : (
    <DataNotFound />
  );
};

export default ManagePayment;

const Header = styled.div`
  display: flex;
  margin-top: 2%;
  justify-content: center;
  align-items: center;
  margin-left: 10%;
  margin-right: 10%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2%;
  margin-left: 10%;
  margin-right: 10%;
  gap: 20px;
  padding: 20px;
  background-color: ${colors.white};
  border-radius: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`;
