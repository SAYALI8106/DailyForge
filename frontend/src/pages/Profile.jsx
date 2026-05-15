import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';

const Profile = () => {
  // auth context
  const { user, setUser } = useContext(AuthContext);

  // states
  const [name, setName] = useState(user?.name || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // update name handler
  const handleNameUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await api.patch('/auth/profile', {
        name,
      });

      // update user in context
      setUser(res.data.user);

      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update name');
    }
  };

  // update password handler
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await api.patch('/auth/profile', {
        currentPassword,
        newPassword,
      });

      alert(res.data.message);

      // clear password fields
      setCurrentPassword('');
      setNewPassword('');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update password');
    }
  };

  return (
    <div
      className="
        surface-bg px-10 py-10 rounded-2xl
        w-full max-w-md
        flex flex-col gap-8 animate-in
      "
    >
      {/* Profile Header */}

      <div className="text-center space-y-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-main">{user?.name}</h1>
          <p className="text-sm text-muted">{user?.email}</p>
        </div>
      </div>

      {/* Update Name Section */}

      <form onSubmit={handleNameUpdate} className="flex flex-col gap-5">
        <div className="space-y-1">
          <p className="text-sm text-muted">
            Change how your name appears across DailyForge
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-main">
            Display Name
          </label>

          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Enter new display name"
            required
            className="
              w-full px-3 py-2.5
              text-sm
              surface-bg
              border-soft
              rounded-sm
              shadow-xs
              input-focus hover-lift
            "
          />
        </div>

        <button
          type="submit"
          className="
            btn btn-primary
            cursor-pointer
            w-full
          "
        >
          Save Name Changes
        </button>
      </form>

      {/* Password Section */}

      <form onSubmit={handlePasswordUpdate} className="flex flex-col gap-5">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-main">Change Password</h2>

          <p className="text-sm text-muted">
            Update your password to keep your account secure
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="currentPassword"
            className="text-sm font-medium text-main"
          >
            Current Password
          </label>

          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
            }}
            placeholder="Enter current password"
            required
            className="
              w-full px-3 py-2.5
              text-sm
              surface-bg
              border-soft
              rounded-sm
              shadow-xs
              input-focus hover-lift
            "
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="newPassword"
            className="text-sm font-medium text-main"
          >
            New Password
          </label>

          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            placeholder="Enter new password"
            required
            className="
              w-full px-3 py-2.5
              text-sm
              surface-bg
              border-soft
              rounded-sm
              shadow-xs
              input-focus hover-lift
            "
          />
        </div>

        <button
          type="submit"
          className="
            btn btn-primary
            cursor-pointer
            w-full
          "
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default Profile;
