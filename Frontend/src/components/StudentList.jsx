import React, { useEffect } from "react";
import { useState } from "react";
import "./StudentList.css";

const StudentList = ({
  students,
  setStudents,
  setStudentToEdit,
  setIsModalOpen,
}) => {
  const [notification, setNotification] = useState("");

  const fetchStudents = async () => {
    try {
      const res = await fetch("http://localhost:8080/student/get");
      const data = await res.json();
      console.log(data);
      setStudents([...data]);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUpdate = async (student) => {
    setIsModalOpen(true);
    setStudentToEdit(student);
  };

  const handleDelete = async (student) => {
    try {
      // console.log(student._id);
      const res = await fetch(
        `http://localhost:8080/student/delete/${student._id}`,
        {
          method: "delete",
        }
      );

      const data = await res.json();
      const updatedStudents = students.filter((std) => std._id != student._id);

      setStudents([...updatedStudents]);

      setNotification(data.message);

      setTimeout(() => {
        setNotification("");
      }, 2000);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <ul className="listContainer">
      {notification && (
        <p style={{ color: "red", fontSize: "larger" }}>{notification}</p>
      )}
      {students.length === 0 ? (
        <p>Student list is empty</p>
      ) : (
        students.map((student, index) => {
          return (
            <li key={index}>
              <span>{student.name}</span>
              <span>{student.email}</span>

              <button onClick={() => handleUpdate(student)}>Edit</button>
              <button onClick={() => handleDelete(student)}>Delete</button>
            </li>
          );
        })
      )}
    </ul>
  );
};

export default StudentList;
