import React from 'react'
import Head from 'next/head'

import styles from './styles.module.css'
import { useRouter } from 'next/navigation'
import { authService } from '@/services/auth.service'
import ListaRoles from '@/components/roles-list'
import { Roles } from '@/model/roles'
import { rolesService } from '@/services/roles.service'


export default function HomePage() {

    const router = useRouter()

    const [ roles, setUsers ] = React.useState<Roles[]>([])

    React.useEffect(fetchUsers, [])

    function treat(error: any) {
        if (authService.isUnauthorized(error)) {
            router.replace('login')
        } else {
            alert(error.message)
        }
    }

    function fetchUsers() {
        rolesService.getList()
            .then(list => setUsers(list))
            .catch(treat)
    }

    function edit(id: number) {
        router.push(`/new_roles/${id}`)
    }

    function remove(id: number) {
        rolesService.remove(id)
            .then(removed => fetchUsers())
            .catch(treat)
    }


    return (
        <>
            <Head>
                <title>Role Page</title>
            </Head>
            <main>
                <div className={styles.homeHeader}>
                    <div>
                        <button onClick={() => router.replace('login')} >Sair</button>
                    </div>

                    <h3>Listagem de roles</h3>
                    <div>
                        <button onClick={()=> router.replace('new_roles/0')}> Cadastrar nova role</button>
                    </div>
                </div>

                <div className={styles.homeMain}>
                    <ListaRoles roles={roles} edit={edit} remove={remove}/>
                </div>

            </main>
        </>
    )
}
