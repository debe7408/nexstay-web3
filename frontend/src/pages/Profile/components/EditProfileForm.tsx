import { TextField, Typography, Grid, Button } from "@mui/material";
import { useState } from "react";
import { User } from "../../../types/user";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ContactInfo } from "../../../types/contactInfo";
import { updateContactInfo } from "../../../api/updateContactInfo";
import { useSnackbar } from "notistack";

interface Props {
  user: User;
}

const EditProfileForm: React.FC<Props> = ({ user }) => {
  const [editable, setEditable] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    reset,
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

  const handleEditProfile = () => {
    setEditable(true);
  };

  const handleDiscardChanges = () => {
    setEditable(false);
    reset(user);
  };

  const onSubmit = handleSubmit(async (formData) => {
    const { hasError } = await updateContactInfo(formData);

    if (!hasError) {
      enqueueSnackbar("Contact information updated", {
        variant: "success",
      });
    } else {
      enqueueSnackbar("There was something wrong with new information.", {
        variant: "error",
      });
      reset(user);
    }
    setEditable(false);
  });

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="First name"
            variant="outlined"
            defaultValue={user.firstName}
            disabled={!editable}
            {...register("firstName")}
            {...(errors.firstName && {
              error: true,
              helperText: errors.firstName.message,
            })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Last name"
            variant="outlined"
            defaultValue={user.lastName}
            disabled={!editable}
            {...register("lastName")}
            {...(errors.lastName && {
              error: true,
              helperText: errors.lastName.message,
            })}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            defaultValue={user.email}
            disabled={!editable}
            {...register("email")}
            {...(errors.email && {
              error: true,
              helperText: errors.email.message,
            })}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Age"
            variant="outlined"
            defaultValue={user.age}
            disabled={!editable}
            {...register("age")}
            {...(errors.age && {
              error: true,
              helperText: errors.age.message,
            })}
          />
        </Grid>
        {editable ? (
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  type="submit"
                >
                  Save
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  onClick={handleDiscardChanges}
                >
                  Discard
                </Button>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Button fullWidth variant="outlined" onClick={handleEditProfile}>
              <Typography variant="body1">Edit profile</Typography>
            </Button>
          </Grid>
        )}
      </Grid>
    </form>
  );
};

export default EditProfileForm;
