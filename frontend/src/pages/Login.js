import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);


  // ================= AUTO REDIRECT =================
  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    const role =
      localStorage.getItem("role") || sessionStorage.getItem("role");

    if (token && role) {
      if (role.toLowerCase() === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [navigate]);


  // ================= LOGIN =================
  const login = async () => {
    try {
      setLoading(true);

      const res = await api.post("/login", {
        email,
        password,
      });

      const token = res.data.token;
      const role = res.data.role?.toLowerCase();

      if (!token || !role) {
        toast.error("Invalid server response ❌");
        return;
      }

      // Save token + role
      if (remember) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
      } else {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("role", role);
      }

      toast.success("Login successful 🎉");

      // small delay so user sees toast
      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      }, 800);

    } catch {
      toast.error("Invalid email or password ❌");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="login-shell">
      <div className="glass-card">
        <div className="card-body">
          <h3 className="text-center mb-2">🔐 Admin Login</h3>
          <div className="text-center login-subtitle mb-4">
            Sign in to manage inventory and orders.
          </div>

          {/* Email */}
          <input
            type="email"
            className="form-control app-input mb-3"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <div className="input-group mb-3">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control app-input"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="btn btn-outline-secondary btn-pill"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Remember */}
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label className="form-check-label">Remember me</label>
            </div>
            <div className="text-secondary small">Admin only</div>
          </div>

          {/* Login button */}
          <button
            className="btn btn-brand btn-pill w-100"
            onClick={login}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
