import { useState, useEffect } from 'react';
import { Layout, List, Form, Row, Col, Button, Modal, Select, Input, Spin, message } from 'antd'
import { PlusCircleFilled } from '@ant-design/icons';
import "./index.scss";
import Bar from "../../conponents/bar"
import Blog from "../../conponents/blog"
import { ITodoSchema, ICreateTodo } from '../../interface/todo'
import { IUser } from '../../interface/user'
import { getAllTodo, postTodo, getUsers } from "../../services/user.service";
import moment from 'moment';
import Authentication from "../../stores/auth.store";
import { useContext } from 'react';
import { observer } from "mobx-react";

const Home = () => {
  const [todos, setTodos] = useState<ITodoSchema[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const { Content } = Layout;
  const [isInsert, setIsInsert] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [formTodo] = Form.useForm();
  const auth = useContext(Authentication);
  const { userId } = auth;

  const showInsertModal = () => {
    setIsInsert(true);
  };

  const handleCancelInsert = () => {
    setIsInsert(false);
  };

  const addTodoFinish = (values: ICreateTodo) => {
    const createTodo = async () => {
      try {
        values.createdDate = moment().format("YYYY-MM-DD")
        const res = await postTodo(userId, values);
        message.error('Add Todo success');
        setIsInsert(false);
        window.location.reload();
        console.log(res);

      } catch (error) {
        message.error('Add Todo fail');
        setIsInsert(true);
        console.log(error);
      }
    };
    createTodo()
  };

  const allTodo = async () => {
    try {
      const res = await getAllTodo();
      setTodos(res.data);
      if (res) {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    allTodo();
  }, []);

  const allUser = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    allUser();
  }, []);


  return (
    <>
      <Bar />
      <div className='home'>
        <Spin spinning={loading} tip="Loading...">
          <Content className='home-content container'>
            <Row className='box-row'>
              <Col span={12} className='home-title'>Activity</Col>
              <Col span={12} className='div-btn-insert'>
                <Button type="primary" onClick={showInsertModal}>
                  <PlusCircleFilled />Todo
                </Button>
                <Modal title="Add Todo" visible={isInsert} onCancel={handleCancelInsert} footer={false}>
                  <Form
                    form={formTodo}
                    name="createTodo"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    onFinish={addTodoFinish}>
                    <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Name is required!' }]}>
                      <Input />
                    </Form.Item>
                    <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Status is required!' }]}>
                      <Select>
                        <Select.Option value="Todo">Todo</Select.Option>
                        <Select.Option value="Working">Working</Select.Option>
                        <Select.Option value="Done">Done</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item name="content" label="Contents" rules={[{ required: true, message: 'Contents is required!' }]}>
                      <Input.TextArea />
                    </Form.Item>
                    <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Category is required!' }]}>
                      <Select>
                        <Select.Option value="Biology">Biology</Select.Option>
                        <Select.Option value="Finance">Finance</Select.Option>
                        <Select.Option value="Chemistry">Chemistry</Select.Option>
                        <Select.Option value="Engineering">Engineering</Select.Option>
                        <Select.Option value="Health">Health</Select.Option>
                        <Select.Option value="Society">Society</Select.Option>
                        <Select.Option value="Space">Space</Select.Option>
                        <Select.Option value="Art">Art</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item name="author" label="Author" rules={[{ required: true, message: 'Author is required!' }]}>
                      <Select placeholder="Select a author">
                        {users.map((a, key) => (
                          <Select.Option value={a._id} key={key}>
                            {a.username}
                          </Select.Option>))}
                      </Select>
                    </Form.Item>
                    <Form.Item >
                      <Row >
                        <Col span={12}><Button onClick={handleCancelInsert}>
                          Cancle
                        </Button></Col>
                        <Col span={12}><Button type="primary" htmlType="submit">
                          Submit
                        </Button></Col>
                      </Row>
                    </Form.Item>
                  </Form>
                </Modal>
              </Col>
            </Row>
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 2,
                lg: 2,
                xl: 3,
              }}
              dataSource={todos}
              renderItem={item => (
                <List.Item>
                  <Blog props={item} />
                </List.Item>
              )}
            />
          </Content>
        </Spin>
      </div>
    </>
  );
}

export default observer(Home);