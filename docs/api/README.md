# REST API Endpoints

| Resource          | POST                          | GET                            | PUT                                 | DELETE                         |
|-------------------|-------------------------------|--------------------------------|-------------------------------------|--------------------------------|
| /courses          | Create courses                | Retrieve all courses           | Update multiple courses             | Remove all courses             |
| /courses/1        | Error                         | Retrieve details for course 1  | Update details for course 1         | Remove course 1                |
| /payments         | Create Payment                | Retrieve all payments          | Update multiple payments            | Remove all payments            |
| /reviews          | Create review                 | Retrieve all reviews           | Update multiple reviews             | Remove all reviews             |
| /reviews/1        | Error                         | Retrieve details for review 1  | Update details for review 1         | Remove review 1                |
| /sessions         | Create session                | Retrieve all sessions          | Update multiple sessions            | Remove all sessions            |
| /sessions/1       | Error                         | Retrieve details for session 1 | Update details for session 1        | Remove session 1               |
| /users            | Create user                   | Retrieve all users             | Update multiple users               | Remove all users               |
| /users/1          | Error                         | Retrieve details for user 1    | Update details for user 1           | Remove user 1                  |
| /users/1/courses  | Create new course for user 1  | Get all courses for user 1     | Update multiple courses for user 1  | Remove all courses for user 1  |
| /users/1/reviews  | Create new review for user 1  | Get all reviews for user 1     | Update multiple reviews for user 1  | Remove all reviews for user 1  |
| /users/1/sessions | Create new session for user 1 | Get all sessions for user 1    | Update multiple sessions for user 1 | Remove all sessions for user 1 |
| /users/1/payments | Create new payment for user 1 | Get all payments for user 1    | Update multiple payments for user 1 | Remove all payments for user 1 |
