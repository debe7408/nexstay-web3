import { useState } from "react";
import { Container, Grid, Paper, Typography } from "@mui/material";
import styled from "styled-components";
import UserManagement from "./UserManagement";
import PropertyManagement from "./PropertyManagement";
import AdminDrawer from "./components/AdminDrawer";
import { colors } from "../../constants/colors";
import ReservatioManagement from "./ReservationManagement";
import TicketManagement from "./TicketManagement";

const AdminDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleSwitchTab = (indexNumber: number) => {
    setSelectedTab(indexNumber);
  };

  return (
    <>
      <StyledContainer maxWidth="xl">
        <Header container>
          <Grid item>
            <AdminDrawer handleSwitchTab={handleSwitchTab} />
          </Grid>
          <Grid item>
            <HeaderText variant="h6">Admin Dashboard</HeaderText>
          </Grid>
          <Grid item xs={12} md={10}>
            <HeaderText variant="h6">
              {selectedTab === 0
                ? "Users Management"
                : selectedTab === 1
                ? "Properties Management"
                : selectedTab === 2
                ? "Reservations Management"
                : "Tickets Management"}
            </HeaderText>
          </Grid>
        </Header>
        <StyledPaper>
          {selectedTab === 0 && <UserManagement />}
          {selectedTab === 1 && <PropertyManagement />}
          {selectedTab === 2 && <ReservatioManagement />}
          {selectedTab === 3 && <TicketManagement />}
        </StyledPaper>
      </StyledContainer>
    </>
  );
};

const StyledContainer = styled(Container)`
  padding-top: 24px;
  padding-left: 48px;
  padding-right: 48px;
`;

const Header = styled(Grid)`
  display: flex;
  flex-direction: row;
  border-radius: 4px;
  padding: 8px;
  gap: 8px;
  color: ${colors.white};
  background-color: ${colors.navyBlue};
  box-shadow: 0 8px 16px -8px rgba(0, 0, 0, 0.3);
`;

const HeaderText = styled(Typography)`
  display: flex;
  justify-content: flex-end;
  margin-top: 4px;
`;

const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 16px -8px rgba(0, 0, 0, 0.3);
`;

export default AdminDashboard;
