import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  Skeleton,
  Chip,
} from "@mui/material";
import styled from "styled-components";
import SectionTitle from "../../components/SectionTitle";
import { sfApi } from "../../app/store";
import { useAppSelector } from "../../app/hooks";
import { web3Selectors } from "../../app/web3Slice";
import getManageStreamsData, { StreamData } from "./getStreamData";
import formatAddress from "../../helperFunctions/formatAddress";

const MoneyStreams: React.FC = () => {
  const [getStreamsList, { isFetching }] = sfApi.useLazyListStreamsQuery({});
  const { provider, chainId, signerAddress } = useAppSelector(web3Selectors);

  const [incomingStreams, setIncomingStreams] = useState<StreamData[]>();
  const [outgoingStreams, setOutgoingStreams] = useState<StreamData[]>();

  const pageSize = 100;
  const outPage = 1;
  const inPage = 1;

  useEffect(() => {
    const loadStreamsData = async () => {
      const incomingStreamsResponse = await getStreamsList({
        chainId: chainId,
        senderAddress: "",
        receiverAddress: signerAddress,
        superTokenAddress: "",
        skip: (inPage - 1) * pageSize,
        take: pageSize,
      });
      const incomingStreams = getManageStreamsData(
        "sender",
        "incoming",
        incomingStreamsResponse?.data?.data
      );
      setIncomingStreams(incomingStreams);

      const outgoingStreamsResponse = await getStreamsList({
        chainId: chainId,
        senderAddress: signerAddress,
        receiverAddress: "",
        superTokenAddress: "",
        skip: (outPage - 1) * pageSize,
        take: pageSize,
      });
      const outgoingStreams = getManageStreamsData(
        "receiver",
        "outgoing",
        outgoingStreamsResponse?.data?.data
      );
      setOutgoingStreams(outgoingStreams);
    };
    loadStreamsData();
  }, [provider]);

  return (
    <>
      <Container maxWidth="xl">
        <Box mt={3}>
          <SectionTitle title="Manage your streams" />
          <Box mt={6}>
            <Typography variant="h5" gutterBottom>
              Incoming Streams &nbsp;
              <Chip label={incomingStreams?.length || 0} />
            </Typography>

            <StyledPaper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Address</TableCell>
                    <TableCell>Stream Direction</TableCell>
                    <TableCell>Currency</TableCell>
                    <TableCell>Flowrate</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isFetching
                    ? Array.from({ length: 3 }).map((_, index) => (
                        <TableRow key={index}>
                          {Array.from({ length: 4 }).map((_, cellIndex) => (
                            <TableCell key={cellIndex}>
                              <Skeleton width="60%" />
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    : incomingStreams?.map((stream) => (
                        <TableRow key={stream.id}>
                          <TableCell>{formatAddress(stream.address)}</TableCell>
                          <TableCell>{stream.direction}</TableCell>
                          <TableCell>{stream.currencySymbol}</TableCell>
                          <TableCell>{stream.flowRate}</TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </StyledPaper>
          </Box>
          <Box mt={6}>
            <Typography variant="h5" gutterBottom>
              Outgoing Streams &nbsp;
              <Chip label={outgoingStreams?.length || 0} />
            </Typography>
            <StyledPaper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Address</TableCell>
                    <TableCell>Stream Direction</TableCell>
                    <TableCell>Currency</TableCell>
                    <TableCell>Flowrate</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isFetching
                    ? Array.from({ length: 3 }).map((_, index) => (
                        <TableRow key={index}>
                          {Array.from({ length: 4 }).map((_, cellIndex) => (
                            <TableCell key={cellIndex}>
                              <Skeleton width="60%" />
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    : outgoingStreams?.map((stream) => (
                        <TableRow key={stream.id}>
                          <TableCell>{formatAddress(stream.address)}</TableCell>
                          <TableCell>{stream.direction}</TableCell>
                          <TableCell>{stream.currencySymbol}</TableCell>
                          <TableCell>{stream.flowRate}</TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </StyledPaper>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default MoneyStreams;

const StyledPaper = styled(Paper)`
  transition: 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 30px rgba(0, 0, 0, 0.12);
  }
`;
