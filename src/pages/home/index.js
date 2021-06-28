import './home.scss';

import { useEffect } from 'react';

import { HeartOutlined, CloseOutlined } from '@ant-design/icons';
import { useCurrentUser, useUsers } from '../../state/user/selectors';
import { useAppDispatch } from '../../state';
import { advanceNextUser } from '../../state/user/thunks';
import { LoadingOutlined } from '@ant-design/icons';
import { getUserAge } from '../../shared/utils';
import { USER_PREFERENCE_TYPES } from '../../shared/constants';


export const HomePage = () => {
  const dispatch = useAppDispatch();

  const { data, isLoading } = useUsers();
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (!data || !data.length) {
      dispatch(advanceNextUser());
    }
  }, [data, dispatch]);

  return (
    (data.length && currentUser)
      ? <div className='home-page'>
          <div className='home-page__container'>
            <div className='home-page__container__intro'>
              <h1>Hello, CoderPush!</h1>
            </div>
            <div className='home-page__container__user-picture'>
              <img src={currentUser.picture} />
            </div>
            <div className='home-page__container__user-info'>
              <h2>{currentUser.firstName} {currentUser.lastName}, {getUserAge(currentUser.dateOfBirth)}</h2>
            </div>

            <div className='home-page__container__action-btns'>
              <div // Should not use arrow fn here for best performance, but just use it for now.
                className='home-page__container__action-btns__pass'
                onClick={
                  isLoading
                    ? null
                    : () => dispatch(advanceNextUser({
                    preferenceType: USER_PREFERENCE_TYPES.PASS,
                    userId: currentUser.id,
                  }))
                }
              >
                <CloseOutlined style={{fontSize: '30px'}} />
              </div>

              <div
                className='home-page__container__action-btns__like'
                onClick={
                  isLoading
                    ? null
                    : () => dispatch(advanceNextUser({
                    preferenceType: USER_PREFERENCE_TYPES.LIKE,
                    userId: currentUser.id,
                  }))
                }
              >
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