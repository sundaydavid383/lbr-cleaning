// filepath: ibrfront/src/pages/dashboard/components/Settings.jsx
import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import "./settings.css";

const Settings = () => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    propertyType: "",
    referralSource: "",
  });
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null);
  const [avatarFile, setAvatarFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        propertyType: user.propertyType || "",
        referralSource: user.referralSource || "",
      });
      setAvatarPreview(user.avatar || null);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage({ type: "error", text: "Please select a valid image file" });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: "error", text: "Image must be less than 5MB" });
      return;
    }

    setAvatarFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);
    setMessage({ type: "", text: "" });
  };

  const triggerAvatarUpload = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const result = await updateProfile({
        ...formData,
        avatar: avatarPreview,
      });

      if (result.success) {
        setMessage({ type: "success", text: "Profile updated successfully!" });
        setAvatarFile(null);
      } else {
        setMessage({ type: "error", text: result.message || "Failed to update profile" });
      }
    } catch {
      setMessage({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: "fa-solid fa-user" },
    { id: "security", label: "Security", icon: "fa-solid fa-lock" },
    { id: "preferences", label: "Preferences", icon: "fa-solid fa-sliders" },
    { id: "danger", label: "Danger Zone", icon: "fa-solid fa-triangle-exclamation" },
  ];

  return (
    <div className="settings">
      <div className="settings-layout">
        <div className="settings-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`settings-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <i className={tab.icon} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="settings-content">
          {activeTab === "profile" && (
            <div className="settings-panel">
              <h3 className="dashboard-section-title">Profile Information</h3>

              {message.text && (
                <div className={`settings-message settings-message-${message.type}`}>
                  <i className={`fa-solid ${message.type === "success" ? "fa-check-circle" : "fa-circle-exclamation"}`} />
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="settings-form">
                <div className="settings-profile-picture">
                  <div className="settings-avatar-preview" onClick={triggerAvatarUpload}>
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Profile" />
                    ) : (
                      <div className="settings-avatar-placeholder">
                        <i className="fa-solid fa-camera"></i>
                        <span>Add Photo</span>
                      </div>
                    )}
                    <div className="settings-avatar-overlay">
                      <i className="fa-solid fa-camera"></i>
                    </div>
                  </div>
                  <div className="settings-avatar-info">
                    <p className="settings-avatar-label">Profile Picture</p>
                    <p className="settings-avatar-hint">JPG, PNG or GIF. Max 5MB.</p>
                    <button type="button" className="settings-avatar-btn" onClick={triggerAvatarUpload}>
                      {avatarPreview ? "Change Photo" : "Upload Photo"}
                    </button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="settings-avatar-input"
                  />
                </div>

                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Full Name</label>
                  <input type="text" name="name" className="dashboard-form-input" value={formData.name} onChange={handleChange} />
                </div>
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Email Address</label>
                  <input type="email" name="email" className="dashboard-form-input" value={formData.email} onChange={handleChange} />
                </div>
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Phone Number</label>
                  <input type="tel" name="phone" className="dashboard-form-input" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Address</label>
                  <textarea name="address" className="dashboard-form-input" rows="3" value={formData.address} onChange={handleChange} />
                </div>
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">City</label>
                  <input type="text" name="city" className="dashboard-form-input" value={formData.city} onChange={handleChange} />
                </div>
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Property Type</label>
                  <select name="propertyType" className="dashboard-form-input" value={formData.propertyType} onChange={handleChange}>
                    <option value="">Select property type</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Duplex">Duplex</option>
                    <option value="Bungalow">Bungalow</option>
                    <option value="Terrace">Terrace</option>
                    <option value="Office Space">Office Space</option>
                    <option value="Commercial Property">Commercial Property</option>
                    <option value="Short Let">Short Let</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Referral Source</label>
                  <select name="referralSource" className="dashboard-form-input" value={formData.referralSource} onChange={handleChange}>
                    <option value="">Select an option</option>
                    <option value="Google Search">Google Search</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Friend / Family">Friend / Family</option>
                    <option value="Flyer / Banner">Flyer / Banner</option>
                    <option value="Existing Customer">Existing Customer</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <button type="submit" className="dashboard-btn dashboard-btn-primary" disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </form>
            </div>
          )}

          {activeTab === "security" && (
            <div className="settings-panel">
              <h3 className="dashboard-section-title">Security Settings</h3>
              <div className="settings-form">
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Current Password</label>
                  <input type="password" className="dashboard-form-input" placeholder="Enter current password" />
                </div>
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">New Password</label>
                  <input type="password" className="dashboard-form-input" placeholder="Enter new password" />
                </div>
                <div className="dashboard-form-group">
                  <label className="dashboard-form-label">Confirm New Password</label>
                  <input type="password" className="dashboard-form-input" placeholder="Confirm new password" />
                </div>
                <button className="dashboard-btn dashboard-btn-primary">Update Password</button>
              </div>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className="settings-panel">
              <h3 className="dashboard-section-title">Notification Preferences</h3>
              <div className="settings-preferences">
                <div className="settings-preference-item">
                  <div>
                    <p className="settings-preference-title">Push Notifications</p>
                    <p className="settings-preference-desc">Receive booking reminders and updates</p>
                  </div>
                  <label className="settings-toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="settings-toggle-slider" />
                  </label>
                </div>
                <div className="settings-preference-item">
                  <div>
                    <p className="settings-preference-title">Email Notifications</p>
                    <p className="settings-preference-desc">Receive invoices and updates via email</p>
                  </div>
                  <label className="settings-toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="settings-toggle-slider" />
                  </label>
                </div>
                <div className="settings-preference-item">
                  <div>
                    <p className="settings-preference-title">SMS Notifications</p>
                    <p className="settings-preference-desc">Receive text message reminders</p>
                  </div>
                  <label className="settings-toggle">
                    <input type="checkbox" />
                    <span className="settings-toggle-slider" />
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === "danger" && (
            <div className="settings-panel">
              <h3 className="dashboard-section-title" style={{ color: "#dc2626" }}>Danger Zone</h3>
              <div className="settings-danger">
                <div className="settings-danger-item">
                  <div>
                    <p className="settings-danger-title">Delete Account</p>
                    <p className="settings-danger-desc">Permanently delete your account and all data</p>
                  </div>
                  <button className="dashboard-btn dashboard-btn-danger">Delete Account</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
