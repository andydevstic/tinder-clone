import './history.scss';

import { useEffect, useState } from 'react';
import { LoadingOutlined, UpSquareOutlined, HeartOutlined, CloseOutlined, HomeOutlined } from '@ant-design/icons';

import { useAppDispatch } from '../../state';
import { HistoryCard } from '../../components/history-card';
import { USER_PREFERENCE_TYPES } from '../../shared/constants';
import { useUserHistory } from '../../state/history/selectors';
import { getUserAge } from '../../shared/utils';

import { historyActions } from '../../state/history';
import { advanceNextHistoryPage } from '../../state/history/thunks';
import { Link } from 'react-router-dom';

// const LazyLoadDiv = (props) => {
//   const { forwardedRef } = props;

//   return (
//     <div
//       ref={forwardedRef}
//       className='history-page__container__lazyload viewport-block'
//     />
//   )
// }

export const HistoryPage = () => {
  const dispatch = useAppDispatch();
  const [preferenceType, setPreferenceType] = useState(USER_PREFERENCE_TYPES.LIKE);
  const [currentHistoryData, setHistoryData] = useState([]);

  const {
    isLoading,
    data,
  } = useUserHistory();

  useEffect(() => {
    const historyData = data[preferenceType];
    if (!historyData || !historyData.length) {
      dispatch(advanceNextHistoryPage(preferenceType));
    }
  }, []);

  useEffect(() => {
    const historyData = data[preferenceType];
    setHistoryData(historyData);
  }, [preferenceType, dispatch, data]);

  return (
    <div className='history-page'>
      <div className='history-page__container'>
        {
          isLoading
            ? <div className='history-page__container__loading'>
                <LoadingOutlined style={{fontSize: '50px'}} />
              </div>
            : <>
                <div
                  onClick={() => advanceNextHistoryPage(preferenceType)}
                  className='history-page__container__load-more'
                >
                  <UpSquareOutlined style={{fontSize: '40px'}} />
                </div>
                {
                  currentHistoryData && currentHistoryData.length
                    ? (
                        <div className='history-page__container__list'>
                        {
                          currentHistoryData.map(({ id, firstName, lastName, picture, dateOfBirth }) => {
                            const fullName = `${firstName} ${lastName}`;
                            const age = getUserAge(dateOfBirth);

                            return (
                              <HistoryCard
                                key={id}
                                userData={{ fullName, picture, age }}
                              />
                            );
                          })
                        }
                        </div>
                      )
                    : <div className='history-page__container__list--no-data'>
                        <h1>You have no data to show</h1>
                      </div>
                }
              </>

        }
        <div className='history-page__container__filter-btns'>
          <div
            className='history-page__container__filter-btns__pass'
            onClick={
              isLoading
                ? null
                : () => setPreferenceType(USER_PREFERENCE_TYPES.PASS)
            }
          >
            <CloseOutlined style={{fontSize: '30px'}} />
          </div>

          <div
            className='history-page__container__filter-btns__like'
            onClick={
              isLoading
                ? null
                : () => setPreferenceType(USER_PREFERENCE_TYPES.LIKE)
            }
          >
            <HeartOutlined style={{fontSize: '30px'}} />
          </div>
        </div>
        <Link
          className='history-page__container__back-btn'
          to='/'
          style={{color: 'black'}}
        >
          <HomeOutlined style={{fontSize: '30px'}} />
        </Link>
      </div>
    </div>
  );
}