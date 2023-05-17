import styled from "styled-components";
import { colors } from "../../../constants/colors";
import CustomButton from "../../../components/CustomButton";
import { Typography } from "@mui/material";
import ToolTipIcon from "../../../components/ToolTipIcon";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Property } from "../../../types/property";
import { ContactInfo } from "../../../types/contactInfo";
import ContactInfoForm from "../../Host/ContactInfo/ContactInfoForm";
import Divider from "../../../components/DividerComponent";
import { Reservation, ReservationStatus } from "../../../types/reservation";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { fetchAndUpdateUserInfo, selectUser } from "../../../app/loginSlice";
import { updateContactInfo } from "../../../api/updateContactInfo";
import { useSnackbar } from "notistack";
import { calculateDayDifference } from "../../../helperFunctions/dateFunctions";

interface Props {
  propertyInfo: Property;
  handlePayment: () => void;
  loading: boolean;
  reservationInfo: Reservation;
}

const PaymentDetailsContainer: React.FC<Props> = ({
  handlePayment,
  propertyInfo,
  loading,
  reservationInfo,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const totalNights = calculateDayDifference(
    reservationInfo.end_date,
    reservationInfo.start_date
  );

  const subtotalToolTip =
    "Subtotal is the price of the property times the number of nights.";
  const platformFeeToolTip = "Platform fee is 5% of the subtotal amount.";

  const buttonTexts = {
    [ReservationStatus.PENDING]: "Make Payment",
    [ReservationStatus.CONFIRMED]: "Reservation Confirmed",
    [ReservationStatus.CANCELED]: "Cancelled",
    [ReservationStatus.COMPLETED]: "Completed",
    [ReservationStatus.EXPIRED]: "Expired",
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

  const onSubmit = handleSubmit(async (formData, event) => {
    if (!isDirty) {
      enqueueSnackbar("There were no changes.", {
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
      </BottomContainer>

      <CustomButton
        variant="contained"
        color="primary"
        onClick={onSubmit}
        loading={loading}
        disabled={reservationInfo.status !== ReservationStatus.PENDING}
      >
        {buttonTexts[reservationInfo.status]}
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
  padding: 20px;
  background-color: ${colors.white};
  border-radius: 10px;
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
  color: ${colors.navyBlue};
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
