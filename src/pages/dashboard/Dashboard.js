import TaskModal from '../../components/taskModal/TaskModal';
import {Layout, Menu, Button, Input, Form, Avatar, Empty, Badge} from 'antd';
import './Dashboard.scss';
import { useState, useEffect } from 'react';
import TaskList from '../../components/taskList/TaskList';
import Notifications from '../../components/notification/Notfications';
import { MailOutlined, SearchOutlined, UserOutlined} from "@ant-design/icons";

const { Content, Sider } = Layout;

const menuItems = [
    { key: 'My Day', label: 'My Day' },
    { key: 'Important', label: 'Important' },
    { key: 'Completed', label: 'Completed' },
    { key: 'Notification', label: 'Notification' },
];


const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [form] = Form.useForm();
    const [editingTask, setEditingTask] = useState(null);
    const [showCompleted, setShowCompleted] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMenu, setSelectedMenu] = useState('My Day'); // Default selected menu
    const [hasNotifications, setHasNotifications] = useState(false);
    const [isNotificationViewed, setIsNotificationViewed] = useState(false); // Track if the user has viewed notifications


    const [user, setUser] = useState({ name: '', email: '' });

    useEffect(() => {
        // Get user data from local storage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser({ name: storedUser.name, email: storedUser.email });
        }
    }, []);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleAddTask = (values) => {
        if (editingTask) {
            const updatedTasks = tasks.map((task) => {
                if (task.id === editingTask.id) {
                    return { ...task, ...values };
                }
                return task;
            });
            setTasks(updatedTasks);
            setEditingTask(null);
        } else {
            setTasks([...tasks, { ...values, id: Date.now(), completed: false,isImportant :false }]);
        }

        form.resetFields();
        setIsModalOpen(false);
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        form.resetFields();
        setEditingTask(null);
        setIsModalOpen(false);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filtering tasks based on the selected menu
    const filteredTasks = tasks.filter(task => {
        if (selectedMenu === 'Completed') {
            return task.completed && task.taskTitle.toLowerCase().includes(searchQuery.toLowerCase());
        } else if (selectedMenu === 'Important') {
            return task.isImportant && task.taskTitle.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return task.taskTitle.toLowerCase().includes(searchQuery.toLowerCase());
    });


    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });

    const incompleteTasks = filteredTasks.filter(task => !task.completed);
    const completedTasks = filteredTasks.filter(task => task.completed);

    const handleMenuClick = (menuKey) => {
        setSelectedMenu(menuKey);

        if (menuKey === 'Notification') {
            setIsNotificationViewed(true); // Clear the notification dot when the user views notifications
        }
    };

    const handleDeleteTask = (taskId) =>
        setTasks(tasks.filter(task => task.id !== taskId)
        );

    const handleToggleComplete = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };

    const handleToggleImportant = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, isImportant: !task.isImportant } : task
        ));
    };

    const handleNotificationsViewed = (hasNewNotifications) => {
        setHasNotifications(hasNewNotifications); // Show dot based on new notifications
        console.log(hasNewNotifications);
        if (!hasNewNotifications) {
            setIsNotificationViewed(true); // User viewed the notification
            console.log(hasNewNotifications);
        }
    };


    useEffect(() => {
        if (window.Notification) {
            if (Notification.permission === 'default') {
                Notification.requestPermission().then(permission => {
                    if (permission !== 'granted') {
                        console.warn('Notification permission denied.');
                    }
                });
            } else if (Notification.permission === 'denied') {
                console.warn('Notification permission has been blocked.');
            }
        }
    }, []);

    console.log('Has notifications:', hasNotifications);
    console.log('Is notification viewed:', isNotificationViewed);

    return (
        <>
            <Layout>

                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={setCollapsed}
                    breakpoint="lg"
                >
                    <div style={{padding: '10px'}}>
                        <div className={`user-info ${collapsed ? 'collapsed' : ''}`}>
                            {collapsed ? (
                                <div className="user-avatar">
                                    <Avatar size="small" icon={<UserOutlined/>}/>
                                    <p className="user-email"><MailOutlined size={14} style={{
                                        color: 'white',
                                        marginTop: '15px',
                                        textAlign:'center'
                                    }}/></p>
                                </div>
                            ) : (
                                <div className="user-details">
                                    <div className="user-avatar-details">
                                        <span className="user-name">{user.name}</span>
                                    </div>
                                    <p className="user-email">{user.email}</p>
                                </div>
                            )}
                        </div>

                        <div className="search-container"
                             style={{gap: "8px", textAlign:'center'}}>
                            {collapsed ? (
                                <SearchOutlined
                                    size={14}
                                    style={{color: 'white',marginBottom:'15px' ,
                                }}/>
                            ) : (
                                <Input
                                    placeholder="Search tasks..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    style={{
                                        marginBottom: '10px',
                                    }}
                                />
                            )}
                        </div>

                        <Menu
                            selectedKeys={[selectedMenu]}
                            mode="inline"
                            onClick={(e) => handleMenuClick(e.key)}
                            items={menuItems}
                        />
                        {/*    <Menu.Item key="My Day">My Day</Menu.Item>*/}
                        {/*    <Menu.Item key="Important">Important</Menu.Item>*/}
                        {/*    <Menu.Item key="Completed">Completed</Menu.Item>*/}
                        {/*    <Menu.Item key="Notification">*/}
                        {/*        Notification*/}
                        {/*        {hasNotifications && !isNotificationViewed && (*/}
                        {/*            <Badge dot offset={[5, 0]} style={{ marginLeft: 10 }} />*/}
                        {/*        )}*/}
                        {/*    </Menu.Item>*/}

                        {/*</Menu>*/}

                    </div>
                </Sider>

                <Layout>
                    <Content style={{padding: 40}} className="dashboard-container">
                        <div className="dashboard-title">
                            <div className="title-date">
                                <h1>{selectedMenu}</h1>
                                <span>{today}</span>
                            </div>
                            <Button onClick={showModal}>
                                Add Task
                            </Button>
                        </div>

                        {selectedMenu === 'Notification' ? (
                            <Notifications tasks={tasks} onNotificationsViewed={handleNotificationsViewed} />
                        ) : (
                            filteredTasks.length > 0 ? (
                                <TaskList
                                    tasks={{ incompleteTasks, completedTasks }}
                                    onEdit={handleEditTask}
                                    onDelete={handleDeleteTask}
                                    onToggleComplete={handleToggleComplete}
                                    onToggleImportant={handleToggleImportant}
                                    showCompleted={showCompleted}
                                    selectedMenu={selectedMenu}
                                    onToggleCompletedVisibility={() => setShowCompleted(!showCompleted)}
                                />
                            ) : (
                                <Empty description="No tasks found" />
                            )
                        )}

                        <TaskModal
                            isModalOpen={isModalOpen}
                            handleCancel={handleCancel}
                            handleAddTask={handleAddTask}
                            editingTask={editingTask}
                            form={form}
                        />
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default Dashboard;
