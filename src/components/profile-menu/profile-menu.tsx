import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { fetchLogoutUser } from '../../services/slices/auth';
import { useDispatch } from '../../services/store';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(fetchLogoutUser()).then(() => navigate('/login'));
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
