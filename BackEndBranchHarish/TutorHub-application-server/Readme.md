## Design for Rest API
    RESOURCES

|Resource|POST|GET|PUT|DELETE|
|--------|----|---|---|------|
|/courses|create courses|Get all courses|update multiple courses|delete multiple courses
|/payments|create payment|Get all payments|update multiple payments|delete multiple payments
|/reviews|create a review|get all reviews|update multiple reviews|delete multiple reviews
|/sessions|create session|Get all sessions|update multiple sessions|remove all sessions
|/users|create user|Get all user information| update multiple users| delete multiple users
|/users/:1|error|retrieve details for user 1|update details for user 1 if it exists|remove user 1|
|users/1/courses|create a new course for user1| Get all courses for user1|update multiple courses for user1|delete multiple courses for user1
/users/1/reviews|create a new review for user 1|retrieve all reviews for user 1|update review for user 1|remove all reviews for user 1|
|/users/1/sessions|create a new review for user1|Get all sessions for user1|update session for user1|remove all sessions for user1
|/users/1/payments|create new payment for user1|Get all payments for user1|update payment for user1|delete all payments for user1





