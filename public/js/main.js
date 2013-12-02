(function () {

    window.onload = function() {
        console.log('loaded');
        var game = new Towerspell();

        var btnEndless = document.getElementById('startEndless');
        var btnFullBoard = document.getElementById('startFull');

        $(btnEndless).click(function (evt) {
            $('.menu-parent').hide();
            game.start(true);
            return false;
        });

        $(btnFullBoard).click(function (evt) {
            $('.menu-parent').hide();
            game.start(false);
            return false;
        });
    };

})();