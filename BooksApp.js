function BooksApp()
{
    var self = this;

    self.app = null;

    self.initialize = function()
    {
        new Vue({
            el: "#books-app",
    
            data: {
                book: {title: ""},
                books: []
            },
    
            mounted: async function() {
                this.getBooks();
            },
    
            methods: {
                setTitle: function(event) {
                    this.book.title = event.target.value;
                },
    
                getBooks: async function() {
                    const response = await axios.get("http://localhost:8080/api/v1/books");

                    this.books.push.apply(this.books, response.data["books"]);
                },

                addBook: async function() {
                    this.books.push({title: this.book.title});

                    await axios.post("http://localhost:8080/api/v1/books", {title: this.book.title});
                }
            }
        });
    }

    self.initialize();
}
