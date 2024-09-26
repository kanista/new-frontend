import {Checkbox, Popconfirm, Progress} from "antd";
import {DeleteOutlined, EditOutlined, QuestionCircleOutlined, StarFilled, StarOutlined} from "@ant-design/icons";
import "./TaskItem.scss"

const NewTaskItem=({ task, onEdit, onDelete, onToggleComplete, onToggleImportant  })=>{


    return(
        <>
            <div className="task-item-row">
                {/* Checkbox Column */}
                <div className="task-item-checkbox">
                    <Checkbox
                        checked={task.isCompleted}
                        onChange={() => onToggleComplete(task.taskId, !task.isCompleted)} // Trigger the function to toggle 'completed' status
                    />
                </div>

                {/* Title and Description Column */}
                <div className="task-item-content">
                    <h3
                        style={{
                            textDecoration: task.isCompleted ? 'line-through' : 'none',
                            marginBottom: 2,
                            marginTop: "auto"
                        }}
                    >
                        {task.taskTitle}
                    </h3>
                    <span
                        className="task-description"
                        style={{
                            textDecoration: task.isCompleted ? 'line-through' : 'none',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxHeight: '1.2em',
                            // lineHeight: '1.2em'
                        }}
                    >
                {task.description}
            </span>
                </div>


                {/* Category Column */}
                <div className={`task-item-category ${task.category.toLowerCase()}`}>
            <span>
                {task.category.toLocaleUpperCase()}
            </span>
                </div>

                {/* Due Date Column */}
                <div className="task-item-due-date">
            <span>
                {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
            </span>
                </div>

                {/* Progress Column */}
                <div className="task-item-progress">
                    <Progress
                        type="circle"
                        percent={task.progress} // Ensure your task object has a progress field
                        size={20}
                        // format={percent => percent === 100 ? 'Done' : `${percent}%`}
                        strokeColor={{'0%': '#7F56D9', '100%': '#87d068'}} // Customize color gradient
                    />
                </div>

                {/* Actions Column */}
                <div className="task-item-actions">
                    {task.isImportant ? (
                        <StarFilled
                            style={{marginRight: '10px', cursor: 'pointer', color: '#ee9a08'}}
                            onClick={() => onToggleImportant(task.taskId, !task.isImportant)} // Toggle 'important' status
                        />
                    ) : (
                        <StarOutlined
                            style={{marginRight: '10px', cursor: 'pointer', color: '#ee9a08'}}
                            onClick={() => onToggleImportant(task.taskId, !task.isImportant)} // Toggle 'important' status

                        />
                    )}
                    <EditOutlined
                        style={{marginRight: '10px', cursor: 'pointer', color: '#7F56D9'}}
                        onClick={() => onEdit(task)}
                    />
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        icon={<QuestionCircleOutlined style={{color: 'red'}}/>}
                        onConfirm={() => onDelete(task.taskId)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined style={{cursor: 'pointer', color: 'red'}}/>
                    </Popconfirm>
                </div>
            </div>
        </>
    )
}
export default NewTaskItem;
