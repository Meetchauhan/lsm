import { Alert, Button, Card, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { LoginSchema } from "../../validationSchema/ValidationSchema";
import { useDispatch, useSelector } from "react-redux";
import { authNavigation, login } from "../../features/authSlice";
import { AppDispatch, RootState } from "../../store/store";
import { Link, useNavigate } from "react-router-dom";
import { getProfile } from "../../features/profileSlice";
import { fetchLeave } from "../../features/leaveSlice";
import { HiInformationCircle } from "react-icons/hi";
import { useState } from "react";

interface Login {
  authantication: [];
}

const Login = () => {
  const [showError, setShowError] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authantication = useSelector((state: RootState) => state?.auth);
  console.log("authantication", authantication);
  const loading = authantication?.loading;

  const initialValue = {
    email: "",
    password: "",
  };
  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: initialValue,
    validationSchema: LoginSchema,
    onSubmit: async (value, action) => {
      const response = await dispatch(login(value)).unwrap();
      console.log("login reps, ", response);
      if (response.success) {
        await dispatch(authNavigation());
        await dispatch(getProfile());
        await dispatch(fetchLeave());
        navigate("/", { replace: true });
        action.resetForm();
      } else {
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 3000);
      }
    },
  });
  return (
    <>
      {" "}
      {authantication?.value?.success === false && showError && (
        <div className="flex justify-center absolute top-5 left-[50%] translate-x-[-50%]">
          <Alert color="failure" className="w-fit " icon={HiInformationCircle}>
            <span className="font-medium">
              {authantication?.value?.message}
            </span>
          </Alert>
        </div>
      )}
      <div className="min-h-[100vh] flex items-center p-6 ">
        <Card className="max-w-lg mx-auto w-full">
          <h2 className="text-3xl text-center mb-3">Login</h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" className="text-lg" />
              </div>
              <TextInput
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={values.email}
              />
              <p className="text-sm text-red-700">
                {touched.email && errors.email}
              </p>
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="password1"
                  value="Your password"
                  className="text-lg"
                />
              </div>
              <TextInput
                id="password1"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={values.password}
              />
              <p className="text-sm text-red-700">
                {touched.password && errors.password}
              </p>
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Authanticating..." : "Submit"}
            </Button>
          </form>
          <p className="text-center">
            Didn't have any account please{" "}
            <Link className="text-blue-800" to="/register">
              register...!
            </Link>
          </p>
        </Card>
      </div>
    </>
  );
};
export default Login;
