import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          background: "var(--background-color)",
        }}>
          <div style={{
            background: "white",
            padding: "2.5rem",
            borderRadius: "1rem",
            boxShadow: "var(--box-shadow)",
            maxWidth: "500px",
            width: "100%",
            textAlign: "center",
          }}>
            <h2 style={{ color: "var(--secondary-color)", marginBottom: "1rem" }}>
              Something went wrong
            </h2>
            <p style={{ color: "var(--text-color-muted)", marginBottom: "1.5rem" }}>
              We hit an unexpected error. Please refresh the page to try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: "var(--gradient-primary)",
                color: "white",
                border: "none",
                padding: "0.75rem 2rem",
                borderRadius: "var(--radius-full)",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
