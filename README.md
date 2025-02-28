# Sylvias_App

This is an app for my mother-in-law, who works to coordinate school buses at a special education K-12 school. The buses arrive in the morning and park in 1 of 3 rows (not assigned). The buses are from multiple companies. Sylvia's job is to write down which buses are coming and where they parked so that the teachers can come out and get their students.

My goal is to provide a simpler, more efficient way to map out the daily bus schedules.

AS A LOGGED-IN USER, I SHOULD BE ABLE TO:

- View and comment on previous day's bus maps
- Search for maps by date
- "Favorite" a map (ie- "this bus order allowed for the smoothest transition")

AS A LOGGED-IN USER (ADMIN), I SHOULD BE ABLE TO:

- A logged-in user will have access to:
  organize/edit the arrival order
  leave notes 
  archive the list after the task is complete

AS AN ENGINEER, I SHOULD:

- Have a well-seeded database so that I can simulate several different scenarios for the user stories below: Bus data (company, number, driver, district)

- Seed hundreds of items and reviews with dummy data so that when you get to the “pagination” user story, you won’t have to worry about adding more.

- Also, add a bunch of users with reviews so the review editing features can be worked on without already having the “write a review” functionality built: Test with sample orders/To Do Lists

- Have secured user data so that no one can unrightfully manipulate information: UUID, authorization, authentication, etc.
