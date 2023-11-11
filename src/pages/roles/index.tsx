// pages/roles.js
import React from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import { Roles } from "@/model/roles";
//import { RolesService } from "@/services/roles.service";

type Props = {
  roles: Roles[],
  edit?: (id: number) => void,
  remove?: (id: number) => void
}


export default function RolesPage({roles, edit, remove}: Props) {
  const router = useRouter();

function goToNewRoles() {
  router.push(`/new_roles/`);
}

  return (
    <div>
      <h1>Lista de Roles dos Usuários</h1>
      <div>
        {roles?.map((role) => (
          <div key={role.id}>{role.name}{role.permissions}{role.description}</div>
        ))}
      </div>
      <div>
        <button onClick={goToNewRoles}>Roles de Usuários</button>
      </div>
      <div>
      </div>
    </div>
  );
}
