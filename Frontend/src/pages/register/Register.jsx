import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import MessageIcon from "@mui/icons-material/Message";
import { Bounce, toast } from "react-toastify";

function Register() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [DOB, setDOB] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords and Confirm password do not match");
      return;
    }
    dispatch(registerUser({ name, email, DOB, gender, password }))
      .unwrap()
      .then(() => {
        toast.success("Registration successful!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  // Extract field-specific errors
  const getFieldError = (field) => {
    if (!error || !Array.isArray(error.errors)) return "";
    const fieldError = error.errors.find((err) => err.path === field);
    return fieldError ? fieldError.msg : "";
  };

  // Password visibility toggle
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex items-center justify-center bg-white shadow-lg rounded-lg overflow-hidden w-11/12 md:w-3/4 lg:w-2/3">
        <div className="w-full md:w-1/2 p-8">
          <div className="ml-32 mb-3 ">
            <h1 className="text-2xl font-SourceCode text-green-800 ">
              <MessageIcon />
              UniChat
            </h1>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Sign Up
          </h2>
          <p className="text-center text-gray-500 mb-6 text-sm">
            Fill in the details to create your account
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/*show global error */}
            {error?.message && (
              <p className="text-red-500 text-center mb-4">{error.message}</p>
            )}

            {/* Full Name */}
            <div>
              <span className="block text-sm font-medium text-gray-700">
                Full Name
              </span>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {getFieldError("name") && (
                <p className="text-red-500 text-sm">{getFieldError("name")}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <span className="block text-sm font-medium text-gray-700">
                Email
              </span>
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {getFieldError("email") && (
                <p className="text-red-500 text-sm">{getFieldError("email")}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <span className="block text-sm font-medium text-gray-700">
                Date of Birth
              </span>
              <input
                type="date"
                value={DOB}
                required
                onChange={(e) => setDOB(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {getFieldError("DOB") && (
                <p className="text-red-500 text-sm">{getFieldError("DOB")}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <span className="block text-sm font-medium text-gray-700">
                Gender
              </span>
              <select
                value={gender}
                required
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {getFieldError("gender") && (
                <p className="text-red-500 text-sm">
                  {getFieldError("gender")}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <span className="block text-sm font-medium text-gray-700">
                Password
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {getFieldError("password") && (
                <p className="text-red-500 text-sm">
                  {getFieldError("password")}
                </p>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-500"
              >
                {showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <span className="block text-sm font-medium text-gray-700">
                Confirm Password
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="********"
                value={confirmPassword}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 text-gray-500"
              >
                {showConfirmPassword ? (
                  <RemoveRedEyeIcon />
                ) : (
                  <VisibilityOffIcon />
                )}
              </button>
              {getFieldError("confirmPassword") && (
                <p className="text-red-500 text-sm">
                  {getFieldError("confirmPassword")}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition duration-300"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
