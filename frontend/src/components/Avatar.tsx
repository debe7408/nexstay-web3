import Avatar, { genConfig } from "react-nice-avatar";

interface Props {
  id: number;
  customWidth?: string;
  customHeight?: string;
}

const ProfileAvatar: React.FC<Props> = ({ id, customWidth, customHeight }) => {
  const config = genConfig(id.toString());

  return (
    <Avatar
      style={{ width: customWidth || "3rem", height: customHeight || "3rem" }}
      {...config}
      hairColorRandom={true}
    />
  );
};

export default ProfileAvatar;
