import { Router } from 'express';
import userRoutes from './api/userRoutes';
import playlistRoutes from './api/playlistRoutes';

const router = Router();

// Auth routes
// router.use('/auth', authRoutes);

// Protected routes
router.use('/user', userRoutes);
router.use('/playlist', playlistRoutes);

export default router;
