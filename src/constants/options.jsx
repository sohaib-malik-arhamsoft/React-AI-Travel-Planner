export const SelectBudgeOptions =[
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of cost',
        icon: '💵'
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon: '💰'
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Dont worry about cost',
        icon: '💸'
    }
]

export const SelectTravelsList =[
    {
        id: 1,
        title: 'Just Me',
        desc: 'A sole traveles in exploration',
        icon: '✈️',
        people: '1'
    },
    {
        id: 2,
        title: 'A Couple',
        desc: 'Two traveles in tandem',
        icon: '🥂',
        people: '2'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A group of fun loving adv',
        icon: '🏡',
        people: '3 to 5 people'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekes',
        icon: '⛵',
        people: '5 to 10 people'
    }
]

export const AI_PROMPT = 'Generate travel plan for location: {location}, for {totalDays} Days for {traveler} with a {budget} budget, Give me hotels options list with HotelName, Hotel Address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, place detail, place image url, ticket pricing rating, time travel each of the location for {totalDays} days with each day plan with best time to visit in json formatt'