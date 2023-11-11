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
    const user = authService.getLoggedUser()
    if (!user) router.replace('/login')
} , [])

React.useEffect(() => {
    if (params && params.id) {
        if (Number(params.id) > 0) {
            setTitle('Edição de Usuário')
            setId(Number(params.id))
        }
    }
}, [params])

/* React.useEffect(() => {
    if (id > 0) {
        userService.get(id).then(user => {
            setName(user.name)
            setUsername(user.username)
        }).catch(treat)
    }
}, [id])

function treat(error: any) {
    if (authService.isUnauthorized(error)) {
        router.replace('/login')
    } else {
        alert(`${username}: ${error.message}`)
    }
}

async function save() {
    if (!name || name.trim() === '') {
        alert('Nome é obrigatório')
        return
    }

    if (id === 0 || password.trim() !== '') {
        if (!password || password.trim() === '') {
            alert('Senha é obrigatória')
            return
        }
        if (password !== passConfirm) {
            alert('A Senha não confere')
            return
        }
    }

    try {
        if (id > 0) { // editar um usuário
            let body = {name, description, permissions } as Roles
            
            if (password && password.trim() !== '') {
                body = { ...body, password }
            }
            await userService.update(id, body)
            router.back()

        } else { // Criar um novo
            if (!username || username.trim() === '') {
                alert('Login é obrigatório')
                return
            }if (roles === null || roles.trim() === ''){
                alert('Insira uma Role para o usuário')
                return
            }else{
                await userService.update
            }
    
            await userService.create({ name, username, password, roles })
            router.back()
        }
    } catch (error: any) {
        treat(error)
    }
} */

async function save() {
  await rolesService.create({ name, description, permissions })

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
                    readOnly={id > 0}
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
