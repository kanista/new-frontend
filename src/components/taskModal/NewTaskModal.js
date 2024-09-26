import {useEffect, useState} from "react";
import './TaskModal.scss'
import moment from "moment/moment";
import {Button, DatePicker, Form, Input, Modal, Select, Slider} from "antd";

const {Option} = Select;

const NewTaskModal=({ visible, onClose, onSubmit, task ,form })=>{

    const [percent, setPercent] = useState(0);

    const TASK_CATEGORIES = [
        { label: 'WORK', value: 'work' },
        { label: 'PERSONAL', value: 'personal' },
        { label: 'OTHERS', value: 'others' }
    ];

    const disablePastDates = (current) => {
        return current && current < moment().startOf('day');
    };

    const handleSliderChange = (value) => {
        setPercent(value);
    };

    // Initialize form with task data for editing
    useEffect(() => {
        if (task) {
            form.setFieldsValue({
                taskTitle: task.taskTitle,
                description: task.taskDescription,
                category: task.category,
                dueDate: task.dueDate ? moment(task.dueDate) : null,
                progress: task.progress,
                isCompleted: task.isCompleted,
                isImportant: task.isImportant,
            });
        } else {
            form.resetFields();
        }
    }, [task, form]);

    const handleSubmit = () => {
        form.validateFields().then(values => {
            onSubmit(values);  // Pass values to parent component (Dashboard)
            form.resetFields(); // Reset the form on success
        });
    };

    return(
        <>
            <Modal
                open={visible}
                title={task ? "Edit Task" : "Add Task"}
                onCancel={onClose}
                footer={null}
            >
                <Form
                    form={form}
                    className="task-form"
                    layout="vertical"
                >
                    <Form.Item
                        label="Task Title"
                        name="taskTitle"
                        rules={[{ required: true, message: 'Please enter your task title!' }]}
                    >
                        <Input placeholder="Enter your task title" />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please enter task description!' }]}
                    >
                        <Input placeholder="Enter task description" />
                    </Form.Item>

                    <Form.Item
                        label="Category"
                        name="category"
                        rules={[{ required: true, message: 'Please select a category!' }]}
                    >
                        <Select placeholder="Select task category">
                            {TASK_CATEGORIES.map(category => (
                                <Option key={category.value} value={category.value}>
                                    {category.label}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Progress"
                        name="progress"
                    >
                        <Slider
                            min={0}
                            max={100}
                            value={percent}
                            onChange={handleSliderChange}
                            style={{ width: '100%'}}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Due Date"
                        name="dueDate"
                        rules={[{ required: true, message: 'Please select a due date!' }]}
                    >
                        <DatePicker placeholder="Select due date" style={{ width: '100%' }} disabledDate={disablePastDates}/>
                    </Form.Item>

                    <Form.Item>
                        <Button htmlType="submit" onClick={handleSubmit}>
                            {task ? 'Update Task' : 'Add Task'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
export default NewTaskModal;