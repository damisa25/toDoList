export interface ITodoSchema {
    _id: string;
    name: string;
    status: string;
    content: string;
    category: string;
    author: string;
    createdDate: Date | string;
}

export interface ICreateTodo {
    name: string;
    status: string;
    content: string;
    category: string;
    author: string;
    createdDate: Date | string;
}

export interface IEditTodo {
    name: string;
    status: string;
    content: string;
    category: string;
}