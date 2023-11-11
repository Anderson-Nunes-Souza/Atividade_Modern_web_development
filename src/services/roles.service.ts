import {Roles} from '@/model/roles'; // Importe seus dados reais ou acesse uma API

class RolesService{

     public async getRoles() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.getRoles); // rolesData deve ser a fonte real dos dados ou o resultado de uma chamada à API
            }, 500); // Adicione um atraso simulado para simular uma chamada assíncrona
        });
    };


}
export const rolesService = new RolesService()
    