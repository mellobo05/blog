# TaskMaster Pro

A modern web application featuring a Todo Manager and a Blog Posting system built with pure HTML, CSS, and JavaScript.

## Live Demo

Visit [https://mellobo05.github.io/blog](https://mellobo05.github.io/blog)

## Features

### Todo Manager
- **Add Tasks**: Create new tasks with title, priority level, and due date
- **Mark as Complete**: Toggle tasks between completed and pending states
- **Delete Tasks**: Remove tasks you no longer need
- **Filter Options**: View all tasks, only pending tasks, or only completed tasks
- **Priority Levels**: Set tasks as low, medium, or high priority
- **Due Dates**: Set and track task deadlines
- **Local Storage**: All tasks persist between browser sessions

### Blog System
- **Create Posts**: Write and publish blog posts with title and content
- **Tag System**: Add tags to categorize your posts
- **Search**: Filter posts by title or tag
- **Full Post View**: Click on a post to view its complete content
- **Edit & Delete**: Modify or remove your existing posts
- **Local Storage**: Blog posts are saved between sessions

## Technologies Used

- **HTML5**: Semantic markup for structure
- **CSS3**: Styling with flexbox for responsive design
- **JavaScript (ES6+)**: Core functionality and DOM manipulation
- **Bootstrap 5**: Frontend framework for responsive layout and components
- **Font Awesome 6**: Icon library
- **LocalStorage API**: Client-side data persistence

## Project Structure

```
todo-blog-frontend/
├── index.html           # Todo Manager page
├── blog.html            # Blog Posting page
├── css/
│   └── styles.css       # Custom styles
└── js/
    ├── todo.js          # Todo Manager functionality
    └── blog.js          # Blog system functionality
```

## How to Run Locally

1. Clone the repository:
   ```
   git clone https://github.com/mellobo05/blog.git
   ```

2. Navigate to the project folder:
   ```
   cd blog
   ```

3. Open in a web browser:
   - Open `todo-blog-frontend/index.html` for the Todo Manager
   - Open `todo-blog-frontend/blog.html` for the Blog System

Alternatively, use a local development server like Live Server extension for VS Code.

## Future Enhancements

- Add dark/light theme toggle
- Implement task categories
- Add markdown support for blog posts
- Implement user authentication
- Add data export/import functionality

## License

MIT License © mellobo05
