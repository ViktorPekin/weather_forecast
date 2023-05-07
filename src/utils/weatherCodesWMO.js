import bright from '../images/free-icon-bright-4837637.png'
import cloudyDay from '../images/free-icon-cloudy-day-4837661.png'
import cloudy from '../images/free-icon-cloudy-4837668.png'
import rain from '../images/free-icon-rain-4837776.png'
import blizzard from '../images/free-icon-blizzard-4837621.png'
import storm from '../images/free-icon-storm-4837867.png'
import thunder from '../images/free-icon-thunder-4837904.png'
import moon from '../images/free-icon-moon-4837721.png'
import cloudyMoon from '../images/free-icon-moon-cloudy-4837714.png'

const searchWeatherCodes = (code, timesOfDay) => {
  if (code === 0 && timesOfDay === 1) {
    return bright
  } else if (code === 0 && timesOfDay === 0) {
    return moon
  } else if (code === 1 || code === 2 || code === 3) {
    if (timesOfDay === 1) {
      return cloudyDay
    } else {
      return cloudyMoon
    }
  } else if (code === 45 || code === 48 || code === 51 || code === 53 || code === 55 || code === 56 || code === 57) {
    return cloudy
  } else if (code === 61 || code === 63 || code === 65 || code === 66 || code === 67) {
    return rain
  } else if (code === 71 || code === 73 || code === 75 || code === 77 || code === 85 || code === 86) {
    return blizzard
  } else if (code === 80 || code === 81 || code === 82) {
    return storm
  } else if (code === 95 || code === 96 || code === 99) {
    return thunder
  }
}

export default searchWeatherCodes
