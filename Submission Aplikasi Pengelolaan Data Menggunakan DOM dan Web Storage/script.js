document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    const todosContainer = document.getElementById("todos");
    const completedTodosContainer = document.getElementById("completed-todos");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      addBook();
    });
  

    loadBooks();


    function addBook() {
      const title = document.getElementById("title").value;
      const author = document.getElementById("author").value;
      const date = document.getElementById("date").value;
  
      if (!title || !author || !date) {
        alert("Semua field harus diisi");
        return;
      }
  
      const todoItem = createTodoItem(title, author, date);
      todosContainer.appendChild(todoItem);
  
      saveBook(title, author, date);


      form.reset();
    }
  
    function createTodoItem(title, author, date) {
      const todoItem = document.createElement("div");
      todoItem.classList.add("todo-item", "bg-white", "shadow");
  
      const todoInfo = document.createElement("div");
      todoInfo.classList.add("todo-info");
  
      const todoTitle = document.createElement("h3");
      todoTitle.textContent = title;
  
      const todoAuthor = document.createElement("p");
      todoAuthor.textContent = "Penulis: " + author;
  
      const todoDate = document.createElement("p");
      todoDate.textContent = "Tahun: " + date;
  
      todoInfo.appendChild(todoTitle);
      todoInfo.appendChild(todoAuthor);
      todoInfo.appendChild(todoDate);
  
      const todoActions = document.createElement("div");
      todoActions.classList.add("todo-actions");
  
      const completeButton = document.createElement("button");
      completeButton.textContent = "Selesai Dibaca";
      completeButton.addEventListener("click", function () {
        moveTodoToCompleted(todoItem);
      });
  
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Hapus";
      deleteButton.addEventListener("click", function () {
        deleteTodoItem(todoItem);
        removeBook(title, author, date);
      });
  
      todoActions.appendChild(completeButton);
      todoActions.appendChild(deleteButton);
  
      todoItem.appendChild(todoInfo);
      todoItem.appendChild(todoActions);
  
      return todoItem;
    }
  
    function moveTodoToCompleted(todoItem) {
      const completedTodoItem = todoItem.cloneNode(true);
      const completeButton = completedTodoItem.querySelector(".todo-actions button:first-child");
      completeButton.textContent = "Belum Selesai Dibaca";
      completeButton.addEventListener("click", function () {
        moveCompletedTodoToUncompleted(completedTodoItem);
        saveBookStatusChange(title, author, date, "completed");
      });
  
      const deleteButton = completedTodoItem.querySelector(".todo-actions button:last-child");
      deleteButton.addEventListener("click", function () {
        deleteTodoItem(completedTodoItem);
      });
  
      completedTodosContainer.appendChild(completedTodoItem);
      deleteTodoItem(todoItem);
    }
  
    function moveCompletedTodoToUncompleted(completedTodoItem) {
      const todoItem = completedTodoItem.cloneNode(true);
      const completeButton = todoItem.querySelector(".todo-actions button:first-child");
      completeButton.textContent = "Selesai Dibaca";
      completeButton.addEventListener("click", function () {
        moveTodoToCompleted(todoItem);
        saveBookStatusChange(title, author, date, "uncompleted");
      });
  
      const deleteButton = todoItem.querySelector(".todo-actions button:last-child");
      deleteButton.addEventListener("click", function () {
        deleteTodoItem(todoItem);
      });
  
      todosContainer.appendChild(todoItem);
      deleteTodoItem(completedTodoItem);
    }
  
    function deleteTodoItem(todoItem) {
      todoItem.remove();
    }

    function saveBook(title, author, date) {
        let books = getStoredBooks();
        books.push({ title, author, date, status: "uncompleted" });
        localStorage.setItem("books", JSON.stringify(books));
      }
    
      function saveBookStatusChange(title, author, date, status) {
        let books = getStoredBooks();
        const index = findBookIndex(books, title, author, date);
        if (index !== -1) {
          books[index].status = status;
          localStorage.setItem("books", JSON.stringify(books));
        }
      }
    
      function removeBook(title, author, date) {
        let books = getStoredBooks();
        const index = findBookIndex(books, title, author, date);
        if (index !== -1) {
          books.splice(index, 1);
          localStorage.setItem("books", JSON.stringify(books));
        }
      }
    
      function loadBooks() {
        let books = getStoredBooks();
        books.forEach((book) => {
          const todoItem = createTodoItem(book.title, book.author, book.date);
          if (book.status === "completed") {
            completedTodosContainer.appendChild(todoItem);
          } else {
            todosContainer.appendChild(todoItem);
          }
        });
      }
    
      function getStoredBooks() {
        return JSON.parse(localStorage.getItem("books")) || [];
      }
    
      function findBookIndex(books, title, author, date) {
        return books.findIndex((book) => book.title === title && book.author === author && book.date === date);
      }
  });
  


