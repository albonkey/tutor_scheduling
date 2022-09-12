## Design for Rest API
    RESOURCES

|Resource|POST|GET|PUT|DELETE|
|--------|----|---|---|------|
|/user   |create user|Get all user information| update multiple users| delete multiple users
|/user/:1|error|retrieve details for user 1|update details for user 1 if it exists|remove user 1|
/user/1/reviews|create a new review for user 1|retrieve all reviews for user 1|update review for user 1|remove all reviews for user 1|
|/session|create session|Get all sessions|update multiple sessions|remove all sessions
|/session/1/user|create a new review for user1|Get all sessions for user1|update session for user1|remove all sessions for user1
|/payment|create payment|Get all payments|update multiple payments|delete multiple payments
|/payment/1/user|create new payment for user1|Get all payments for user1|update payment for user1|delete all payments for user1



users
    POST--->handle User log in by authenticating user & return profile information (name, contact etc)
    POST-->Register a new user. Authorization for new users based on profile (student or tutor) & add user to db.
    PUT-->Update db on user info, like subject matter expert & grade levels, years of experience, contact info.
    DELETE-->UN-register a user & delete from db.
discovery
    GET-->/users?search=biology-->query db by SME & return a collection of tutors
    GET-->/users/:id-->query db by specific tutor & return details on tutor like experience, education, reviews
reviews(only available to students to review tutors)
    
    GET-->/reviews/:id-->query db by specific review & return details of that review
    POST->/reviews--->user adds a new review for tutor & append review to db.
    PUT-->/reviews/:id-->updates a specific review
    DELETE-->/reviews/:id-->deletes specific review
payments
    GET-->/payments-->query db for logged in user & return a collection of payment history
    GET-->/payments/:id -->query db for specific transaction & return details on it
    POST-->/payments/--->add new payment information & append this to db
    PUT--->/payments/:id-->update specific payment info like card expiration date or billing address & update db.
    DELETE-->/payments/:id-->delete specific payment info & delete from db
screening
    GET-->/screening-->

sessions
GET==>get all session
POST==>create new session
PUT==>update session
