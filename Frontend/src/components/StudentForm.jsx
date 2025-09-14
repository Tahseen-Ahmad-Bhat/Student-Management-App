import React, { useState } from "react";

import "./StudentForm.css";

const StudentForm = ({ students, setStudents }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    // console.log(e.target.id);
    e.target.id === "name" ? setName(e.target.value) : setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // console.log(name, email);
      const res = await fetch("http://localhost:8080/student/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      // console.log(data);

      setStudents([...students, data]);
      setName("");
      setEmail("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div id="studentFormContainer">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          value={name}
          onChange={(e) => handleChange(e)}
          type="text"
          name="name"
          id="name"
          placeholder="Enter your name"
          required
        />
        <input
          value={email}
          onChange={(e) => handleChange(e)}
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          required
        />
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
