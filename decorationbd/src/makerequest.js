import axios from "axios";


// export const makeRequest = async (url) => {
//     try {
//         const {data} = await axios.get(process.env.REACT_APP_API_URL + url )
//         return data;
//     } catch (error) {
//         console.log(error)
//         return error;
//     }
// }

export const makeRequest = async (url) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}${url}`);
        return data;
    } catch (error) {
        console.error(error);
        return error; // Return null or some error data
    }
};