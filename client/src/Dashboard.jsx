import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard({ user }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [services, setServices] = useState([]);

  const loadMy = async () => {
    try {
      const r = await axios.get("/api/services?q=");
      setServices(r.data);
    } catch (e) {
      console.log("Failed to load services", e);
    }
  };

  useEffect(() => {
    loadMy();
  }, []);

  const addService = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/services",
        {
          title,
          category,
          location,
          price,
          description: desc,
        },
        {
          headers: { 
            Authorization: "Bearer " + localStorage.getItem("token") 
          },
        }
      );

      setTitle("");
      setCategory("");
      setLocation("");
      setPrice("");
      setDesc("");
      loadMy();
    } catch (err) {
      console.log(err);
      alert("Failed to create service. Please check your inputs.");
    }
  };

  return (
    <div className="dash-root">
      <div className="dash-header-card">
        <div className="dash-header-title">Provider Dashboard</div>
        <div className="dash-header-sub">
          Welcome back, <b>{user?.name}</b>. Manage and publish your services below.
        </div>
      </div>

      <div className="dash-main">
        <div className="dash-card">
          <div className="dash-card-title">Add New Service</div>
          <div className="dash-card-sub">
            Create a new service listing. It will appear on the homepage once added.
          </div>

          <form className="dash-form" onSubmit={addService}>
            <input className="dash-input" placeholder="Service title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input className="dash-input" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
            <input className="dash-input" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
            <input className="dash-input" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
            <textarea className="dash-textarea" placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
            <button className="dash-btn" type="submit">+ Add Service</button>
          </form>
        </div>

        <div className="dash-card">
          <div className="dash-card-title">Tips for a great listing</div>
          <ul style={{ paddingLeft: "18px", fontSize: "14px", color: "#4b5563", marginTop: "8px" }}>
            <li>Use a clear, descriptive title.</li>
            <li>Add a competitive but fair price.</li>
            <li>Write a detailed description.</li>
            <li>Mention what is included and what is not.</li>
          </ul>
          <div style={{ marginTop: "14px", fontSize: "13px", color: "#6b7280" }}>
            You have <b>{services.length}</b> service{services.length === 1 ? "" : "s"}.
          </div>
        </div>
      </div>

      <h3>Your Services</h3>
      {services.length === 0 && <div>You have not added any services yet.</div>}

      <div className="dash-services-grid">
        {services.map((s) => (
          <div key={s._id} className="dash-service-card">
            <div className="dash-service-title">{s.title}</div>
            <div className="dash-service-desc">{s.description}</div>
            <div className="dash-service-meta">
              {s.category} • {s.location}
            </div>
            <div className="dash-service-price">{s.price ? `$${s.price}` : "Price on request"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
