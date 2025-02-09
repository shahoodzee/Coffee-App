import User from "../models/User.js";

export const IsOldUser = async (email) => {
    try {
        const user = await User.findOne({ email });
        if(user == null)
            return false;
        else
            return true;
    } catch (error) {
        throw new Error('Error finding user by email');
    }
};

export const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne();
        return user;
    } catch (error) {
        throw new Error('Error finding user by email');
    }
};

export const getUserByPhone = async (phone) => {
    try {
        const user = await User.findOne({ phone });
        return user;
    } catch (error) {
        throw new Error('Error finding user by phone');
    }
};

export const getUserById = async (id) => {
    try {
        const user = await User.findById(id);
        return user;
    } catch (error) {
        throw new Error('Error Fetching User');
    }
};

export const getAllUsers = async () => {
    try {
        const Users = await User.find();
        return Users;
    } catch (error) {
        throw new Error('Error Fetching all Users');
    }
}

export const isUserEmailConfirmed = async (userId) => {
    try {
        const user = await getUserById(userId);
        return user.emailConfirmed;
    } catch (error) {
        throw new Error('Error Fetching User');
    }
};
