# Getting Started with Admin UI Dashboard

This project was developed with reference to Admin Ui given in
[GeekTrust Coding Challenges](https://www.geektrust.com/challenge/admin-ui).

## Problem Statement

You work at a startup that is building an interface for admins to see and delete
users. The users will be provided via an API. Your job is to build out a working
UI. See image below for reference.

Note - this is for reference only. You don't need to build the exact same UI.

Problem statement Badges and score You work at a startup that is building an
interface for admins to see and delete users. The users will be provided via an
API. Your job is to build out a working UI. See image below for reference.

Note - this is for reference only. You don't need to build the exact same UI.

# These are the requirements :

1. Column titles must stand out from the entries.
2. There should be a search bar that can filter on any property.
3. You should be able to edit or delete rows in place.(There is no expectation
   of persistence. Edit and delete are expected to only happen in memory.)
4. You need to implement pagination: Each page contains 10 rows. Buttons at the
   bottom allow you to jump to any page including special buttons for first
   page, previous page, next page and last page. Pagination must update based on
   search/filtering. If there are 25 records for example that match a search
   query, then pagination buttons should only go till 3.
5. You should be able to select one or more rows. A selected row is highlighted
   with a grayish background color. Multiple selected rows can be deleted at
   once using the 'Delete Selected' button at the bottom left.
6. Checkbox on the top left is a shortcut to select or deselect all displayed
   rows. This should only apply to the ten rows displayed in the current page,
   and not all 50 rows. Users API We provide you an Users API to list all the
   users and their properties.

Note : The users are sorted by `id` field. There is no alphabetical sorting.

## Request Type :

# `GET`

## Endpoint:

https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json

## `Sample Response` :

```JSON
[
    {
        "id": "1",
        "name": "Aaron Miles",
        "email": "aaron@mailinator.com",
        "role": "member"
    },
    {
        "id": "2",
        "name": "Aishwarya Naik",
        "email": "aishwarya@mailinator.com",
        "role": "member"
    },
    {
        "id": "3",
        "name": "Arvind Kumar",
        "email": "arvind@mailinator.com",
        "role": "admin"
    }
]
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests)
for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best
performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about
[deployment](https://facebook.github.io/create-react-app/docs/deployment) for
more information.
