import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { auth , setAuth } = useAuth();

    const refresh = async () => {
        
        const token = auth.token;
        const authHeader = "Bearer " + token ;
        const config = {
            headers:{
              Authorization: authHeader
            }
          };
        console.log(authHeader)
        const response = await axios.get('/refresh', config);
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.authorisation["token"]);
            return { ...prev, token: response.data.authorisation["token"] }
        });
        return response.data.token;
    }
    return refresh;
};

export default useRefreshToken;