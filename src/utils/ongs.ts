import api from "../services/api";

export async function getOngs() {
   const response = await api.get('/api/company/list/name');
   const ongs = response.data.data.map((ong: string) => {
      return {
         type: ong,
         key: ong
       };
   });

   return ongs;
}

