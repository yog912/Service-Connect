import React, { useEffect, useState } from "react";
import axios from "axios";

const CATEGORIES = [
  { icon: "&#128705;", label: "Cleaning", desc: "Home & apartment cleaning" },
  { icon: "&#128295;", label: "Handyman", desc: "Repairs & installations" },
  { icon: "&#128666;", label: "Moving", desc: "Moving & delivery help" },
  { icon: "&#128187;", label: "IT Support", desc: "Tech & setup help" },
  { icon: "&#128216;", label: "Tutoring", desc: "Study & exam prep" },
  { icon: "&#127807;", label: "Yard Work", desc: "Lawn & snow services" },
];

export default function Services() {
  const [search, setSearch] = useState("");
  const [services, setServices] = useState([]);

  const loadServices = async (query = "") => {
    try {
      const r = await axios.get("/api/services?q=" + query);
      setServices(r.data);
    } catch {
      setServices([]);
    }
  };

  useEffect(() => {
    loadServices("");
  }, []);

  const onSearch = () => {
    loadServices(search);
  };

  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="hero-title">Find trusted local services</div>
        <div className="hero-subtitle">
          Book cleaners, movers, tutors, handymen and more in your area.
        </div>
        <div className="hero-search">
          <input
            placeholder="Search by service, category, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={onSearch}>Search</button>
        </div>
      </section>

      {/* Categories */}
      <section className="featured-section">
        <div className="services-title">Popular categories</div>
        <div className="category-grid">
          {CATEGORIES.map((c) => (
            <div key={c.label} className="category-card">
              <span
                className="category-emoji"
                dangerouslySetInnerHTML={{ __html: c.icon }}
              />
              <div className="category-label">{c.label}</div>
              <div className="category-sub">{c.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section style={{ marginTop: "28px" }}>
        <div className="services-title">Featured Services</div>
        <div className="services-subtitle">Top services from providers</div>

        <div className="services-grid">
          {services.map((s) => (
            <div key={s._id} className="service-card">
              <div className="service-title">{s.title}</div>
              <div className="service-desc">{s.description}</div>
              <div className="service-meta">
                {s.category} • {s.location || "Location not set"}
              </div>
              <div className="service-price">
                {s.price ? `$${s.price}` : "Price on request"}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
