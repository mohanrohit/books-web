function ReadingListApp()
{
    var self = this;

    self.app = null;

    self.initialize = function()
    {
        self.app = new Vue({
            el: "#app",
            data: {
                message: "Howdy!"
            }
        });
    }

    self.initialize();
}
