import {makeRequest} from "../makerequest";
import  { useEffect, useState } from 'react'

const useFetch = (endpoint) => {
    const [data,setData] = useState(null);
    

    useEffect(()=>{
        makeApiCall()
    },[endpoint])

    const makeApiCall = async () => {
        const res = await makeRequest(endpoint)
        setData(res)
        // console.log(res);
    }
  return data
}

export default useFetch

// const useFetch = (endpoint) => {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const makeApiCall = async () => {
//             setLoading(true);
//             setError(null);
//             const res = await makeRequest(endpoint);
//             if (res) {
//                 setData(res);
//             } else {
//                 setError('An error occurred while fetching data.');
//             }
//             setLoading(false);
//         };

//         makeApiCall();
//     }, [endpoint]);

//     return { data, loading, error };
// };

// export default useFetch;
