import React, { useState, useEffect } from "react";
import { Timer, Code2, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const DevDashboard = () => {
  //starting of code
  const [time, setTime] = useState(60); // Timer duration in seconds
  const [rawInput, setRawInput] = useState("25"); // Raw input as a string

  const [activeTimer, setActiveTimer] = useState(25 * 60); // 25 minutes in seconds
  const [timerInput, setTimerInput] = useState(25); // User input for minutes

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Learn React Hooks",
      completed: false,
      category: "learning",
    },
    {
      id: 2,
      title: "Practice TypeScript",
      completed: false,
      category: "coding",
    },
    {
      id: 3,
      title: "Read Tech Articles",
      completed: false,
      category: "learning",
    },
  ]);

  // Simulated coding stats
  const codingStats = {
    totalMinutes: 120,
    languages: [
      { name: "JavaScript", percentage: 80 },
      { name: "HTML", percentage: 90 },
      { name: "CSS", percentage: 80 },
    ],
  };

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setActiveTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval); // Stop timer at 0
            setIsTimerRunning(false); // Automatically pause
            return 0; // Ensure it doesn't go below 0
          }
          return prev - 1; // Decrement by 1 second
        });
      }, 1000);
    }
    return () => clearInterval(interval); // Cleanup on unmount or pause
  }, [isTimerRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const toggleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  //reset  timer function
  const resetTimer = () => {
    setActiveTimer(25 * 60); // Reset to 25 minutes
    setIsTimerRunning(false); // Stop the timer
  };

  const incrementTimer = () => {
    setTimerInput((prev) => Math.min(prev + 1, 120)); // Cap at 120 minutes
  };

  const decrementTimer = () => {
    setTimerInput((prev) => Math.max(prev - 1, 1)); // Minimum of 1 minute
  };

  const applyTimer = () => {
    setActiveTimer(timerInput * 60); // Set activeTimer to the selected duration
  };

  //input function manually
  const handleInputChange = (e) => {
    const value = e.target.value;

    // Allow only numbers or an empty string
    if (/^\d*$/.test(value)) {
      setRawInput(value); // Update raw input
      if (value === "") {
        setTimerInput(0); // Temporarily set timer to 0 if input is empty
      } else {
        const number = Math.max(1, Math.min(parseInt(value, 10), 120)); // Clamp between 1 and 120
        setTimerInput(number);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-6 underline">
        DevTracker
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pomodoro Timer Card */}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timer className="w-5 h-5" />
              Pomodoro Timer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              {/* Time Display */}
              <div className="text-4xl font-mono mb-4">
                {formatTime(activeTimer)}
              </div>

              {/* Timer Input and Controls */}
              {!isTimerRunning && (
                <div className="flex justify-center items-center gap-2 mb-4">
                  {/* Decrement Button */}
                  <button
                    onClick={decrementTimer}
                    className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    -
                  </button>

                  {/* Manual Input Field */}
                  {/* <input
            type="number"
            value={timerInput}
            onChange={handleInputChange}
            className="w-16 text-center border border-gray-300 rounded px-2 py-1"
            min="0"
            max="120" // Optional cap at 120 minutes
          /> */}

                  <input
                    type="text"
                    value={rawInput}
                    onChange={handleInputChange}
                    className="w-16 text-center border border-gray-300 rounded px-2 py-1"
                    placeholder="Enter minutes"
                  />

                  {/* Increment Button */}
                  <button
                    onClick={incrementTimer}
                    className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    +
                  </button>

                  {/* Set Timer Button */}
                  <button
                    onClick={applyTimer}
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Set Timer
                  </button>
                </div>
              )}

              {/* Timer Controls */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  {isTimerRunning ? "Pause" : "Start"}
                </button>
                <button
                  onClick={() => {
                    setIsTimerRunning(false);
                    setActiveTimer(timerInput * 60); // Reset to selected duration
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Coding Stats Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="w-5 h-5" />
              Today's Coding Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-2">
              Total Time: {codingStats.totalMinutes} minutes
            </div>
            <div className="space-y-2">
              {codingStats.languages.map((lang) => (
                <div key={lang.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{lang.name}</span>
                    <span>{lang.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded">
                    <div
                      className="bg-blue-500 rounded h-2 transition-all duration-300"
                      style={{ width: `${lang.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tasks Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              Daily Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Simple Tabs */}
            <div className="flex gap-2 mb-4">
              {["all", "coding", "learning"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded ${
                    activeTab === tab
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              {tasks
                .filter(
                  (task) => activeTab === "all" || task.category === activeTab
                )
                .map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="w-4 h-4"
                    />
                    <span
                      className={
                        task.completed ? "line-through text-gray-500" : ""
                      }
                    >
                      {task.title}
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DevDashboard;
