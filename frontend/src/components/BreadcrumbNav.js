import React from "react";
import { Link } from "react-router-dom";
import { House } from "react-bootstrap-icons"; 

const BreadcrumbNav = ({ title }) => {
  return (
    <nav style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "1rem" }}>
      <Link to="/" style={{ textDecoration: "none", color: "#374151", display: "flex", alignItems: "center" }}>
        <House size={20} style={{ marginRight: "5px" }} />
      </Link>
      <span style={{ color: "#9CA3AF" }}>›</span>
      <Link to="/blog" style={{ textDecoration: "none", color: "#374151" }}>Blogs</Link>
      <span style={{ color: "#9CA3AF" }}>›</span>
      <span style={{ color: "#374151" }}>{title}</span>
    </nav>
  );
};

export default BreadcrumbNav;
