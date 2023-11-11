// pages/new-role.js
import React, { useState } from "react";
import styles from './styles.module.css'

const NewRolePage = () => {
  const [roleData, setRoleData] = useState({
    name: "",
    permissions: [],
    description: "",
  });
  
  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setRoleData({ ...roleData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/roles/'+ roleData, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(roleData),
      });
  
      if (response.ok) {

      } else {
        // Lida com erros, por exemplo, exibindo uma mensagem de erro.
      }
    } catch (error) {
      console.error("Erro ao cadastrar a Role:", error);
    }
  };
  

  return (
    <div>
      <h1>Cadastro de Nova Role</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome da Role:</label>
          <input
            type="text"
            name="name"
            value={roleData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Permissões:</label>
          <input
            type="text"
            name="permissions"
            value={roleData.permissions}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea
            name="description"
            value={roleData.description}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Cadastrar Role</button>
      </form>
    </div>
  );
};

export default NewRolePage;
