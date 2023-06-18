import styled from "styled-components";
import { colors } from "../../../constants/colors";
import CustomButton from "../../../components/CustomButton";
import { Typography } from "@mui/material";
import ToolTipIcon from "../../../components/ToolTipIcon";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ContactInfo } from "../../../types/contactInfo";
import ContactInfoForm from "../../Host/ContactInfo/ContactInfoForm";
import Divider from "../../../components/DividerComponent";
import { Reservation, ReservationStatus } from "../../../types/reservation";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { fetchAndUpdateUserInfo, selectUser } from "../../../app/loginSlice";
import { updateContactInfo } from "../../../api/updateContactInfo";
import { useSnackbar } from "notistack";
import { calculateDayDifference } from "../../../helperFunctions/dateFunctions";
import { PropertyWithOwner } from "../../../types/property";
import {
  formatBigNumberForDisplay,
  getTokenBalance,
} from "../../../web3/web3Functions";
import { useEffect, useState } from "react";
import { web3Selectors } from "../../../app/web3Slice";

interface Props {
  propertyInfo: PropertyWithOwner;
  handlePayment: () => void;
  handlePaymentAsStream: () => void;
  loading: boolean;
  reservationInfo: Reservation;
}

const PaymentDetailsContainer: React.FC<Props> = ({
  handlePayment,
  handlePaymentAsStream,
  propertyInfo,
  loading,
  reservationInfo,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const user = useAppSelector(selectUser);
  const { provider } = useAppSelector(web3Selectors);
  const dispatch = useAppDispatch();

  const [userBalance, setUserBalance] = useState("0.0000");

  const totalNights = calculateDayDifference(
    reservationInfo.end_date,
    reservationInfo.start_date
  );

  const subtotalToolTip =
    "Subtotal is the price of the property times the number of nights.";
  const platformFeeToolTip = "Platform fee is 5% of the subtotal amount.";
  const yourBalanceToolTip =
    "This is your balance of the token that will be used for payments.";

  const buttonTexts = {
    [ReservationStatus.PENDING]: "Make Payment",
    [ReservationStatus.CONFIRMED]: "Reservation Confirmed",
    [ReservationStatus.CANCELED]: "Cancelled",
    [ReservationStatus.COMPLETED]: "Completed",
    [ReservationStatus.EXPIRED]: "Expired",
    stream: "Pay as a Stream",
  };

  const subtotalAmount = Number(propertyInfo.price) * Number(totalNights);
  const platformFeeAmount = Number((subtotalAmount * 0.05).toFixed(2));
  const totalAmount = subtotalAmount + platformFeeAmount;

  const initialState: ContactInfo = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    age: user?.age || undefined,
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ContactInfo>({
    defaultValues: initialState,
    resolver: yupResolver(
      yup.object().shape({
        firstName: yup.string().required().min(2),
        lastName: yup.string().required().min(3),
        email: yup.string().required().email(),
        age: yup.number().required().min(20).max(90),
      })
    ),
  });

  useEffect(() => {
    const fetchUserTokenBalance = async () => {
      if (!provider) return;
      const balance = await getTokenBalance(provider);
      setUserBalance(formatBigNumberForDisplay(balance));
    };
    fetchUserTokenBalance();
  }, [provider]);

  const onSubmit = handleSubmit(async (formData, event) => {
    if (!isDirty) {
      enqueueSnackbar("There were no changes to user data.", {
        variant: "info",
      });
      handlePayment();
      return;
    }

    const { hasError } = await updateContactInfo(formData);

    if (!hasError) {
      enqueueSnackbar("Contact information updated", {
        variant: "success",
      });
      dispatch(fetchAndUpdateUserInfo());

      handlePayment();
    } else {
      enqueueSnackbar("Contact could not be updated", {
        variant: "error",
      });
    }
  });
  const onSubmitAsStream = handleSubmit(async (formData, event) => {
    if (!isDirty) {
      enqueueSnackbar("There were no changes to user data", {
        variant: "info",
      });
      handlePaymentAsStream();
      return;
    }

    const { hasError } = await updateContactInfo(formData);

    if (!hasError) {
      enqueueSnackbar("Contact information updated", {
        variant: "success",
      });
      dispatch(fetchAndUpdateUserInfo());

      handlePaymentAsStream();
    } else {
      enqueueSnackbar("Contact could not be updated", {
        variant: "error",
      });
    }
  });

  return (
    <Container>
      <Typography variant="h6">Contact details</Typography>

      <ContactInfoForm
        register={register}
        errors={errors}
        disabled={reservationInfo.status !== ReservationStatus.PENDING}
      />

      <BottomContainer>
        <Typography variant="h6">Transaction details</Typography>
        <Row>
          <RowLabel>
            Subtotal: <ToolTipIcon title={subtotalToolTip} />
          </RowLabel>
          <RowText>
            ${`${propertyInfo.price} x ${totalNights} = $${subtotalAmount}`}
          </RowText>
        </Row>

        <Row>
          <RowLabel>
            Platform fee: <ToolTipIcon title={platformFeeToolTip} />
          </RowLabel>
          <RowText>${platformFeeAmount}</RowText>
        </Row>

        <Divider />

        <Row>
          <RowLabel>Total amount:</RowLabel>
          <RowText>${totalAmount}</RowText>
        </Row>
        {reservationInfo.status === ReservationStatus.PENDING && (
          <Row>
            <RowLabel>
              Your balance: <ToolTipIcon title={yourBalanceToolTip} />
            </RowLabel>
            <RowText>${userBalance}</RowText>
          </Row>
        )}
      </BottomContainer>

      <CustomButton
        variant="contained"
        color="secondary"
        onClick={onSubmit}
        loading={loading}
        disabled={reservationInfo.status !== ReservationStatus.PENDING}
      >
        {buttonTexts[reservationInfo.status]}
      </CustomButton>
      <Divider />

      <CustomButton
        variant="outlined"
        color="primary"
        onClick={onSubmitAsStream}
        loading={loading}
        disabled={reservationInfo.status !== ReservationStatus.PENDING}
      >
        {buttonTexts.stream}
      </CustomButton>
    </Container>
  );
};

export default PaymentDetailsContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 60%;
  padding: 10px;
  min-height: 675px;
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const RowLabel = styled.div`
  display: inherit;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
`;

const RowText = styled.div`
  display: inherit;
  justify-content: flex-end;
  align-content: center;
  align-items: center;
`;
