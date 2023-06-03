import api from "../services/api";

export async function getCityAndOngName() {
   const response = await api.get('/api/company/list/city');
   const cities = response.data.data.map((city: string) => {
      return {
         type: city,
         key: city
       };
   });

   return cities;
}

