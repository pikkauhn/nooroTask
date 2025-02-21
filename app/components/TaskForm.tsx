'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface Task {
    id?: number;
    title: string;
    completed: boolean;
    color: string
}

interface TaskFormProps {
    taskId?: string | string[] | undefined;    
}

export default function TaskForm({ taskId }: TaskFormProps) {
    const [task, setTask] = useState<Task>({ title: '', completed: false, color: '#FFD700' });
    const [isLoading, setIsLoading] = useState<boolean>();
    const router = useRouter();
    const isEditing = taskId && taskId !== 'new';

    const colorOptions = [
        "#FF3B30",
        "#FF9500",
        "#FFCC00",
        "#34C759",
        "#007AFF",
        "#5856D6",
        "#AF52DE",
        "#FF2D55",
        "#A2845E",
    ]

    useEffect(() => {
        if (isEditing && taskId) {
            const fetchTask = async () => {
                try {
                    const response = await fetch(`http://localhost:3001/tasks/${taskId}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setTask(data);
                } catch (error) {
                    console.error('Error fetching task:', error);
                }
            };
            fetchTask();
        }
    }, [taskId, isEditing]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            let url: string;
            let method: string;
            if (isEditing && typeof taskId === 'string') {
                url = `http://localhost:3001/tasks/${taskId}`;
                method = 'PUT';
            } else {
                url = 'http://localhost:3001/tasks';
                method = 'POST';
            }

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            router.push('/');

        } catch (error) {
            console.error(isEditing ? 'Error updating task:' : 'Error creating task:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {isLoading && <div>Loading...</div>}
            <input
                type="text"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                className="border p-2 w-full"
                placeholder="Task Title"
            />
            <div className="flex space-x-2">
                {colorOptions.map((color) => (
                    <button
                        key={color}
                        type="button"
                        className={`w-8 h-8 rounded-full ${task.color === color ? 'ring-2 ring-white' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setTask({ ...task, color })}
                        disabled={isLoading}
                    />
                ))}
            </div>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                {isEditing ? 'Save' : 'Create'}
            </button>
        </form>
    );
}