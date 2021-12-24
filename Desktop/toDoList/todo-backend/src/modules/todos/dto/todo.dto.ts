export class CreateTodoDto {
    readonly name: string;
    readonly status: string;
    readonly content: string;
    readonly category: string;
    readonly author: {}
    readonly createdDate: Date;
  }

export class EditTodoDto {
    readonly name: string;
    readonly status: string;
    readonly content: string;
    readonly category: string;
  }