import {useAppSelector} from "@/store/hooks";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function AuthRouter({children}) {
  const token = useAppSelector(state => state.public.user?.userid)
  const navigate = useNavigate()
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [token])
  return children
}
