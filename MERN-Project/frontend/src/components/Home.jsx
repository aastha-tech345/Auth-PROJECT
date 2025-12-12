import { Link } from "react-router-dom";
import DigitalClock from "../components/DigitalClock";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-5xl font-bold text-black">
        MERN Stack <span className="text-blue-600">Machine Test</span>
      </h1>

      <p className="mt-4 text-gray-600">
        A complete full-stack application with user authentication, digital clock,
        and hierarchical data management.
      </p>

      <div className="mt-6 flex gap-4">
        <Link to="/login" className="px-6 py-2 bg-blue-600 text-white rounded-lg">
          Get Started →
        </Link>

        <Link to="/login" className="px-6 py-2 bg-white border rounded-lg">
          Login
        </Link>
      </div>

      <div className="mt-10">
        <DigitalClock />
      </div>
    </div>
  );
}
