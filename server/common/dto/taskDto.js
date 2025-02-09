import mongoose from 'mongoose';

class TaskDto {
    constructor(task, creator) {
        this.id = task._id;
        this.title = task.title;
        this.description = task.description;
        this.creator = {
            id: creator._id,
            fullName: creator.fullName,
            email: creator.email,
            phoneNumber: creator.phoneNumber,
            gender: creator.gender
        };
        this.tags = task.tags;
        this.likeCount = task.likeCount;
        this.createdAt = task.createdAt;
        this.modifiedAt = task.modifiedAt;
    }

    static create = (task, creator) => new PostDto(task, creator);
}

export default TaskDto;
