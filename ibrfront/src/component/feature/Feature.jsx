import React from 'react';
import "./feature.css";
import EditableList from "../editable/EditableList";

const FEATURE_FIELDS = [
  { key: "icon", type: "icon", label: "Icon" },
  { key: "title", type: "text", label: "Title" },
  { key: "description", type: "textarea", label: "Description" },
];

const Feature = ({ features = [], cmsKey }) => {
  const renderItem = (feature, index) => (
    <div className="feature" key={index}>
      <div className="icon">
        <i className={feature.icon}></i>
      </div>
      <div>
        <h2>{feature.title}</h2>
        <p>{feature.description}</p>
      </div>
      <div className="feature_loader"></div>
    </div>
  );

  return (
    <div className='features container'>
      {cmsKey ? (
        <EditableList cmsKey={cmsKey} value={features} fields={FEATURE_FIELDS} itemLabel="feature box" wrapperClassName="feature-edit-wrap">
          {renderItem}
        </EditableList>
      ) : (
        features.map(renderItem)
      )}
    </div>
  );
};

export default Feature;
