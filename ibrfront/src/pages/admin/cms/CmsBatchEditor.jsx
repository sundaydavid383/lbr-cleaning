// filepath: ibrfront/src/pages/admin/cms/CmsBatchEditor.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../../../utils/api";
import { useAuth } from "../../../context/AuthContext";
import "./cms.css";
import CustomAlert from "../../../component/customAlert/CustomAlert";
import { CmsSkeleton } from "../../../component/pageSkeleton/PageSkeleton";

const CmsBatchEditor = () => {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alertData, setAlertData] = useState({ message: "", type: "success" });
  const [expandedItem, setExpandedItem] = useState(null);

  const showAlert = (message, type = "success") => {
    setAlertData({ message, type });
    setTimeout(() => setAlertData({ message: "", type: "success" }), 5000);
  };

  const fetchContent = async () => {
    try {
      const res = await fetch(apiUrl('/api/cms/content'), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setItems(data.data || []);
      }
    } catch (error) {
      showAlert("Failed to load content", "danger");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const res = await fetch(apiUrl('/api/cms/content/batch'), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showAlert(`Saved ${items.length} items successfully!`);
      } else {
        showAlert(data.message || "Failed to save", "danger");
      }
    } catch (error) {
      showAlert("Failed to save content", "danger");
    } finally {
      setSaving(false);
    }
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  if (loading) {
    return <CmsSkeleton />;
  }

  return (
    <div className="cms-batch">
      <CustomAlert
        message={alertData.message}
        type={alertData.type}
        onClose={() => setAlertData({ message: "", type: "success" })}
      />

      <div className="cms-header">
        <div>
          <Link to="/admin/cms" className="cms-back-link">
            <i className="fa-solid fa-arrow-left"></i> Back to Content
          </Link>
          <h1>Batch Editor</h1>
          <p>Edit multiple content items at once. Changes are saved when you click "Save All".</p>
        </div>
        <button
          className="btn-primary"
          onClick={handleSaveAll}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save All Changes"}
        </button>
      </div>

      <div className="cms-batch-list">
        {items.map((item, index) => (
          <div key={item.id || item.key} className="cms-batch-item">
            <div
              className="cms-batch-header"
              onClick={() => setExpandedItem(expandedItem === index ? null : index)}
            >
              <div className="cms-batch-header-info">
                <h3>{item.label || item.key}</h3>
                <span className="cms-card-key">{item.key}</span>
              </div>
              <div className="cms-batch-header-meta">
                <span className={`cms-card-type ${item.type}`}>{item.type}</span>
                <i className={`fa-solid fa-chevron-${expandedItem === index ? "up" : "down"}`}></i>
              </div>
            </div>

            {expandedItem === index && (
              <div className="cms-batch-body">
                <div className="cms-form-row">
                  <div className="cms-form-group">
                    <label>Label</label>
                    <input
                      type="text"
                      value={item.label || ""}
                      onChange={(e) => updateItem(index, "label", e.target.value)}
                    />
                  </div>
                  <div className="cms-form-group">
                    <label>Category</label>
                    <input
                      type="text"
                      value={item.category || ""}
                      onChange={(e) => updateItem(index, "category", e.target.value)}
                    />
                  </div>
                </div>

                <div className="cms-form-group">
                  <label>Value (JSON)</label>
                  <textarea
                    value={typeof item.value === "object" ? JSON.stringify(item.value, null, 2) : String(item.value || "")}
                    onChange={(e) => {
                      try {
                        const parsed = JSON.parse(e.target.value);
                        updateItem(index, "value", parsed);
                      } catch {
                        updateItem(index, "value", e.target.value);
                      }
                    }}
                    rows={8}
                  />
                </div>

                <div className="cms-form-group">
                  <label className="cms-checkbox-label">
                    <input
                      type="checkbox"
                      checked={item.isPublic !== false}
                      onChange={(e) => updateItem(index, "isPublic", e.target.checked)}
                    />
                    <span>Public (visible on frontend)</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CmsBatchEditor;
