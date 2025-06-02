import { getAllEmployees } from "auth/getAllEmployee";
import { useEffect, useState } from "react";

const Allemp = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      const data = await getAllEmployees();
      console.log(data);
      setEmployees(data);
      setLoading(false);
    };

    fetchEmployees();
  }, []);

  if (loading) {
    return <div>Loading employees...</div>;
  }

  return (
    <div>
      <h2>Employees</h2>
      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>
            <strong>{emp.name}</strong> - {emp.email} - {emp.jobTitle}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Allemp;
