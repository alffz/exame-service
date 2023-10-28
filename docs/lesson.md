# Lesson api specification

## Create

Endpoint : POST /api/v1/lesson

Request Body

- name : string required max (50)
- questions : required json

```json
{
  "name": "Math",
  "questions": [
    {
      "question": "lorem ipsum",
      "choice": {
        "a": "loremp",
        "b": "ipsum",
        "c": "dolor",
        "d": "sir amit"
      },
      "answer": "a"
    },
    {
      "question": "lorem ipsum",
      "choice": {
        "a": "loremp",
        "b": "ipsum",
        "c": "dolor",
        "d": "sir amit"
      },
      "answer": "b"
    }
  ]
}
```

Response Body Success

```json
{
  "message": "SUCCESS"
}
```

Response Body Error

```json
{
  "errors": ["name is required", "questions is required"]
}
```

## Update

Endpoint : PUT /api/v1/lesson/:id

Request Body

- name : string required max (50)
- questions : required json

```json
{
  "name": "Math",
  "questions": [
    {
      "question": "lorem ipsum",
      "choice": {
        "a": "loremp",
        "b": "ipsum",
        "c": "dolor",
        "d": "sir amit"
      },
      "answer": "a"
    },
    {
      "question": "lorem ipsum",
      "choice": {
        "a": "loremp",
        "b": "ipsum",
        "c": "dolor",
        "d": "sir amit"
      },
      "answer": "b"
    }
  ]
}
```

Response Body Success

```json
{
  "message": "SUCCESS"
}
```

Response Body Error

```json
{
  "errors": ["name is required", "questions is required"]
}
```

## DELETE

Endpoint : DELETE /api/v1/lesson/:id

Response Body Success

```json
{
  "message": "SUCCESS"
}
```

Response Body Error

```json
{
  "errors": ["lesson not found"]
}
```

## GET all

Endpoint : GET /api/v1/lesson

Response Body Success

```json
{
  "message": "SUCCESS",
  "data": [
    {
      "id": 1,
      "name": "Math"
    },
    {
      "id": 2,
      "name": "Science"
    },
    {
      "id": 3,
      "name": "biology"
    }
  ]
}
```

Response Body Error

```json
{
  "errors": ["Somting went wrong"]
}
```

## GET by id

Endpoint : GET /api/v1/lesson/:id?exame=false

Request Params

- exame : boolean. false (default) will return answer, true will not

Response Body Success

```json
{
  "id": 1,
  "name": "Math",
  "questions": [
    {
      "id": "uuid",
      "question": "lorem ipsum",
      "choice": {
        "a": "loremp",
        "b": "ipsum",
        "c": "dolor",
        "d": "sir amit"
      },
      "answer": "a"
    },
    {
      "id": "uuid",
      "question": "lorem ipsum",
      "choice": {
        "a": "loremp",
        "b": "ipsum",
        "c": "dolor",
        "d": "sir amit"
      },
      "answer": "a"
    }
  ]
}
```

Response Body Error

```json
{
  "errors": ["Somting went wrong"]
}
```

## POST submit answer

Endpoint : POST /api/v1/lesson/:id/submit

Request Body

- id question: answer

```json
{
  "id": "a",
  "id": "b",
  "id": "d",
  "id": "c",
  "id": "a"
}
```

Response Body Success

```json
{
  "message": "SUCCESS",
  "data": [
    {
      "question": "lorem ipsum",
      "choice": {
        "a": {
          "text": "lorem ",
          "answer": true
        },
        "b": {
          "text": "lorem ",
          "answer": false
        },
        "c": "lorem",
        "d": "ipsum"
      }
    },
    {
      "question": "lorem ipsum",
      "choice": {
        "a": {
          "text": "lorem ",
          "answer": true
        },
        "b": "lorem",
        "c": "ipsum",
        "d": "dolor"
      }
    }
  ]
}
```

Response Body Error

```json
{
  "errors": ["Somthing went wrong"]
}
```
