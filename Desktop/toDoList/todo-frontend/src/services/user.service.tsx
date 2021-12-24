import axios, { AxiosRequestHeaders } from "axios";
import authenticationHeader from "./auth.header";

const api = "http://localhost:3333/api/"
const config = {
    headers: authenticationHeader() as AxiosRequestHeaders | undefined
}

const getUsers = async () => {
    return axios.get(`${api}users`, config);
}

const getAllTodo = async () => {
    // console.log(config);

    return axios.get(`${api}todos`, config);
}

const postTodo = async (userId: string, data: any) => {
    return axios.post(`${api}todos/create/${userId}`, data, config);
}

const editTodo = async (userId: string, todoId: string, data: any) => {
    return axios.patch(`${api}todos/edit/${userId}/${todoId}`, data, config);
}

const deleteTodo = async (userId: string, todoId: string) => {
    return axios.delete(`${api}todos/delete/${userId}/${todoId}`, config);
}

export {
    getUsers,
    getAllTodo,
    postTodo,
    editTodo,
    deleteTodo
}