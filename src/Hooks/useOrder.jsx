import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useOrder = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: order = [], refetch, } = useQuery({
        queryKey: ['order', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders?email=${user.email}`);
            return res.data;
        }
    })

    return [order, refetch]
};

export default useOrder;