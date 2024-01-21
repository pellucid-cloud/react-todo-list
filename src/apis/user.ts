import http from "@/utils/http";

export type LoginProps = {
  username: string,
  password: string,
  token?: string
}
export const login = (props: LoginProps) => http.post('/user/login', props)
export const logout = () => http.post('/user/logout')
