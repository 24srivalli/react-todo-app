function App() {
  const [taskList, setTaskList] = React.useState([]);
  const [taskText, setTaskText] = React.useState("");
  const [showType, setShowType] = React.useState("all");
  React.useEffect(() => {
    let data = localStorage.getItem("myTasks");
    if (data) {
      setTaskList(JSON.parse(data));
    }
  }, []);
  React.useEffect(() => {
    localStorage.setItem("myTasks", JSON.stringify(taskList));
  }, [taskList]);
  function addNewTask() {
    if (taskText === "") return;
    let newTask = {
      id: Date.now(),
      text: taskText,
      completed: false
    };
    setTaskList([...taskList, newTask]);
    setTaskText("");
  }
  function removeTask(id) {
    let newList = taskList.filter(t => t.id !== id);
    setTaskList(newList);
  }
  function completeTask(id) {
    let newList = taskList.map(t => {
      if (t.id === id) {
        return { ...t, completed: !t.completed };
      }
      return t;
    });
    setTaskList(newList);
  }
  let visibleTasks = taskList.filter(t => {
    if (showType === "active") return t.completed === false;
    if (showType === "completed") return t.completed === true;
    return true;
  });
  return (
    <div className="box">
      <h2>My To-Do App</h2>
      <input
        placeholder="Type your task"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <button onClick={addNewTask}>Add</button>
      <div className="filters">
        <button onClick={() => setShowType("all")}>All</button>
        <button onClick={() => setShowType("active")}>Active</button>
        <button onClick={() => setShowType("completed")}>Completed</button>
      </div>
      {visibleTasks.length === 0 && <p>No Tasks</p>}
      <ul>
        {visibleTasks.map(t => (
          <li key={t.id}>
            <span
              onClick={() => completeTask(t.id)}
              style={{
                textDecoration: t.completed ? "line-through" : "none"
              }}
            >
              {t.text}
            </span>
            <button onClick={() => removeTask(t.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
