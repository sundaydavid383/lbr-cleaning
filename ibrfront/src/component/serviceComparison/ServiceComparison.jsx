// filepath: ibrfront/src/component/serviceComparison/ServiceComparison.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./serviceComparison.css";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useCms } from "../../hooks/useCmsContent";
import { useEditMode } from "../../context/EditModeContext";
import EditableText from "../editable/EditableText";
import EditSection from "../editable/EditSection";
import EditZone from "../editable/EditZone";
import { highlight, HIGHLIGHT_HELP } from "../../utils/highlight";

const KEY = "service_comparison.data";

// Rows hold one tick per plan (same order as the plans).
const DEFAULT_DATA = {
  plans: [
    { name: "Basic Cleaning", price: "$19/mo", popular: false },
    { name: "Standard Cleaning", price: "$29/mo", popular: true },
    { name: "Premium Cleaning", price: "$49/mo", popular: false },
  ],
  rows: [
    { feature: "Dusting & vacuuming", checks: [true, true, true] },
    { feature: "Bathroom sanitization", checks: [true, true, true] },
    { feature: "Kitchen wipe-down", checks: [true, true, true] },
    { feature: "Trash removal", checks: [true, true, true] },
    { feature: "Weekly schedule", checks: [true, true, true] },
    { feature: "Carpet cleaning", checks: [false, true, true] },
    { feature: "Window cleaning", checks: [false, true, true] },
    { feature: "Disinfection", checks: [false, false, true] },
    { feature: "Custom schedule", checks: [false, false, true] },
  ],
};

const ServiceComparison = () => {
  const stored = useCms(KEY, DEFAULT_DATA);
  const data = stored && typeof stored === "object" ? stored : DEFAULT_DATA;
  const plans = Array.isArray(data.plans) ? data.plans : [];
  const rows = Array.isArray(data.rows) ? data.rows : [];
  const show = useCms("service_comparison.enabled", true);
  const { isEditMode } = useEditMode();
  const popularText = useCms("service_comparison.popular_text", "Most Popular");

  if (show === false && !isEditMode) return null;

  const tickBoxes = ({ value, onChange }) => {
    const checks = Array.isArray(value) ? value : [];
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        {plans.map((p, i) => (
          <label key={i} style={{ display: "inline-flex", gap: "0.35rem", alignItems: "center", fontSize: "0.88rem" }}>
            <input
              type="checkbox"
              checked={!!checks[i]}
              onChange={(e) => {
                const next = plans.map((_, j) => (j === i ? e.target.checked : !!checks[j]));
                onChange(next);
              }}
            />
            {p.name || `Plan ${i + 1}`}
          </label>
        ))}
      </div>
    );
  };

  return (
    <section className="service-comparison">
      <div className="service-comparison-container">
        <div className="comparison-header">
          <EditableText cmsKey="service_comparison.tag" value="Compare Plans" as="span" className="section-tag" label="Small tag" />
          <EditableText cmsKey="service_comparison.title" value="Find the Perfect *Cleaning Plan*" as="h2" className="section-title" label="Heading" help={HIGHLIGHT_HELP}>
            {(v) => highlight(v)}
          </EditableText>
          <EditableText
            cmsKey="service_comparison.subtitle"
            value="All plans include eco-friendly products and satisfaction guarantee. Upgrade or downgrade anytime."
            as="p"
            className="section-subtitle"
            label="Intro text"
          />
        </div>

        <EditSection
          label="Comparison table"
          icon="fa-table"
          items={[
            {
              cmsKey: KEY,
              root: DEFAULT_DATA,
              path: "plans",
              label: "Plans (columns)",
              help: "Each plan is a column in the table. Turn on 'Most popular' to highlight one.",
              field: {
                type: "items",
                itemLabel: "plan",
                fields: [
                  { key: "name", type: "text", label: "Plan name" },
                  { key: "price", type: "text", label: "Price (e.g. ₦15,000/visit)" },
                  { key: "popular", type: "boolean", label: "Most popular", onText: "Highlighted", offText: "Normal" },
                ],
                newItem: { name: "New plan", price: "", popular: false },
              },
            },
            {
              cmsKey: KEY,
              root: DEFAULT_DATA,
              path: "rows",
              label: "Features (rows)",
              help: "Each row is a feature. Tick the plans that include it.",
              field: {
                type: "items",
                itemLabel: "feature",
                fields: [
                  { key: "feature", type: "text", label: "Feature" },
                  { key: "checks", type: "custom", label: "Included in", render: tickBoxes },
                ],
                newItem: { feature: "New feature", checks: [] },
              },
            },
            {
              cmsKey: "service_comparison.enabled",
              root: true,
              label: show === false ? "Hidden from visitors" : "Shown to visitors",
              field: { type: "boolean", label: "Show this table on the website", onText: "Shown", offText: "Hidden" },
            },
          ]}
        />

        <EditZone
          className="comparison-table-wrap"
          cmsKey={KEY}
          root={DEFAULT_DATA}
          label="Comparison table"
          help="Plans are the columns, features are the rows. Tick which plans include each feature."
          fields={[
            {
              key: "plans",
              type: "items",
              label: "Plans (columns)",
              itemLabel: "plan",
              fields: [
                { key: "name", type: "text", label: "Plan name" },
                { key: "price", type: "text", label: "Price (e.g. ₦15,000/visit)" },
                { key: "popular", type: "boolean", label: "Most popular", onText: "Highlighted", offText: "Normal" },
              ],
              newItem: { name: "New plan", price: "", popular: false },
            },
            {
              key: "rows",
              type: "items",
              label: "Features (rows)",
              itemLabel: "feature",
              fields: [
                { key: "feature", type: "text", label: "Feature" },
                { key: "checks", type: "custom", label: "Included in", render: tickBoxes },
              ],
              newItem: { feature: "New feature", checks: [] },
            },
          ]}
        >
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="feature-col">
                  <EditableText cmsKey="service_comparison.features_label" value="Features" label="First column heading" />
                </th>
                {plans.map((plan, i) => (
                  <th key={i} className={plan.popular ? "popular-col" : ""}>
                    {plan.popular && <span className="popular-badge">{popularText}</span>}
                    <div className="plan-name">{plan.name}</div>
                    <div className="plan-price">{plan.price}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td className="feature-col">{row.feature}</td>
                  {plans.map((_, j) => (
                    <td key={j} className="check-col">
                      {row.checks?.[j] ? (
                        <span className="check-icon"><FaCheck /></span>
                      ) : (
                        <span className="times-icon"><FaTimes /></span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </EditZone>
        {isEditMode && (
          <p style={{ textAlign: "center" }}>
            Badge on the highlighted plan: <EditableText cmsKey="service_comparison.popular_text" value={popularText} label="Most popular badge" />
          </p>
        )}

        <div className="comparison-footer">
          <p>
            <EditableText cmsKey="service_comparison.footer_before" value="Need a custom plan for your office or facility?" label="Footer text" />{" "}
            <Link to="/contact" className="text-link">
              <EditableText cmsKey="service_comparison.footer_link" value="Contact us" label="Link text" />
            </Link>{" "}
            <EditableText cmsKey="service_comparison.footer_after" value="for a personalized quote." label="Text after the link" />
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceComparison;
