// pages/new-role.js
import React, { useState } from "react";
import styles from "./styles.module.css";
import { rolesService } from "@/services/roles.service";
import { Roles } from "@/model/roles";
import MyInput from "../../components/input";
import Head from "next/head";
import { authService } from "@/services/auth.service";
import { useParams, useRouter, useSearchParams } from 'next/navigation'


export default function NewRolePage(){
  const router = useRouter();
  const params = useParams()


  const [title, setTitle] = React.useState("Nova Role");

  const [id, setId] = React.useState(0);
  const [name, setName] = React.useState("");
  const [permissions, setPermissions] = React.useState("");
  const [description, setDescription] = React.useState("");


React.useEffect(() => {
    if (params && params.id) {
        if (Number(params.id) > 0) {
            setTitle('Edição de Usuário')
            setId(Number(params.id))
        }
    }
}, [params])


async function save() {
    router.replace('/roles')

    if (!name || name.trim() === '') {
        alert('Nome é obrigatório')
        return
    } if (!permissions || permissions.trim() ===''){
        alert('Permissão é obrigatório')
        return
}else
  await rolesService.create({ name, permissions, description })
  router.back()

  try{
    if (id > 0) { // editar um usuário
        let body = { name, permissions, description } as Roles
        
        if (name && name.trim() !== '' && permissions && permissions.trim()== '') {
            body = { ...body}
        }
        await rolesService.update(id,body)
        router.back()
    }

  }catch(error: any){
    console.log(error)
  }
}


return (
    <div className={styles.loginPage}>
        <Head> <title>Cadastro de Usuário</title> </Head>

        <main className={styles.main}>
            <h2>{title}</h2>

            <div className={styles.inputs}>
                <MyInput
                    label='Nome'
                    value={name}
                    onChange={event => setName(event.target.value)}
                />
                <MyInput
                    label='Permissão'
                    value={permissions}
                    onChange={event => setPermissions(event.target.value)}
                />
                <MyInput
                    label='Descrição'
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                />
            </div>

            <button className={styles.button} onClick={save}>Salvar</button>
        </main>
    </div>
)
}
