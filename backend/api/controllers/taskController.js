import prisma from "../../lib/prisma.js";

export const createTask = async (req, res) => {
    try {
        const { userId, title, description } = req.body;

        const user = await prisma.user.findFirst({
            where: { userId },
        });
        if (!user) {
            return res.status(404).json({ message: "User does not exist." });
        }

        const newTask = await prisma.task.create({
            data: {
                userId,
                title,
                description,
            },
        });

        return res.status(201).json({ message: "Task created successfully", data: newTask });
    } catch (error) {
        console.error("Error during task creation:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const getTaskById = async (req, res) => {
    try {
        const { taskId } = req.params;

        const task = await prisma.task.findFirst({
            where: { taskId },
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(200).json({ data: task });
    } catch (error) {
        console.error("Error during fetching task:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllTasks = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await prisma.user.findFirst({
            where: { userId },
        });
        if (!user) {
            return res.status(404).json({ message: "User does not exist." });
        }

        const tasks = await prisma.task.findMany({
            where: { userId },
        });

        return res.status(200).json({ data: tasks });
    } catch (error) {
        console.error("Error during fetching tasks:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { title, description, status } = req.body;

        // Find the task by primary key (task_id)
        const task = await prisma.task.findFirst({
            where: {taskId },
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const updatedTask = await prisma.task.update({
            where: {taskId },
            data: {
                title,
                description,
                status,
            },
        });

        return res.status(200).json({ message: "Task updated successfully", data: updatedTask });
    } catch (error) {
        console.error("Error during updating task:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

  
export const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        // Find the task by primary key (task_id)
        const task = await prisma.task.findFirst({
            where: { taskId },
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        await prisma.task.delete({
            where: { taskId },
        });

        return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error during deleting task:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

