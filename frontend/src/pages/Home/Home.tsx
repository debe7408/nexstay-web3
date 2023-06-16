import { useCallback, useEffect, useState } from "react";
import { Grid, Container, Button } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import PropertyContainer from "../../components/PropertyContainer";
import LoadingComponent from "../../components/PropertyLoadingComponent";
import { getPropertiesPerPage } from "../../api/getProperty";
import { Property } from "../../types/property";
import EndMessage from "../../components/EndMessageComponent";
import LocationAutoComplete from "../../components/LocationAutoComplete";
import { useAppSelector } from "../../app/hooks";
import { web3Selectors } from "../../app/web3Slice";
import { BigNumber } from "ethers";
import { sfApi } from "../../app/store";
import { Tx } from "../../web3/superfluid";
import { CreateFlow } from "@streamable-finance/sdk-redux";

const Home = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { provider, chainId } = useAppSelector(web3Selectors);
  const [upgradeToSuperToken, { isLoading }] =
    sfApi.useUpgradeToSuperTokenMutation();

  const [downgradeFromSuperToken] = sfApi.useDowngradeFromSuperTokenMutation();

  const [createFlow] = sfApi.useCreateFlowMutation();
  const [updateFlow] = sfApi.useUpdateFlowMutation();

  const [getStreamsList, { data: streams, isError, isFetching }] =
    sfApi.useLazyListStreamsQuery({});

  const fetchedProperties = useCallback(async () => {
    const { message, properties, error } = await getPropertiesPerPage(
      page,
      selectedCountry
    );
    if (error || !properties) {
      return;
    }

    if (properties.length === 0) {
      setHasMore(false);
      return;
    }

    setProperties((prevProperties) => [...prevProperties, ...properties]);
  }, [page]);

  useEffect(() => {
    fetchedProperties();
  }, [page, fetchedProperties]);

  useEffect(() => {
    setProperties([]);
    setPage(1);
    setHasMore(true);
  }, [selectedCountry]);

  const handleOnUpgrade = async () => {
    if (!provider) return;
    const amount = BigNumber.from("10000000000000000000");

    const tx: Tx = await upgradeToSuperToken({
      waitForConfirmation: true,
      chainId,
      superTokenAddress: "0x03bb4fa30f4db2727e9c4756e046e88db3a7994b",
      amountWei: amount.toString(),
    });

    console.log(tx);
  };
  const handleOnDowngrade = async () => {
    if (!provider) return;
    const amount = BigNumber.from("10000000000000000000");

    const tx: Tx = await downgradeFromSuperToken({
      waitForConfirmation: true,
      chainId,
      superTokenAddress: "0x03bb4fa30f4db2727e9c4756e046e88db3a7994b",
      amountWei: amount.toString(),
    });

    console.log(tx);
  };

  const handleSendStream = async () => {
    if (!provider) return;
    const amount = BigNumber.from("1000000000000000000")
      .div(3600)
      .div(24)
      .div(30)
      .toString();
    const signerAddress = await provider.getSigner().getAddress();

    const tx = await createFlow({
      senderAddress: signerAddress,
      receiverAddress: "0xd83bF311d2e0036C3D0432DBab8664Cf062B836f",
      flowRateWei: amount,
      chainId,
      superTokenAddress: "0x03bb4fa30f4db2727e9c4756e046e88db3a7994b",
      waitForConfirmation: true,
    } as CreateFlow);

    console.log(tx);
  };

  return (
    <Container>
      <Grid
        container
        spacing={2}
        sx={{
          minHeight: "100vh",
        }}
      >
        <Button onClick={handleOnUpgrade}>Upgrade</Button>
        <Button onClick={handleOnDowngrade}>Downgrade</Button>
        <Button onClick={handleSendStream}>Stream</Button>
        <Grid item xs={12}>
          <h1>Welcome. Your journey starts here</h1>
        </Grid>
        <Grid item xs={12}>
          <LocationAutoComplete
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
          />
        </Grid>

        <Grid item xs={12}>
          <InfiniteScroll
            dataLength={properties.length}
            next={() => setPage((prevPage) => prevPage + 1)}
            hasMore={hasMore}
            loader={<LoadingComponent />}
            endMessage={<EndMessage />}
          >
            <PropertyContainer properties={properties}></PropertyContainer>
          </InfiniteScroll>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
