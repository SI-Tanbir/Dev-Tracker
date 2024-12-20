import React, { useState, useEffect } from 'react';
import { Timer, Code2, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const DevDashboard = () => {
  const [activeTimer, setActiveTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Learn React Hooks', completed: false, category: 'learning' },
    { id: 2, title: 'Practice TypeScript', completed: false, category: 'coding' },
    { id: 3, title: 'Read Tech Articles', completed: false, category: 'learning' }
  ]);

  // Simulated coding stats
  const codingStats = {
    totalMinutes: 120,
    languages: [
      { name: 'JavaScript', percentage: 45 },
      { name: 'HTML', percentage: 30 },
      { name: 'CSS', percentage: 25 }
    ]
  };

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setActiveTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Developer's Daily Dashboard</h1>
      
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
              <div className="text-4xl font-mono mb-4">{formatTime(activeTimer)}</div>
              <button
                onClick={toggleTimer}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                {isTimerRunning ? 'Pause' : 'Start'}
              </button>
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
            <div className="mb-2">Total Time: {codingStats.totalMinutes} minutes</div>
            <div className="space-y-2">
              {codingStats.languages.map(lang => (
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
              {['all', 'coding', 'learning'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded ${
                    activeTab === tab 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            
            <div className="space-y-2">
              {tasks
                .filter(task => activeTab === 'all' || task.category === activeTab)
                .map(task => (
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
                    <span className={task.completed ? 'line-through text-gray-500' : ''}>
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