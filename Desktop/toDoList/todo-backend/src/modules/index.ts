import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { TodosModule } from './todos/todos.module'

export const modules: any[] = [
  UsersModule,
  AuthModule,
  TodosModule,
];