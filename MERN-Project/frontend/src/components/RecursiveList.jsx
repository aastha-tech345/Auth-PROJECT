import React, { useEffect, useState } from "react";
import api from "../utils/api";

export default function RecursiveTable() {
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");

  const fetchData = async () => {
    try {
      const res = await api.get("/person", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      setList(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddPerson = async (e) => {
    e.preventDefault();
    try {
      await api.post(
        "/person",
        { name, parent: parent || null },
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
      );
      setName("");
      setParent("");
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const renderRows = (parentId, level = 0) => {
    return list
      .filter((p) => String(p.parent) === String(parentId))
      .map((item) => (
        <React.Fragment key={item._id}>
          <tr>
            <td style={{ paddingLeft: `${level * 20}px` }}>{item.name}</td>
            <td>{item.parent ? list.find((p) => p._id === item.parent)?.name : "Root"}</td>
          </tr>
          {renderRows(item._id, level + 1)}
        </React.Fragment>
      ));
  };

  return (
    <div>
      <form onSubmit={handleAddPerson} className="bg-white p-3 rounded shadow mb-4">
        <div className="row g-2 align-items-center">
          <div className="col-md-6">
            <input
              type="text"
              placeholder="Enter name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={parent}
              onChange={(e) => setParent(e.target.value)}
            >
              <option value="">No parent (root)</option>
              {list.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100">
              Add
            </button>
          </div>
        </div>
      </form>

      <div className="bg-white p-3 rounded shadow">
        <h6 className="mb-2">Hierarchical Table</h6>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Parent</th>
            </tr>
          </thead>
          <tbody>{renderRows(null)}</tbody>
        </table>
      </div>
    </div>
  );
}
