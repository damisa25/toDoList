import { useState, useEffect } from 'react';
import { Card, Avatar, Row, Col, Button, Modal, Badge, Select, Input, Form, Popconfirm, message } from 'antd'
import { EditFilled, DeleteFilled, UserOutlined } from '@ant-design/icons';
import "./index.scss";
import { ITodoSchema, IEditTodo } from '../../interface/todo'
import { IUser } from '../../interface/user'
import moment from 'moment';
import Authentication from "../../stores/auth.store";
import { useContext } from 'react';
import { observer } from "mobx-react";
import { getUsers, editTodo, deleteTodo } from "../../services/user.service";


const Blog = (props: any) => {
    const { Meta } = Card;
    const { ...prop } = props.props as ITodoSchema
    const [users, setUsers] = useState<IUser[]>([]);
    const [isEdit, setIsEdit] = useState(false);
    const [formEdit] = Form.useForm();
    const dateFormat = "YYYY-MM-DD";
    const auth = useContext(Authentication);
    const { userId } = auth;

    const showEditModal = () => {
        setFormEdit(prop)
        setIsEdit(true);
    };

    const handleCancelEdit = () => {
        setIsEdit(false);
    };

    const setFormEdit = (d: IEditTodo) => {
        formEdit.setFieldsValue({
            name: d.name,
            status: d.status,
            content: d.content,
            category: d.category,
        });
    };
    const editTodoFinish = (values: IEditTodo) => {
        const editTodoUser = async () => {
            try {
                const res = await editTodo(userId, prop._id, values);
                message.success('Edit success');
                setIsEdit(false);
                window.location.reload();
                console.log(res);

            } catch (error) {
                message.error('Edit fail');
                setIsEdit(true);
                console.log(error);
            }
        };
        editTodoUser()
    };

    const confirmDelete = (e: any) => {
        const deleteTodoUser = async () => {
            try {
                const res = await deleteTodo(userId, prop._id);
                message.success('Delete success');
                window.location.reload();
                console.log(res);
            } catch (error) {
                message.error('Delete fail');
                console.log(error);
            }
        };
        deleteTodoUser()

    }

    const allUser = async () => {
        try {
            const res = await getUsers()
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
            <Card className='blog'>
                <Row className='box-row1'>
                    <Col xs={{ span: 10 }} lg={{ span: 12 }} className='blog-category'>{prop.category}</Col>
                    <Col xs={{ span: 14 }} lg={{ span: 12 }} className='div-col2'>
                        <Row align='middle'>
                            <Col xs={{ span: 9 }} lg={{ span: 12 }}>
                                <Popconfirm
                                    title="Are you sure to delete this activity?"
                                    onConfirm={confirmDelete}
                                    //onCancel={cancel}
                                    okText="Yes"
                                    cancelText="No">
                                    {(userId === prop.author) ? <Button type="primary" className="btn-edit-delete delete" ><DeleteFilled /></Button> : null}
                                </Popconfirm>
                            </Col>
                            <Col xs={{ span: 10 }} lg={{ span: 8 }}>
                                {(userId === prop.author) ? <Button type="primary" onClick={showEditModal} className="btn-edit-delete edit"><EditFilled /></Button> : null}
                                <Modal title="Edit Todo" visible={isEdit} onCancel={handleCancelEdit} footer={false}>
                                    <Form
                                        form={formEdit}
                                        name="editTodo"
                                        labelCol={{ span: 4 }}
                                        wrapperCol={{ span: 14 }}
                                        layout="horizontal"
                                        onFinish={editTodoFinish}>
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
                                        <Form.Item>
                                            <Row >
                                                <Col span={12}><Button onClick={handleCancelEdit}>
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
                            <Col xs={{ span: 5 }} lg={{ span: 4 }}><Badge status={(prop.status === 'Todo') ? "warning" : (prop.status === 'Working') ? "processing" : "success"} /></Col>
                        </Row>
                    </Col>
                </Row>
                <div className='blog-name'>{prop.name}</div>
                <Meta
                    avatar={<Avatar style={{ backgroundColor: '#fc7864' }} icon={<UserOutlined />} />}
                    title={users.map((a, key) => (a._id === prop.author ? a.username : null))}
                    description={moment(prop.createdDate).format(dateFormat)}
                />
            </Card>

        </>
    );
}

export default observer(Blog);