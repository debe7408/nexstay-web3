import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import SectionTitle from "../../../components/SectionTitle";
import RatingComponent from "../../../components/RatingComponent";
import CustomButton from "../../../components/CustomButton";
import { colors } from "../../../constants/colors";
import ErrorComponent from "../../../components/ErrorComponent";
import { getReviewByReservationId, postReview } from "../../../api/reviewAPI";
import { useNavigate } from "react-router-dom";

interface Props {
  reservationId: string;
}

const getTitleText = (disabled: boolean): string => {
  return disabled
    ? "Thank you for your review!"
    : "Help us improve by leaving a review!";
};

const LeaveReviewContainer: React.FC<Props> = ({ reservationId }) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const onSubmit = async () => {
    if (!rating || !comment) {
      setError(true);
    } else {
      setError(false);

      const { message, error } = await postReview(
        reservationId,
        rating,
        comment
      );

      enqueueSnackbar(message, {
        variant: error ? "error" : "success",
      });

      if (!error) {
        navigate("/");
      }
    }
  };

  const fetchExistingReview = useCallback(async () => {
    const { message, review, error } = await getReviewByReservationId(
      reservationId
    );

    if (review && !error) {
      setRating(review.rating);
      setComment(review.comment);
      setDisabled(true);
    }
  }, [reservationId]);

  useEffect(() => {
    fetchExistingReview();
  }, [reservationId]);

  return (
    <Container>
      <SectionTitle title={getTitleText(disabled)} />

      <RatingComponent
        label={"How was your overall stay?"}
        rating={rating}
        setRating={setRating}
        disabled={disabled}
      />

      <CommentBox>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Share more about your stay. What did you like? What didn't you like?
        </Typography>
        <TextField
          id="review-comment-input"
          label="Comments"
          multiline
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={disabled}
        />
      </CommentBox>

      {!disabled && (
        <CustomButton
          fullWidth
          onClick={onSubmit}
          variant="contained"
          color="primary"
          disabled={disabled}
        >
          Submit a review!
        </CustomButton>
      )}

      {error && (
        <ErrorComponent message="Please fill all the fields before submitting." />
      )}
    </Container>
  );
};

export default LeaveReviewContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  gap: 20px;
  background-color: ${colors.pastelPurple}};
  border-radius: 10px;
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
