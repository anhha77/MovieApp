import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Stack } from "@mui/material";
import { withStyles } from "@mui/styles";
import { FTextField, FormProvider } from "../components/form";
import Button from "@mui/material/Button";

const styledBtn = {
  backgroundColor: "secondary.light",
  "&:hover": {
    backgroundColor: "secondary.main",
  },
};

const FTextFieldCustom = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#FF8243",
      },
      "&:hover fieldset": {
        borderColor: "#cc571f",
      },
    },
  },
})(FTextField);

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
});

const defaultValues = {
  username: "",
};

function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    let from = location.state?.from?.pathname || "/";
    let username = data.username;

    auth.login(username, () => {
      navigate(from, { replace: true });
    });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ minWidth: "350px" }}>
        <FTextFieldCustom
          name="username"
          label="Username"
          InputLabelProps={{ style: { color: "#d35400" } }}
          sx={{ input: { color: "#fff" } }}
        />
        <Button type="submit" variant="contained" sx={styledBtn}>
          Login
        </Button>
      </Stack>
    </FormProvider>
  );
}

export default LoginPage;
