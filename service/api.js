import { BASE_URL } from './apiUrls.js';
import request from './request.js';

export const login = (requestObj) => {
    return request({
        url: `${BASE_URL}/User/signIn`,
        method: 'POST',
        data: requestObj
    });
};

export const logout = () => {
    return request({
        url: `${BASE_URL}/User/signOut`,
        method: 'POST'
    }).then(response => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        return response; 
    });
};


export const resetPassword = (requestObj) => {
    return request({
        url: `${BASE_URL}/User/ResetPassword`,
        method: 'POST',
        data: requestObj
    });
};

export const createComment = (requestObj) => {
    return request({
        url: `${BASE_URL}/Comment/create`,
        method: 'POST',
        data: requestObj
    });
};

export const getUserById = (userId) => {
    return request({
        url: `${BASE_URL}/User/GetUser`,
        method: 'GET'
    });
};

export const fetchTask = (id) => {
    return request({
        url: `${BASE_URL}/Task/TaskDetail?${id}`,
        method: 'GET'
    });
}

export const updateTaskStatus = (requestObj) => {
    return request({
        url: `${BASE_URL}/Task/updateStatus`,
        method: 'PUT',
        data: requestObj
    });    
}

export const updateAssignedUsers = (requestObj) => {
    return request({
        url: `${BASE_URL}/Task/assignedUsers`,
        method: 'PUT',
        data: requestObj
    });    
}

export const editUser = (requestObj) => {
    debugger
    return request({
        url: `${BASE_URL}/User/edit`,
        method: 'PUT',
        data: requestObj
    });
};

export const fetchAllTasks = () => {
    return request({
        url: `${BASE_URL}/Task/all`,
        method: 'GET'
    });
};

export const fetchRecentTasks = () => {
    return request({
        url: `${BASE_URL}/Task/recentTasks`,
        method: 'GET'
    });
}

export const fetchRecentComments = () => {
    return request({
        url: `${BASE_URL}/Comment/recentComments`,
        method: 'GET'
    });
};

export const fetchUser = () => {
    return request({
        url:  `${BASE_URL}/User/getUser`,
        method: 'GET'
    });
};

export const fetchAllUsers = () => {
    return request({
        url:    `${BASE_URL}/User/all`,
        method: 'GET'
    });
};

export const getTotalUsers = () => {
    return request({
        url: `${BASE_URL}/User/totalUsers`,
        method: 'GET'
    });
};

export const getTotalTasks = () => {
    return request({
        url: `${BASE_URL}/Task/totalTasks`,
        method: 'GET'
    });
}

export const getCompletedTasks = () => {        
    return request({
    url: `${BASE_URL}/Task/completedTasks`,
    method: 'GET'
    })
};

export const getTotalAttachments = () => {
    return request({
        url: `${BASE_URL}/Task/totalDocuments`,
        method: 'GET'
    });
};

export const fetchAllUserNotifications = () => {
    return request({
        url: `${BASE_URL}/Notification/getNotifications`,
        method: 'GET'
    });
};

export const readAllUserNotification = () => {
    return request({
        url: `${BASE_URL}/Notification/readAllNotifications`,
        method: 'PUT'
    });
};

export const readUserNotification = (id) => {
    return request({
        url: `${BASE_URL}/Notification/readNotification?id=${id}`,
        method: 'PUT'
    });
};

export const userNotificationCount = () => {
    return request({
        url: `${BASE_URL}/Notification/userNotificationCount`,
        method: 'GET',
    });
};


{/*Clearing Cookie after deactivating Account*/}
export const deactivateAccount = () => {
    return request({
        url: `${BASE_URL}/User/deactivate`,
        method: 'PUT'
    }).then(response => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        return response; 
    });
};
