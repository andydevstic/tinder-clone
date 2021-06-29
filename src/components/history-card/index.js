import './history-card.scss';

export const HistoryCard = (props) => {
  const { userData } = props;
  const { picture, fullName, age } = userData;

  return (
    <div className='history-card'>
      <div className='history-card__picture'>
        <img src={picture} />
      </div>

      <div className='history-card__info'>
        <h3>{fullName}, {age}</h3>
      </div>
    </div>
  )
}