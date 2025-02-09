export const ApiResponse = (success = false, message, data = null) => {
    return { success, message, data }; 
};