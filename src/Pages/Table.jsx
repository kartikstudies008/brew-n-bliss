import React, { useState } from "react";

const BookTableForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    guests: "",
    specialRequest: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Table booked successfully!");
      setFormData({ name: "", email: "", date: "", time: "", guests: "", specialRequest: "" });
    } else {
      alert(data.message || "Failed to book table");
    }
  } catch (err) {
    console.error("Booking error:", err);
    alert("Something went wrong!");
  }
};


  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Book a Table</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            required
            onChange={handleChange}
            value={formData.name}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            required
            onChange={handleChange}
            value={formData.email}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium">Date</label>
            <input
              type="date"
              name="date"
              required
              onChange={handleChange}
              value={formData.date}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium">Time</label>
            <input
              type="time"
              name="time"
              required
              onChange={handleChange}
              value={formData.time}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Number of Guests</label>
          <input
            type="number"
            name="guests"
            min="1"
            max="20"
            required
            onChange={handleChange}
            value={formData.guests}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Special Requests</label>
          <textarea
            name="specialRequest"
            rows="3"
            onChange={handleChange}
            value={formData.specialRequest}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookTableForm;
