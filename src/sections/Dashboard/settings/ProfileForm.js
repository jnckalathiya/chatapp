import React, { useState, useCallback } from "react";
import * as Yup from "yup";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../../components/hook-form/FormProvider";
import {  Stack } from "@mui/material";
import { RHFTextField, RHFUploadAvatar } from "../../../components/hook-form";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUserProfile } from "../../../redux/slices/app";
import { faker } from "@faker-js/faker";
import { LoadingButton } from "@mui/lab";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const { user } = useSelector((state) => state.app);

  const ProfileSchema = Yup.object().shape({
    firstName: Yup.string().required("Name is Required"),
    about: Yup.string().required("About is Required"),
    avtar: Yup.string().required("Avtar is Reqired"),
  });

  const defaultValues = {
    firstName: user?.firstName,
    about: user?.about,
    avtar: faker.image.avatar(),
  };

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = methods;

  const values = watch();

  const onSubmit = async (data) => {
    try {
      console.log("Data", data);
      dispatch(
        UpdateUserProfile({
          firstName: data?.firstName,
          about: data?.about,
          avtar: file,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newfile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      if (file) {
        setValue("avtar", newfile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <RHFUploadAvatar
          name={"avatar"}
          maxSize={3145728}
          onDrop={handleDrop}
        />

        <RHFTextField
          name="firstname"
          label="First Name"
          helperText={"This name is visisble to your contacts"}
        />
        <RHFTextField multiline rows={4} name="about" label="About" />

        <Stack direction={"row"} justifyContent={"end"}>
          <LoadingButton
            color="primary"
            size="large"
            type="submit"
            variant="contained"
          >
            Save
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default ProfileForm;
