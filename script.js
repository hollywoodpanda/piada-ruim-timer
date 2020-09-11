let daysComp    = null
let hoursComp   = null
let minutesComp = null
let secondsComp = null
let titleComp   = null
let bodyComp    = null

const backgroundGradient =
  'linear-gradient(to bottom, rgba(255, 254, 254, 0.9), rgba(0, 0, 0, 0.7))'

const almostImage = 'res/almost-time.jpg'
const nowImage = 'res/its-time.jpg'
const longtimeImage = 'res/long-time.jpg'

const setTimerVisible = (visible) => {

    const visibility = visible ? 'visible' : 'none'

    daysComp.style.display = visibility 
    hoursComp.style.display = visibility  
    minutesComp.style.display = visibility
    secondsComp.style.display = visibility
    titleComp.style.display = visibility
    bodyComp.style.display = visibility

}

const setBackgroundImage = (image) => {

    bodyComp.style['background-image']  = `${backgroundGradient}, url("${image}")`

}

const setTitle = (title) => {

    titleComp.innerHTML = title

}

const calculateTime = () => {

    const now = new Date()

    // é sexta
    if (now.getDay() === 5) {

        console.log('😓 Chegou o dia, infelizmente')

        setBackgroundImage(nowImage)
        setTitle('😧 É Hoje')
        setTimerVisible(false)
        return

    }

    setTimerVisible(true)

    setTitle('Piada Ruim Em')

    const nextFriday = new Date(now.getTime())

    nextFriday.setHours(0)
    nextFriday.setMinutes(0)
    nextFriday.setSeconds(0)
    nextFriday.setDate(nextFriday.getDate() + (12 - nextFriday.getDay()) % 7)

    if (nextFriday.getDay() >= 4) {

        setBackgroundImage(almostImage)

    } else {

        setBackgroundImage(longtimeImage)

    }

    const diff = new Date(nextFriday.getTime() - now.getTime())

    secondsComp.innerHTML = Math.floor(diff.getTime() / 1000) % 60
    minutesComp.innerHTML = Math.floor(diff.getTime() / 1000 / 60) % 60;
    hoursComp.innerHTML = Math.floor(diff.getTime() / 1000 / 60 / 60) % 24;
    daysComp.innerHTML = Math.floor(diff.getTime() / 1000 / 60 / 60 / 24);

}

// Quando carregar...
document.addEventListener('DOMContentLoaded', function(evt) {

    daysComp    = document.querySelector('#days-text')
    hoursComp   = document.querySelector('#hours-text')
    minutesComp = document.querySelector('#minutes-text')
    secondsComp = document.querySelector('#seconds-text')
    titleComp   = document.querySelector('#counter-title')
    bodyComp    = document.body

    // Roda agora...
    calculateTime()

    // ... e de 1 em 1 segundo
    setInterval(calculateTime, 1000)

})

