import React, { useState } from "react";
import { IconButton, Tooltip, Typography } from "@mui/material";
import styled from "styled-components";
import ContactInfoForm from "../Host/ContactInfo/ContactInfoForm";
import { useForm } from "react-hook-form";
import { ContactInfo } from "../../types/contactInfo";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Divider from "../../components/DividerComponent";
import { colors } from "../../constants/colors";
import CustomButton from "../../components/CustomButton";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { paymentTransaction } from "../../web3/transactions";
import { useAppSelector } from "../../app/hooks";
import { web3Selectors } from "../../app/web3Slice";

// ! TODO - add property details
// ! TODO - add payment details
const subtotalToolTip = "Subtotal is the price of the property";
const platformFeeToolTip = "Platform fee is 5% of the subtotal";
const propertyOwnerAddress = "0xd83bF311d2e0036C3D0432DBab8664Cf062B836f";

const ManagePayment: React.FC = () => {
  const { chainId, signerAddress, provider } = useAppSelector(web3Selectors);
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!provider) return;
    setLoading(true);

    const response = await paymentTransaction(
      provider,
      1,
      propertyOwnerAddress
    );
    console.log(response);
    setLoading(false);
  };

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
      <PaymentDetailsContainer>
        <Typography variant="h6">Contact details</Typography>

        <ContactInfoForm register={register} errors={errors} />

        <TransactionDetailsContainer>
          <Typography variant="h6">Transaction details</Typography>
          <TransactionDetailsRow>
            <TransactionDetailsLabel>
              Subtotal: <ToolTipIcon title={subtotalToolTip} />
            </TransactionDetailsLabel>
            <TransactionDetailsAmount>0.1 ETH</TransactionDetailsAmount>
          </TransactionDetailsRow>

          <TransactionDetailsRow>
            <TransactionDetailsLabel>
              Platform fee: <ToolTipIcon title={platformFeeToolTip} />
            </TransactionDetailsLabel>
            <TransactionDetailsAmount>0.1 ETH</TransactionDetailsAmount>
          </TransactionDetailsRow>

          <Divider />

          <TransactionDetailsRow>
            <TransactionDetailsLabel>Total amount:</TransactionDetailsLabel>
            <TransactionDetailsAmount>0.1 ETH</TransactionDetailsAmount>
          </TransactionDetailsRow>
        </TransactionDetailsContainer>

        <CustomButton
          variant="contained"
          color="primary"
          onClick={handleSubmit(handlePayment)}
          loading={loading}
        >
          Make Payment
        </CustomButton>
      </PaymentDetailsContainer>
      <PropertyDetailsContainer>Labas</PropertyDetailsContainer>
    </Container>
  );
};

export default ManagePayment;

interface ToolTipProps {
  title: string;
}
const ToolTipIcon: React.FC<ToolTipProps> = ({ title }) => (
  <Tooltip title={title} placement="top">
    <IconButton>
      <Icon />
    </IconButton>
  </Tooltip>
);

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

const PaymentDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 60%;
  padding: 20px;
  background-color: ${colors.white};
  border-radius: 10px;
`;
const PropertyDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40%;
  padding: 20px;
  background-color: ${colors.pastelPurple};
  border-radius: 10px;
`;

const TransactionDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const TransactionDetailsRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: ${colors.navyBlue};
`;

const TransactionDetailsLabel = styled.div`
  display: inherit;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
`;

const TransactionDetailsAmount = styled.div`
  display: inherit;
  justify-content: flex-end;
  align-content: center;
  align-items: center;
`;

const Icon = styled(HelpOutlineIcon)`
  font-size: 1rem;
`;
