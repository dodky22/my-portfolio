import { gsap, Power4 } from 'gsap'

gsap.defaults({ease: Power4.easeInOut})
gsap.config({ nullTargetWarn: false });

export const toggleTimeline = (tl) => {
    if(tl.isActive()) return;
    tl.reversed() ? tl.play() :  tl.reverse()
}

export let animOutTimeline = gsap.timeline()


export const animateElementsOut = () => {
    animOutTimeline.to('#quitFadeUp', {duration: 0.2 ,y:'-100', opacity:0,  stagger:0.1}, 'start')
                .to('#quitFadeDown', {duration: 0.2 ,y:'100', opacity:0,  stagger:0.1}, 'start')
                .to('#quitFadeLeft', {duration: 0.2 ,x:'-100', opacity:0,  stagger:0.1}, 'start')
                .to('#quitFadeRight', {duration: 0.2 ,x:'100', opacity:0,  stagger:0.1}, 'start')
                .to('#load', {duration: 1 , scaleX: 1,}, 'start')
                .to('#load', {duration: 0.5 , scaleX: 0, transformOrigin: 'right center',},  'start+=0.75')  
                .to('#homelinkHeader', {duration:0.2, x:'-100', opacity:0}, 'start')
                .to('#burgerHeader', {duration:0.2, x:'100', opacity:0}, 'start')

    setTimeout(() => {
        gsap.to('#homelinkHeader', {duration:0.2, x:0, opacity:1}, 'start')
        gsap.to('#burgerHeader', {duration:0.2, x:0, opacity:1}, 'start') 
    }, animOutTimeline.duration()*1000 + 300);

                
    animOutTimeline.play('start')  
}





