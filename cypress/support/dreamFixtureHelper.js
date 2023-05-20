const getUser = {
    "name": "The Countess",
    "email": "ollie.bernhard@grant.test",
    "dreams": [
        {
            "id": "7",
            "title": "Prince Humperdinck",
            "description": "Ray has gone bye-bye, Egon... what've you got left?",
            "lucidity": 4,
            "dreamDate": "1/7/2023",
            "emotions": [
                {
            
                    "name": "Happy"
                },
                {
      
                    "name": "Sad"
                }
            ],
            "tags": [
                {
              
                    "name": "Work"
                },
                {
             
                    "name": "Fire"
                }
            ]
        },
        {
            "id": "8",
            "title": "Miracle Max",
            "description": "Do you experience feelings of dread in your basement or attic?",
            "lucidity": 3,
            "dreamDate": "4/25/2023",
            "emotions": [
                {
            
                    "name": "Anxious"
                },
                {
      
                    "name": "Curious"
                }
            ],
            "tags": [
                {
      
                    "name": "School"
                },
                {
      
                    "name": "Water"
                }
            ]
        },
        {
            "id": "9",
            "title": "Miracle Max",
            "description": "Gozer the Gozerian... good evening. As a duly designated representative of the City, County and State of New York, I order you to cease any and all supernatural activity and return forthwith to your place of origin or to the nearest convenient parallel dimension.",
            "lucidity": 4,
            "dreamDate": "9/7/2023",
            "emotions": [
                {
             
                    "name": "Grateful"
                },
                {
             
                    "name": "Curious"
                }
            ],
            "tags": [
                {
             
                    "name": "Stange place"
                },
                {
           
                    "name": "School"
                }
            ]
        }
      ]
}
const createDream = {
    "id": "302",
    "dreamDate": "5/10/2023",
    "title": "My Dream Label",
    "description": "A detailed description of my dream.",
    "emotions": [
        {
            "name": "Excitement"
        },
        {
            "name": "Happiness"
        }
    ],
    "tags": [
        {
            "name": "Adventure"
        },
        {
            "name": "Mystery"
        }
    ],
    "lucidity": 4
}

// export const dreamJSON = (dreams) => {
//     return {
//         "data": {
//          "createDream": createDream.map(user => user.dreams === dreams)   
//     }
//     }
// }

export const userJSON = (id) => {
    return {
      "data": {
        "getUser": getUser.find(user => user.id === id)
      }
    }
  }
