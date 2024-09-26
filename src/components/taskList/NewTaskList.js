import NewTaskItem from "../taskItem/NewTaskItem";
import './TaskList.scss';
import {DownOutlined, UpOutlined} from "@ant-design/icons";
import {useState} from "react";

const NewTaskList=({ tasks, onEdit , onDelete ,onToggleComplete , onToggleImportant})=>{
    // State to manage visibility of completed tasks
    const [showCompleted, setShowCompleted] = useState(true);

    // Separate completed and incomplete tasks
    const incompleteTasks = tasks.filter(task => !task.isCompleted);
    const completedTasks = tasks.filter(task => task.isCompleted);

    // Toggle visibility of completed tasks
    const onToggleCompletedVisibility = () => {
        setShowCompleted(prev => !prev);
    };

    return(
        <div className="task-list">
            {incompleteTasks.length > 0 && (
                    incompleteTasks.map((task) => (
                        <NewTaskItem
                            key={task.taskId}
                            task={task}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onToggleComplete={onToggleComplete}
                            onToggleImportant={onToggleImportant}
                        />
                    ))
            )}

            {completedTasks.length > 0 && (
                <div>
                    <div className="completed-task" onClick={onToggleCompletedVisibility} style={{ cursor: 'pointer' }}>
                        {showCompleted ? <UpOutlined /> : <DownOutlined />}
                        <span style={{ marginLeft: 8 }}>Completed {completedTasks.length}</span>
                    </div>
                    {showCompleted && completedTasks.map((task) => (
                        <NewTaskItem
                            key={task.taskId}
                            task={task}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onToggleComplete={onToggleComplete}
                            onToggleImportant={onToggleImportant}
                        />
                    ))}
                </div>
            )}

        </div>
    )
}
export default NewTaskList;