import axios from "axios";

const api = axios.create({
    baseURL: "https://viacep.com.br/ws/" //URL base, que nunca muda
});

export default api;