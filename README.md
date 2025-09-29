# Tv Trivia App

## UserStories

-   As a user, I want an account so I track my score over time.
-   As a user, I would like to see quetions that show a movie clip and guess that movie.
-   As a user, I want to use the platform to learn about new movies and bookmark them.
-   As a user, I want to see what categories I've already done or questions I've gotten wrong.
-   As a user, I want to unlock (badges) achievments as I use over time.
-   As a user, I would like to be able to compete with friends (multiplayer trivia).
-   As a user, I want to see what category I am best/worst in my profile so I can improve.
-   As a user, I want to invite my friends to get rewards in the game.
-   As a user, I would like to be able to spectate.

-   As a admin, I want to be able to manage accounts to ensure data accuracy.
-   As an admin, I want to be able to create new questions and answers, including genre/category.

-   As a player, I would like a see a leaderboard to compare how I did to others.
-   As a player, I want to be able to select a category for question themes.
-   As a player I want to be able to choose difficulty to play at prefered level.
-   As a player, I would like to see question timed, to keep gameplay moving.
-   As a player, I would like to see a dynamic point system (maybe wager points).
-   As a player, I want to see what questions I got wrong and what the right answer were.

-   As a guest, I want to be able to use the website without an account.

-   As a admin, I want to randomize question order for repeatability, and avoid duplicate questions.

### Types of Users
-   User
-   Admin
-   Guest

### User Routes
 - POST create a user account
 - POST login user
 - GET Profile information / stats
 - PUT update user profile (pw, username, img)
 - DELETE user (both admin and user)

### Admin Routes
- GET all Users account
- POST create new category

### Question Routes


Group1
- GET Questions by category
- POST create question(s) route (admin middleware)
    -   Get categoryID from category
    -   See if categoryID exists
    -   if it doesnt create a new
    -   take category ID add it to question object
    -   save to db

Group2
- DELETE question(s) route (admin middleware)
- DELETE questions by category (admin middleware)

Group3
- GET All question(s)
- PUT/PATCH edit question route (admin middleware)

# Category Routes
Group4
- Get All Categories
- PUT/PATCH categories (admin middleware)

Group5
- POST create category
- DELETE categories

### Game Routes
- POST create new game
- PUT update/end game
- ?PUT check questions speed
- GET current/past game information
- GET top scores
- DELETE games

### Practice Server
### Dependencies
-   ✅ express
-   ✅ mongoose
-   ✅ dotenv
-   ✅ nodemon
-   cors (not necessary now, but when we connect front to back we will need it)

### Middleware
-   ✅ Global Err handling
-   ✅ Logging middleware
-   ✅ Parsing Middleware - express.json()


### Env Variable
-   ✅ PORT
-   ✅ mongoURI

### Collections/Schemas
-   ✅ Questions
-   ✅ Users
-   ✅ Game
-   ✅ Category


### Git Commands for this project
-   `git clone <url>` - clone legacy code repo
-   `git checkout -b <new-branch-name>` - created new branch and switched to it
-   `git branch` - allows us to view all branches
-   `git checkout <branch-name>` - switch branches
-   `git pull origin main` - pulls changes from github to your local main branch