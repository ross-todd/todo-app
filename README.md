# Todo List App

A simple, responsive Todo List web application built with **HTML**, **Bootstrap**, and **Node.js (Express)**. This app allows users to add, mark as complete, and delete tasks, with accessibility and mobile responsiveness in mind.

---

## Features

- Login and Register funstions
- Add new tasks  
- Mark tasks as complete  
- Delete tasks  
- Mobile-friendly layout  
- Accessible and responsive form and buttons  

---

## Tech Stack

- **Frontend**: HTML, CSS (Bootstrap 5)  
- **Backend**: Node.js, Express  
- **Templating**: EJS  
- **Database**: SQLite  

---

## Responsive Design

This app includes media queries to ensure it displays well on smaller screens:

```css
@media (max-width: 576px) {
  h1.display-2 {
    font-size: 2.5rem;
  }

  form.mb-4.d-flex {
    flex-direction: column;
  }

  form.mb-4.d-flex input {
    margin-bottom: 0.5rem;
    width: 100%;
  }

  form.mb-4.d-flex button {
    width: 100%;
  }
}


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ross-todd/todo-app.git
   cd todo-app

2. Install dependencies:
   npm install

3. Start the app:
   npm start

4. Open in your browser
   http://localhost:3000

5. Click on register and create username and password   

6. License
   This project is licensed under the MIT License.


