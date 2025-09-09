import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/inputs/layouts/authLayout";
import Input from "../../components/inputs/input";
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError("Please enter your name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter your password");
      return;
    }

    setError("");

    try {
      const response = await fetch("https://mindmatrix-3.onrender.com/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: fullName, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.msg || "Signup failed");
        return;
      }

      // Redirect to login after successful signup
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-2xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us by entering your details below.
        </p>
        <form onSubmit={handleSignUp}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="Name"
              type="text"
            />
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="Enter your email"
              type="text"
            />
            <div className="col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Min 8 Characters"
                type="password"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            SIGN UP
          </button>
        </form>

        <p className="text-[13px] text-state-800 mt-3">
          Already have an account?{" "}
          <Link className="font-medium text-primary underline" to="/login">
            LOGIN
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
