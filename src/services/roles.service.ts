import {Roles} from '@/model/roles'; // Importe seus dados reais ou acesse uma API
import { authService } from './auth.service';

class RolesService{

    private readonly url = 'http://localhost:3030/roles'

    private getHeaders() {
        const logged = authService.getLoggedUser()
        if (!logged) throw new Error('Unauthorized')

        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${logged.token}`,
        }
    }

    private async validate(response: Response) {
        const data = await response.json()

        if (response.status === 401) {
            throw new Error(response.statusText)
        } else if (response.status > 299) {
            throw new Error(data.message)
        }
        return data
    }

    public async create(Roles: Roles) {
        const response = await fetch(this.url, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(Roles)
        })

        const data = await this.validate(response)
        return data as Roles
    }

    public async getList() {
        const response = await fetch(this.url, {
            method: 'GET',
            headers: this.getHeaders()
        })

        const data = await this.validate(response)
        return data as Roles[]
    }

    public async get(id: number) {
        const response = await fetch(`${this.url}/${id}`, {
            method: 'GET',
            headers: this.getHeaders(),
        })

        const data = await this.validate(response)
        return data as Roles
    }

    public async update(id: number, Roles: Roles) {
        const response = await fetch(`${this.url}/${id}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(Roles)
        })

        const data = await this.validate(response)
        return data as Roles
    }

    public async remove(id: number) {
        const response = await fetch(`${this.url}/${id}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        })

        const data = await this.validate(response)
        return data as boolean
    }
}
export const rolesService = new RolesService()
    