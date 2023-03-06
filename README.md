# Project Title : Project Management

## Project Description
Project Management is a personal SaaS I create for managing my own project. This web application contain all the things I need for the project management and I can improve it with time.

## Project Goals
- Creating a project management tools to manage project locally.
- Using an ORM I never used before (Prisma).
- Improving my skills on VueJS and Vercel Products.
- Designing the user interface
- Maintain and Update in long-term the web application

## Technologies Used
- HTML
- CSS
- JavaScript
- Vue
- NuxtJS
- Node
- Prisma

## Project Structure
```python
project-management/
│
├─ api # api routes
├─ assets/css # css
├─ components # vue components
├─ pages # pages 
├─ prisma # file for the ORM Prisma
├─ static # static files
```

## How to start the project
1. You need to install the dependencies using :
```
npm install
```
2. Then you need to initialize Prisma using :
```
npx prisma generate
npx prisma migrate dev
```
3. Then you can use the project using :
```
npm run dev
```

## Project Features
1. CRUD for projects
2. CRUD for groups
3. CRUD for tasks
4. Changing the state of the tasks

## Conclusion
This project is not finished and need multiple other features like :
1. Time starting and ending the task
2. Charts for the progression of the task
3. Automation

I built this software scaled on my own needs but I want to improve it a lot by adding lot of different features.
