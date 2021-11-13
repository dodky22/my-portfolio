import React from 'react'

const Burger = () => {

     const handleClick = (e) => {
        e.preventDefault();
        toggleTimeline(tlnav);
    }

    
    return (
        <div className={styles.special_con} onClick={(e) => {
            handleClick(e)
          }}>
          <div className={`${styles.bar} ${styles.arrow_top_fall}`} ref={el => topArr = el}></div>
          <div className={`${styles.bar} ${styles.arrow_middle_fall}`}></div>
          <div className={`${styles.bar} ${styles.arrow_bottom_fall}`}></div>
      </div>
    )
}

export default Burger
