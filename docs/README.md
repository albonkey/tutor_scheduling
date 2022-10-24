# Tutor Scheduling Docs

## Design

### Frontend

#### Homepage
![](https://github.com/albonkey/tutor_scheduling/blob/master/docs/images/Home.png)
#### Profile
![](https://github.com/albonkey/tutor_scheduling/blob/master/docs/images/Profile.png)
#### Sessions
![](https://github.com/albonkey/tutor_scheduling/blob/master/docs/images/Sessions.png)
#### Discovery
![](https://github.com/albonkey/tutor_scheduling/blob/master/docs/images/Discovery.png)
#### Settings
![](https://github.com/albonkey/tutor_scheduling/blob/master/docs/images/Settings.png)
### REST API Endpoints

RESOURCES

|Resource|POST|GET|PUT|DELETE|
|--------|----|---|---|------|
|/courses|Create courses|Get all courses|Update multiple courses|Delete multiple courses|
|/courses/1|Error|Retrieve info for course 1|Update details for course 1|Delete course 1|
|/payments|Create payment|Get all payments|Update multiple payments|Delete multiple payments|
|/payments/1|Error|Retrieve info for payment 1|Update details for payment 1 if it exists|Delete payment 1|
|/reviews|Create a review|Get all reviews|Update multiple reviews|delete multiple reviews|
|/reviews/1|Error|Retrieve info for review 1|Update details for Review 1 if it exists|Delete Review 1|
|/sessions|Create session|Get all sessions|Update multiple sessions|Remove all sessions|
|/sessions/1|Error|Retrieve info for Session 1|Update details for Session 1 if it exists|Delete Session 1|
|/users|Create user|Get all user information|Update multiple users|Delete multiple users|
|/users/1|error|Retrieve details for user 1|Update details for user 1 if it exists|Remove user 1|
|users/1/courses|Create a new course for user1|Get all courses for user1|Update multiple courses for user1|Delete multiple courses for user 1|
/users/1/reviews|Create a new review for user 1|Retrieve all reviews for user 1|Update review for user 1|Remove all reviews for user 1|
|/users/1/sessions|Create a new review for user 1|Get all sessions for user 1|Update session for user 1|Remove all sessions for user 1|
|/users/1/payments|Create new payment for user 1|Get all payments for user 1|Update payment for user 1|Delete all payments for user 1|


### Database
![](https://github.com/albonkey/tutor_scheduling/blob/master/docs/images/Database.png)

