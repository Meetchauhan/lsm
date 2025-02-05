import { Alert, Button, Card, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RegisterSchema } from "../../validationSchema/ValidationSchema";
import { register } from "../../features/registerSlice";
import { AppDispatch, RootState } from "../../store/store";
import { registrationMail } from "../../features/mailSlice";
import { HiInformationCircle } from "react-icons/hi";
import { useState } from "react";

const Register = () => {
  const [showError, setShowError] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const registration = useSelector((state: RootState) => state?.register);
  const loading = registration?.loading;
  console.log("registration", registration);

  const navigate = useNavigate();
  const initialValue = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: initialValue,
    validationSchema: RegisterSchema,
    onSubmit: async (value, action) => {
      const response = await dispatch(register(value)).unwrap();
      if (response?.success) {
        await navigate("/login", { replace: true });
        await dispatch(registrationMail(value));
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
      {registration?.value?.success === false && showError && (
        <div className="flex justify-center absolute top-5 left-[50%] translate-x-[-50%]">
          <Alert color="failure" className="w-fit " icon={HiInformationCircle}>
            <span className="font-medium">{registration?.value?.message}</span>
          </Alert>
        </div>
      )}
      <div className="min-h-[100vh] flex items-center p-6 ">
        <Card className="max-w-lg mx-auto w-full">
          <h2 className="text-3xl text-center mb-3">Register</h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="firstName"
                  value="First Name"
                  className="text-lg"
                />
              </div>
              <TextInput
                id="fname"
                type="text"
                placeholder="First Name"
                name="firstName"
                onChange={handleChange}
                value={values.firstName}
              />
              <p className="text-sm text-red-700">
                {touched.firstName && errors.firstName}
              </p>
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="lastName"
                  value="Last Name"
                  className="text-lg"
                />
              </div>
              <TextInput
                id="lName"
                type="text"
                placeholder="Last Name"
                name="lastName"
                onChange={handleChange}
                value={values.lastName}
              />
              <p className="text-sm text-red-700">
                {touched.lastName && errors.lastName}
              </p>
            </div>
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
            Already have an account please{" "}
            <Link className="text-blue-800" to="/login">
              login...!
            </Link>
          </p>
        </Card>
      </div>
    </>
  );
};
export default Register;
