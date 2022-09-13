## Design for Rest API
    RESOURCES

|Resource|POST|GET|PUT|DELETE|
|--------|----|---|---|------|
|/courses|Create courses|Get all courses|Update multiple courses|Delete multiple courses
|/payments|Create payment|Get all payments|Update multiple payments|Delete multiple payments
|/reviews|Create a review|Get all reviews|Update multiple reviews|delete multiple reviews
|/sessions|Create session|Get all sessions|Update multiple sessions|Remove all sessions
|/users|Create user|Get all user information|Update multiple users|Delete multiple users
|/users/:1|error|Retrieve details for user1|Update details for user1 if it exists|Remove user1|
|users/1/courses|Create a new course for user1|Get all courses for user1|Update multiple courses for user1|Delete multiple courses for user1
/users/1/reviews|Create a new review for user1|Retrieve all reviews for user1|Update review for user 1|Remove all reviews for user1|
|/users/1/sessions|Create a new review for user1|Get all sessions for user1|Update session for user1|Remove all sessions for user1
|/users/1/payments|Create new payment for user1|Get all payments for user1|Update payment for user1|Delete all payments for user1





