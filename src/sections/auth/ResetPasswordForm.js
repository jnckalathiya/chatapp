import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider, { RHFTextField } from "../../components/hook-form";
import { ForgotPassword } from "../../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";

const ResetPasswordForm = () => {
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is Required")
      .email("Email must be valid email address"),
  });

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues :{email : "demo@tawk.com"},
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    try {
      // data = {email: ""}
      // submit data to backend
      dispatch(ForgotPassword(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField name="email" label="Email Address" />

      <LoadingButton
        loading={isLoading}
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        sx={{
          mt: 3,
          bgcolor: "text.primary",
          color: (theme) =>
            theme.palette.mode === "light" ? "common.white" : "grey.800",
          "&:hover": {
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
          },
        }}
      >
        Send Request
      </LoadingButton>
    </FormProvider>
  );
};

export default ResetPasswordForm;
