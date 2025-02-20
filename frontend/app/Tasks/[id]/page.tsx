'use client'

import { useParams } from 'next/navigation';
import TaskForm from '@/app/components/TaskForm';

export default function Tasks() {
    const params = useParams();    
    const taskId = params.id;

    return (
        <div className="min-h-screen">
            <div className="container mx-auto p-4">
                <h1 className="text-2xl-font-bold mb-4">{taskId && taskId !== 'new' ? 'Edit Task' : 'New Task'}</h1>
                <TaskForm taskId={taskId} />
            </div>
        </div>
    )
}