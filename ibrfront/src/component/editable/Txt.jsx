import React from "react";
import EditableText from "./EditableText";

// Shorthand for small bits of editable text:
//   <Txt k="login.email_label" d="Email Address" />
// k = content key, d = default text, label = name shown in the edit panel.
const Txt = ({ k, d, label, as = "span", ...rest }) => (
  <EditableText cmsKey={k} value={d} as={as} label={label || d} {...rest} />
);

export default Txt;
