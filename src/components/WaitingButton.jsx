import styles from './WaitingInfo.module.css';

const WaitingInfo = () => {
  return (
    <div className={styles.container}>
      <p className={styles.waitingInfo}>현재 대기 인원: 7명</p>
      <p className={styles.waitingInfo}>예상 대기시간: 26분</p>
    </div>
  );
};

export default WaitingInfo;