import Avatar, { genConfig } from "react-nice-avatar";

interface Props {
  publicAddress: string;
  customWidth?: string;
  customHeight?: string;
}

const ProfileAvatar: React.FC<Props> = ({
  publicAddress,
  customWidth,
  customHeight,
}) => {
  const config = genConfig(publicAddress);

  return (
    <Avatar
      style={{ width: customWidth || "3rem", height: customHeight || "3rem" }}
      {...config}
      hairColorRandom={true}
    />
  );
};

export default ProfileAvatar;
