import jwt from 'jsonwebtoken';
import env from 'node:process';
import { ApiResponse } from './ApiResponse.js';

env.JWT_SECRET = 'afqngbbqm132r32r23krjb2k3';
/**
 * Generates a JWT token for a user.
 * @param {Object} user - The user object containing the user's ID and email.
 * @returns {string} - The generated JWT token.
 */
export const generateToken = (user) => {
  const secretKey = env.JWT_SECRET;
  const token = jwt.sign(
    { 
      cdui: user.id,
      cdun: user.fullName,
      cdrn: user.role
    },
    secretKey,
    { expiresIn: '7h' }
  );
  return token;
};

/**
 * Sets the JWT token in the browser cookies.
 * @param {Object} res - The response object from Express.
 * @param {string} token - The JWT token to set in the cookies.
 */
export const setTokenCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    //secure: process.env.NODE_ENV === 'production',
    maxAge: 3600000, // 1 hour in milliseconds
  });
};

/**
 * Clears the JWT token from the browser cookies to log out the user.
 * @param {Object} res - The response object from Express.
 */
export const clearTokenCookie = (res) => {
    res.cookie('token', '', {
      httpOnly: true,
      maxAge: 0,
    });
};

  
export const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json(ApiResponse(false, 'No token provided', null));
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json(ApiResponse(false, 'Invalid token', null));
  }
};