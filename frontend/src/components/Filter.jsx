import React,{useRef, useState} from 'react'

import {useDispatch, useSelector} from 'react-redux'
import {filterProjectsByCategory} from '../actions/projectActions'

import {gsap, Power3} from 'gsap'

import styles from '../css/PortfolioPageStyles.module.css'

const Filter = ({projects}) => {
    const [selectedValue, setselectedValue] = useState('ALL')

    const dispatch = useDispatch()

    let upperRow = useRef(null);
    let text = useRef(null);
    let downRow = useRef(null);

    let technologies = projects.map((item) => item.technologies);

    const filterProjects = useSelector(state => state.filterProjects)
    const {projects:filteredProjects} = filterProjects

    const unwantedOptions = [
      "DARSKYAPI",
      "JSX",
      "OXYGEN",
      "PHP",
      "AVADA-THEME",
      "NAPOLI-THEME",
      "AUTOVIO-THEME",
      "SHOPKEEPER-THEME"
    ];

    const mergeArrays = (...arrays) => {
        let jointArray = [];
        arrays.forEach((array) => {
          jointArray = [...jointArray, ...array];
        });
        return Array.from(new Set([...jointArray]));
      };

    let filterValues = mergeArrays(...technologies).filter(
      (item) => !unwantedOptions.includes(item)
    );

    filterValues.unshift('All')
    let tlfilter = gsap.timeline({paused: true, reversed: true})

    const handleClick = (e) => {
      e.preventDefault()
      
      tlfilter.to(upperRow, {duration:0.1, x: 0, ease:Power3.easeInOut})
        .to(downRow, {duration:0.1, x: 0, ease:Power3.easeInOut}, '-=0.1')
        .to(text, {duration:0.25 , top: 0,  ease:Power3.easeInOut}  )
        .to(text, {duration:0.5 , top: '-25',  ease:Power3.easeInOut, delay:0.5})
        .to(upperRow, {duration:0.5, x: '-100%' , ease:Power3.easeInOut})
        .to(downRow, {duration:0.5, x: '100%' , ease:Power3.easeInOut}, '-=0.5')

        toggleTimeline(tlfilter)

        setselectedValue(e.target.textContent.toUpperCase())
        
        dispatch(filterProjectsByCategory(e.target.textContent))
        
    }

    const toggleTimeline = (tlfilter) => {
      tlfilter.reversed() ? tlfilter.play() :  tlfilter.reverse()
    }

    let filter = filterValues.map((item, id) => {
      return (
        <span 
          key={id}
          className={item.toUpperCase() === selectedValue ? `${styles.portfolio_link} ${styles.activeFilter}` : styles.portfolio_link}
          onClick={(e) => handleClick(e)}
          style={{"--animation-order": 1 + id}}
        >
          <span>
          {item.toUpperCase()}
          </span>
        </span>
      );
    });

  return  <div id="quitFadeUp" className={styles.portfolio_links_wrapper}>
            {filter}
            <div className={styles.filterAnim} >
              <div ref={el => upperRow = el}></div >
              <div className={styles.filterTextWrap}>
                <span ref={el => text = el}>{
                `FILTERING 
                ${filteredProjects.length !== 0 ? filteredProjects.category.toUpperCase() : 'ALL'}
                 PROJECTS...`}</span>
              </div>
              <div ref={el => downRow = el}></div>
            </div>
          </div>;
}

export default Filter
