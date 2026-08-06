import React, { useState, useEffect } from "react";
import "./cleaningChecklist.css";

const checklistItems = [
  "Clear clutter from floors",
  "Secure pets in a separate area",
  "Remove valuable items",
  "Ensure water and electricity access",
  "Park available for our team",
  "Inform us of any stains",
  "Notify of special instructions",
  "Keep windows accessible",
];

const CleaningChecklist = () => {
  const [checkedItems, setCheckedItems] = useState(
    new Array(checklistItems.length).fill(false)
  );
  const [visibleItems, setVisibleItems] = useState(new Array(checklistItems.length).fill(false));

  useEffect(() => {
    const timers = checklistItems.map((_, i) => {
      return setTimeout(() => {
        setVisibleItems((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, i * 100);
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  const toggleItem = (index) => {
    setCheckedItems((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const allChecked = checkedItems.every((item) => item);

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>LBR Cleaning - Pre-Cleaning Checklist</title>
          <style>
            body { font-family: 'Plus Jakarta Sans', sans-serif; padding: 2rem; color: #0d0d0b; background: #fff; }
            h1 { font-family: 'Outfit', sans-serif; color: #16a34a; margin-bottom: 0.25rem; }
            h2 { font-size: 1rem; color: #78716c; font-weight: 400; margin-bottom: 1.5rem; }
            ul { list-style: none; padding: 0; }
            li { padding: 0.5rem 0; border-bottom: 1px solid #e7e5e4; font-size: 1rem; }
            li.checked { color: #16a34a; }
            li.checked::before { content: "✓ "; font-weight: 700; }
            .note { margin-top: 2rem; padding: 1rem; background: #f5f4f0; border-radius: 8px; font-size: 0.9rem; color: #3f3d38; }
            .footer { margin-top: 2rem; font-size: 0.8rem; color: #a8a29e; }
            @media print { body { padding: 1rem; } }
          </style>
        </head>
        <body>
          <h1>LBR Cleaning — Pre-Cleaning Preparation Checklist</h1>
          <h2>Printed on ${new Date().toLocaleDateString()}</h2>
          <ul>
            ${checklistItems.map((item, i) => `<li class="${checkedItems[i] ? 'checked' : ''}">${item}</li>`).join("")}
          </ul>
          <div class="note">Our team will handle the rest — just ensure access to the key areas.</div>
          <div class="footer">LBR Cleaning Services</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <section className="cleaning-checklist">
      <div className="checklist-container">
        <div className="checklist-header">
          <h2 className="checklist-title">Prepare for Your Cleaning</h2>
          <p className="checklist-subtitle">A few simple steps to ensure the best results</p>
        </div>

        <ul className="checklist-items">
          {checklistItems.map((item, index) => (
            <li
              key={index}
              className={`checklist-item${visibleItems[index] ? " visible" : ""}${checkedItems[index] ? " checked" : ""}`}
              onClick={() => toggleItem(index)}
              role="checkbox"
              aria-checked={checkedItems[index]}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") {
                  e.preventDefault();
                  toggleItem(index);
                }
              }}
            >
              <span className="checklist-checkbox">
                {checkedItems[index] && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </span>
              <span className="checklist-label">{item}</span>
            </li>
          ))}
        </ul>

        <div className="checklist-actions">
          <button className="btn btn-print" onClick={handlePrint}>
            <p>
              <i className="fa-solid fa-print"></i> Print Checklist
            </p>
          </button>
          {allChecked && (
            <span className="checklist-complete">All items completed!</span>
          )}
        </div>

        <div className="checklist-note">
          <i className="fa-solid fa-info-circle"></i>
          <p>Our team will handle the rest — just ensure access to the key areas.</p>
        </div>
      </div>
    </section>
  );
};

export default CleaningChecklist;