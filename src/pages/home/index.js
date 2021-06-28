import './home.scss';

import { useEffect } from 'react';

import { HeartOutlined, CloseOutlined } from '@ant-design/icons';
import { useUserIndexes, useUsersSelector } from '../../state/user/selectors';
import { useAppDispatch } from '../../state';
import { advanceNextUserThunk } from '../../state/user/thunks';
import { LoadingOutlined } from '@ant-design/icons';

export const HomePage = () => {
  const userData = useUsersSelector();
  const { watchedIndex } = useUserIndexes();
  const dispatch = useAppDispatch();
  const { data, isLoading } = userData;

  const currentUser = data[watchedIndex];

  useEffect(() => {
    dispatch(advanceNextUserThunk());
  }, [dispatch]);

  return (
    (!isLoading && currentUser)
      ? <div className='home-page'>
          <div className='home-page__container'>
            <div className='home-page__container__intro'>
              <h1>Hello, CoderPush!</h1>
            </div>
            <div className='home-page__container__user-picture'>
              <img src={currentUser.picture} />
            </div>
            <div className='home-page__container__user-info'>
              <h3>{currentUser.firstName} {currentUser.lastName}</h3>
              <h3>{currentUser.dateOfBirth}</h3>
            </div>

            <div className='home-page__container__action-btns'>
              <div className='home-page__container__action-btns__pass'>
                <CloseOutlined style={{fontSize: '30px'}} />
              </div>

              <div className='home-page__container__action-btns__like'>
                <HeartOutlined style={{fontSize: '30px'}} />
              </div>
            </div>
          </div>
        </div>
      : <div className='home-page'>
          <div className='home-page__container'>
            <div className='home-page__container__loading'>
              <LoadingOutlined style={{fontSize: '50px'}} />
            </div>
          </div>
        </div>
  )
}