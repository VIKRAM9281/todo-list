import React, { useState, useEffect } from "react";

function ListMembers() {
  const [members, setMembers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [deleteDataModal,setDeleteDataModal]=useState(false)
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [newMemberData, setNewMemberData] = useState({
    name: "",
    colour: "",
    age: ""
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch(
        "https://crudcrud.com/api/a665d38534804786b796a7011a832ec4/unicorns"
      );
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error("Error fetching member data:", error);
    }
  };

  const handleDelete = async (memberId) => {
    setMemberToDelete(memberId);
    setDeleteDataModal(true);
  };

  const confirmDelete = async () => {
    try {
      await fetch(
        `https://crudcrud.com/api/a665d38534804786b796a7011a832ec4/unicorns/${memberToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMembers(members.filter((member) => member._id !== memberToDelete));
      setDeleteDataModal(false);
      setMemberToDelete(null); // Reset memberToDelete after successful deletion
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  const handleAddNewMember = async () => {
    try {
      const response = await fetch('https://crudcrud.com/api/a665d38534804786b796a7011a832ec4/unicorns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMemberData),
      });
      if (!response.ok) {
        throw new Error('Failed to add new member');
      }
      const addedMember = await response.json();
      // Update the local state with the added member
      setMembers([...members, addedMember]);
      setOpenModal(false);
      // Reset newMemberData after adding new member
      setNewMemberData({
        name: '',
        colour: '',
        age: '',
      });
    } catch (error) {
      console.error('Error adding new member:', error);
      // Handle error, show error message, etc.
    }
  };
  

  const closeModal = () => {
    setOpenModal(false);
    setMemberToDelete(null); // Reset memberToDelete when modal is closed
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMemberData({ ...newMemberData, [name]: value });
  };

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Colour</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member._id}>
              <td>{member.name}</td>
              <td>{member.colour}</td>
              <td>{member.age}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(member._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={() => setOpenModal(true)}>
        Add New Member
      </button>

      {/* Delete Confirmation Modal */}
      {deleteDataModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  onClick={""}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this member?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={()=>setDeleteDataModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add New Member Modal */}
      {openModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Member</h5>
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  onClick={closeModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={newMemberData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="colour" className="form-label">
                      Colour
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="colour"
                      name="colour"
                      value={newMemberData.colour}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="age" className="form-label">
                      Age
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="age"
                      name="age"
                      value={newMemberData.age}
                      onChange={handleChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddNewMember}
                >
                  Add Member
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal backdrop */}
      {openModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}

export default ListMembers;
