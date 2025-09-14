import "./EditModal.css";

const EditModal = ({
  setIsModalOpen,
  studentToEdit,
  setStudentToEdit,
  setStudents,
  students,
}) => {
  console.log(studentToEdit);

  const updateStudent = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/student/update/${studentToEdit._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: studentToEdit.name,
            email: studentToEdit.email,
          }),
        }
      );
      const data = await res.json();
      console.log(data);

      const updatedStudentList = students.map((student) =>
        student._id === studentToEdit._id ? studentToEdit : student
      );

      setStudents([...updatedStudentList]);

      setIsModalOpen(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateStudent();
  };

  return (
    <div className="overlay">
      <div className="modal">
        <h3>Edit Student</h3>
        <form onSubmit={(e) => handleSubmit(e)} className="modalForm">
          <input
            type="text"
            name="name"
            value={studentToEdit.name}
            onChange={(e) =>
              setStudentToEdit({ ...studentToEdit, name: e.target.value })
            }
          />
          <input
            type="email"
            name="email"
            value={studentToEdit.email}
            onChange={(e) =>
              setStudentToEdit({ ...studentToEdit, email: e.target.value })
            }
          />

          <div className="formBtnContainer">
            <button type="submit">Update</button>
            <button onClick={() => setIsModalOpen(false)} type="button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
