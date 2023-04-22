import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface Props {
  containerStyle: {
    width: string;
    height: string;
    borderRadius?: string;
  };
  center: {
    lat: number;
    lng: number;
  };
}

const MapsComponent: React.FC<Props> = ({ containerStyle, center }) => {
  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string}
    >
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <>
          <Marker position={center} animation={0.0} />
        </>
      </GoogleMap>
    </LoadScript>
  );
};

export default MapsComponent;
