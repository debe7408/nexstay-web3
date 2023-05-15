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
import { ReservationStatus } from "../../../types/reservation";

interface Props {
  propertyInfo: Property;
  handlePayment: () => void;
  loading: boolean;
  status: ReservationStatus;
}

const PaymentDetailsContainer: React.FC<Props> = ({
  handlePayment,
  propertyInfo,
  loading,
  status,
}) => {
  const subtotalToolTip = "Subtotal is the price of the property";
  const platformFeeToolTip = "Platform fee is 5% of the subtotal";
  const getButtonText = () => {
    switch (status) {
      case ReservationStatus.PENDING:
        return "Make Payment";
      case ReservationStatus.CONFIRMED:
        return "Reservation Confirmed";
      case ReservationStatus.CANCELED:
        return "Cancelled";
      case ReservationStatus.COMPLETED:
        return "Completed";
      case ReservationStatus.EXPIRED:
        return "Expired";
      default:
        return "Pay";
    }
  };

  const subtotalAmount = propertyInfo.price;
  const platformFeeAmount = subtotalAmount * 0.05;
  const totalAmount = subtotalAmount + platformFeeAmount;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInfo>({
    resolver: yupResolver(
      yup.object().shape({
        firstName: yup.string().required().min(2),
        lastName: yup.string().required().min(3),
        email: yup.string().required().email(),
        age: yup.number().required().min(20).max(90),
      })
    ),
  });

  return (
    <Container>
      <Typography variant="h6">Contact details</Typography>

      <ContactInfoForm register={register} errors={errors} />

      <BottomContainer>
        <Typography variant="h6">Transaction details</Typography>
        <Row>
          <RowLabel>
            Subtotal: <ToolTipIcon title={subtotalToolTip} />
          </RowLabel>
          <RowText>${subtotalAmount}</RowText>
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
        onClick={handleSubmit(handlePayment)}
        loading={loading}
        disabled={status !== ReservationStatus.PENDING}
      >
        {getButtonText()}
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
