import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import { z } from "zod";
import { useUser } from "../../GlobalContext/UserContext";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  age: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "string" ? parseInt(val) : val))
    .refine((val) => !isNaN(val) && val >= 10 && val <= 100, {
      message: "Age must be between 10 and 100",
    })
    .optional(),
  address: z.string().optional(),
});

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login: setUser } = useUser();
  const navigate = useNavigate();

  const schema = isLogin ? loginSchema : registerSchema;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const onSubmit = async (data) => {
    try {
      const endpoint = isLogin
        ? `${API_BASE_URL}/auth/login`
        : `${API_BASE_URL}/auth/register`;

      if (!isLogin) {
        data.language = "bn";
      }

      const res = await axios.post(endpoint, data);
      if (res.data.token) {
        setUser({ ...res.data.user, token: res.data.token });
        toast.success("Login Successful!");
        reset();
        if(res.data.user.role =='customer') navigate("/");
        else if(res.data.user.role =='agent') navigate("/agent");
        else if(res.data.user.role =='admin') navigate("/admin");

      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-secondary-blue/5 to-primary-blue/20 flex justify-center items-center px-4 py-8">
      <div className="w-full max-w-6xl flex flex-col md:flex-row shadow-2xl rounded-3xl overflow-hidden bg-white relative">
        {/* Sidebar */}
        <div className="w-full md:w-1/2 bg-primary-blue text-white flex flex-col justify-center items-center p-10 transition-all duration-500 rounded-b-3xl md:rounded-b-none md:rounded-r-[8rem]">
          <h2 className="text-3xl font-bold mb-2 text-center">
            {isLogin ? "New here?" : "Welcome Back!"}
          </h2>
          <p className="mb-6 text-center px-4 md:px-0">
            {isLogin
              ? "Register now and start your journey with us."
              : "Login with your credentials to continue."}
          </p>
          <Toaster position="top-center" reverseOrder={false} />
          <button
            onClick={() => {
              reset();
              setIsLogin(!isLogin);
            }}
            className="bg-white text-primary-blue px-6 py-2 rounded-full font-semibold shadow hover:bg-gray-100 transition"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </div>

        {/* Auth Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-primary-blue">
            {isLogin ? "Login" : "Register"}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    {...register("name")}
                    className="input-style"
                  />
                  <p className="text-red-500 text-sm">{errors.name?.message}</p>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Phone"
                    {...register("phone")}
                    className="input-style"
                  />
                  <p className="text-red-500 text-sm">{errors.phone?.message}</p>
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Age"
                    {...register("age")}
                    className="input-style"
                  />
                  <p className="text-red-500 text-sm">{errors.age?.message}</p>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Address"
                    {...register("address")}
                    className="input-style"
                  />
                </div>
              </>
            )}
            <div>
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="input-style"
              />
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="input-style"
              />
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-blue text-white py-2 rounded-full font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isSubmitting
                ? "Please wait..."
                : isLogin
                ? "Login"
                : "Register"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;
