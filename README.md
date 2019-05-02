# StayFreshersJS
Here the Nerds are the popular ones


#todo
* work on routes
* and start creating database
#USER STORIES
* after login a user is taken to profile dashboard page should have the ability to:
  - list decks by title and subject. 
  - show friends
  - create, edit, and delete decks
  - 


relationships
user
  name string
  handle string
  date

profile
  user_id
  decks [ refs ]
  date 
  

deck 
  user_id string
  date
  description string
  cards [ embedded
    term string
    definition string
  ]
    
