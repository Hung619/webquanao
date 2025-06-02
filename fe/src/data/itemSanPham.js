import axios from "axios"
import sanPham from "./constraint"

const actions = {

    async fetchDataProduct({ commit }) {
        try {
            const response = await axios.get(`${sanPham}/1`)
            commit('SET_PRODUCTS', response.data)
        } catch (error) {
            console.error("Lỗi khi fetch data", error)
        }
    },
    
}

export default actions
