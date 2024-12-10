import { LogOutAlert } from "@/components/logout";
import { useAppSelector } from "@/redux/hook";
import { Link } from "react-router";

const Dashboard = () => {
  const user = useAppSelector((state) => state.userState.user);
  return (
    <div className="min-h-screen bg-gray-100 p-4 py-24">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Dashboard Header */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
            <p className="italic mt-4">{user?.username}</p>
          </div>
          <LogOutAlert />
        </div>

        {/* Dashboard Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create Post */}
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Create Post
            </h2>
            <Link
              to={"posts/new"}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              New Post
            </Link>
          </div>

          {/* Manage Posts */}
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Manage Posts
            </h2>
            <Link
              to={`posts`}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              View Posts
            </Link>
          </div>

          {/* Settings */}
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Settings
            </h2>
            <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition">
              Edit Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
