// pages/roles.js
import React from "react";

const rolesData = [
  { id: 1, name: "Role 1" },
  { id: 2, name: "Role 2" },
  { id: 3, name: "Role 3" },
  {id: 4, name: 'Role 4' }
];

const RolesPage = () => {
  return (
    <div>
      <h1>Lista de Roles dos Usuários</h1>
      <ul>
        {rolesData.map((role) => (
          <li key={role.id}>{role.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RolesPage;
