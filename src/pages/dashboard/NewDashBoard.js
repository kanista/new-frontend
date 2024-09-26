import {Avatar, Button, Empty, Form, Input, Layout, Menu, message, Spin} from "antd";
import {MailOutlined, SearchOutlined, UserOutlined} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";
import {useEffect, useState} from "react";
import NewTaskList from "../../components/taskList/NewTaskList";
import taskService from "../../services/taskService";
import './Dashboard.scss';
import NewTaskModal from "../../components/taskModal/NewTaskModal";

const menuItems = [
    { key: 'My Day', label: 'My Day' },
    { key: 'Important', label: 'Important' },
    { key: 'Completed', label: 'Completed' }
];
const NewDashBoard=()=>{
    const [collapsed, setCollapsed] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState('My Day');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false); // Loading state

    const handleMenuClick = (menuKey) => {
        setSelectedMenu(menuKey);
        console.log(menuKey);
        fetchTasks(menuKey); // Fetch tasks when menu is clicked
    };

    useEffect(() => {
        fetchTasks(selectedMenu); // Fetch tasks on initial render
        console.log(selectedMenu);
    }, []);

    const fetchTasks = async (menuKey) => {
        setLoading(true); // Set loading to true
        try {
            let response;
            console.log(menuKey);
            switch (menuKey) {
                case 'Important':
                    response = await taskService.getImportantTasks(true);
                    break;
                case 'Completed':
                    response = await taskService.getCompletedTasks(true);
                    break;
                default:
                    response = await taskService.getAllTasks();
                    break;
            }
            if (response.status === 200) {
                setTasks(response.data.data);
            } else {
                message.error(response.data.message || 'Error fetching tasks');
            }
        } catch (error) {
            message.error('An error occurred while fetching tasks.');
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    const handleAddTask = async (taskData) => {
        const newTaskData = {
            ...taskData,
            isCompleted: false,
            isImportant: false,
        };

        try {
            const response = await taskService.createTask(newTaskData);
            if (response.status === 201) {
                message.success(response.data.message);
                form.resetFields();
                fetchTasks();
            } else {
                message.error(response.data.message || 'Error adding task');
            }
        } catch (error) {
            message.error("Error adding task.");
        }
        setIsModalVisible(false);
    };

    const handleEditTask = async (taskData) => {
        try {
            const updatedTaskData = {
                ...selectedTask,
                ...taskData,
                isCompleted: selectedTask.isCompleted,  // Include isCompleted from selectedTask
                isImportant: selectedTask.isImportant,  // Include isImportant from selectedTask
            };

            const response = await taskService.updateTask(updatedTaskData);
            if (response.status === 200) {
                message.success(response.data.message);
                fetchTasks();
                form.resetFields();
            } else {
                message.error(response.data.message || 'Error editing task');
            }
        } catch (error) {
            message.error("Error editing task.");
        }
        setSelectedTask(null);
        setIsModalVisible(false);
    };

    const handleDeleteTask = async (taskId) => {
        try {
            const response = await taskService.deleteTask(taskId);
            if (response.status === 200) {
                message.success(response.data.message);
                fetchTasks();
            } else {
                message.error(response.data.message || 'Error deleting task');
            }
        } catch (error) {
            message.error("Error deleting task.");
        }
    };

    const openAddTaskModal = () => {
        setSelectedTask(null);
        setIsModalVisible(true);
    };

    const handleEditClick = (task) => {
        setSelectedTask(task);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    // Function to handle task completion toggling
    const handleToggleComplete = async (taskId, isCompleted) => {
        try {
            const response = await taskService.updateTaskCompletionStatus(taskId, isCompleted); // Pass taskId and isCompleted directly
            if (response.status === 200) {
                message.success(response.data.message);
                fetchTasks(); // Refetch tasks to reflect changes
            } else {
                message.error(response.data.message || 'Error updating task completion status');
            }
        } catch (error) {
            message.error("Error updating task completion status.");
        }
    };

// Function to handle task importance toggling
    const handleToggleImportant = async (taskId, isImportant) => {
        try {
            const response = await taskService.updateTaskImportanceStatus(taskId, isImportant); // Pass taskId and isImportant directly
            if (response.status === 200) {
                message.success(response.data.message);
                fetchTasks(); // Refetch tasks to reflect changes
            } else {
                message.error(response.data.message || 'Error updating task importance status');
            }
        } catch (error) {
            message.error("Error updating task importance status.");
        }
    };


    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });

    return(
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
                                        <span className="user-name">{localStorage.getItem("userName")}</span>
                                    </div>
                                    <p className="user-email">{localStorage.getItem("userEmail")}</p>
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
                                    // value={searchQuery}
                                    // onChange={handleSearchChange}
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

                    </div>
                </Sider>

                <Layout>
                    <Content style={{padding: 40}} className="dashboard-container">
                        <div className="dashboard-title">
                            <div className="title-date">
                                <h1>{selectedMenu}</h1>
                                <span>{today}</span>
                            </div>
                            <Button onClick={openAddTaskModal}>
                                Add Task
                            </Button>
                        </div>

                        {loading ? (
                            <Spin tip="Loading tasks..." style={{ display: 'block', margin: 'auto' }} />
                        ) : tasks.length === 0 ? (
                            <Empty description="No tasks available" />
                        ) : (
                            <NewTaskList
                                tasks={tasks}
                                onEdit={handleEditClick}
                                onDelete={handleDeleteTask}
                                onToggleComplete={handleToggleComplete}
                                onToggleImportant={handleToggleImportant}/>
                        )}


                        <NewTaskModal
                            visible={isModalVisible}
                            onClose={closeModal}
                            onSubmit={selectedTask ? handleEditTask : handleAddTask}
                            task={selectedTask}
                            form={form}
                        />

                    </Content>
                </Layout>
            </Layout>
        </>
    );
}

export default NewDashBoard;