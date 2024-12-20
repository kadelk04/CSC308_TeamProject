import { Router } from 'express';
import {
  getUserByUsername,
  getAllUsers,
  updateUserByUsername,
} from '../../controllers/UserController';
import {
  addFavorite,
  getUserFavorites,
  removeFavorite,
  updateFavorite,
} from '../../controllers/favoritesController';
import { getPlaylistsByUsername } from '../../controllers/playlistController';
import { registerUser } from '../../middleware/auth';
const router = Router();
router.get('/', getAllUsers);
router.post('/', registerUser);
router.get('/:username', getUserByUsername);
router.put('/:username', updateUserByUsername);
// Nested routes for user resources
router.get('/:username/playlist', getPlaylistsByUsername);
router.get('/:username/favorites', getUserFavorites);
router.post('/:username/favorites', addFavorite);
router.delete('/:username/favorites', removeFavorite);
router.patch('/:username/favorites', updateFavorite);
export default router;
