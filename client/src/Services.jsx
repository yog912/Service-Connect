import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get("/api/services").then(res => {
      if (Array.isArray(res.data)) setServices(res.data);
      else setServices([]);
    }).catch(() => {
      setServices([]);
    });
  }, []);

  return (
    <div>
      <div className="services-hero">
        <div className="services-title">Available Services</div>
        <div className="services-subtitle">
          Browse providers or log in as a provider to create your own listings.
        </div>
      </div>

      {services.length === 0 && (
        <div className="empty-services">
          No services available yet. Providers can log in and add new services.
        </div>
      )}

      <div className="services-grid">
        {services.map(s => (
          <div key={s._id} className="service-card">
            <div className="service-title">{s.title}</div>
            <div className="service-desc">{s.description}</div>
            <div className="service-meta">
              {s.category} • {s.location}
            </div>
            <div className="service-price">${s.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
