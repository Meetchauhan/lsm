import { Button, Card, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { Link, useNavigate } from "react-router-dom";
import { AdminLoginSchema } from "../../../validationSchema/ValidationSchema";
import { adminLogin, adminNavigation } from "../../../features/adminAuthSlice";

interface AdminLogin {
  authantication: [];
}

const AdminLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authantication = useSelector((state: RootState) => state?.adminAuth);
  console.log("admin authantication", authantication);
  const loading = authantication?.loading;

  const initialValue = {
    email: "",
    password: "",
  };
  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: initialValue,
    validationSchema: AdminLoginSchema,
    onSubmit: async (value, action) => {
      await dispatch(adminLogin(value));
      await dispatch(adminNavigation())
    //   await dispatch(getProfile());
    //   await dispatch(fetchLeave());
      navigate("/dashboard", { replace: true });
      if (authantication?.value?.success) {
        action.resetForm();
      }
    },
  });
  return (
    <div className="min-h-[100vh] flex items-center p-6 ">
      <Card className="max-w-lg mx-auto w-full">
        <h2 className="text-3xl text-center mb-3">Admin Login</h2>
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
          <Button type="submit">
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
  );
};
export default AdminLogin;
