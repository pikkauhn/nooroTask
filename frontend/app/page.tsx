'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Task {
  id: number;
  title: string;
  color: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3001/tasks');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();      
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks: ', error);
      }
    };
    fetchTasks();    
  }, []);

  const taskCount = tasks.length;
  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className='w-full'>
      <div className='mb-16'>
        <Link href="/Tasks/new" className="flex justify-center bg-background-buttons hover:bg-hover-buttons text-white pt-2 pb-2 rounded-lg mb-4 space-x-2"
        >
          <label>Create Task</label>
          <Image src="/plus.svg" alt="Plus Icon" width={15} height={10} />
        </Link>
      </div>
      <div className='flex justify-between mb-10'>
        <div className='space-x-1 font-bold'>Tasks {taskCount}</div>
        <div className='space-x-1 text-altColor font-bold'>Completed {completedCount}</div>        
      </div>
      
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="border p-2 mb-2">
            <Link href={`http://localhost:3000/Tasks/${task.id}`}>
              {task.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
