import { useState } from "react";

import "./App.css";
import StudentForm from "./components/StudentForm.jsx";
import StudentList from "./components/StudentList.jsx";
import EditModal from "./components/EditModal.jsx";

function App() {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);

  console.log(studentToEdit);

  return (
    <>
      <StudentForm students={students} setStudents={setStudents} />
      <StudentList
        students={students}
        setStudents={setStudents}
        setStudentToEdit={setStudentToEdit}
        setIsModalOpen={setIsModalOpen}
      />

      {isModalOpen && (
        <EditModal
          setIsModalOpen={setIsModalOpen}
          studentToEdit={studentToEdit}
          setStudentToEdit={setStudentToEdit}
          students={students}
          setStudents={setStudents}
        />
      )}
    </>
  );
}

export default App;
