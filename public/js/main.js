(function () {

    function Board() {
        // 8 x 12
        // Draw board
        var board = document.getElementById('board');

        for (var ii = 0; ii < 96; ii++) {
            var div = document.createElement('div');
            div.className = 'cell';
            var span = document.createElement('span');
            span.appendChild(document.createTextNode('A'));
            div.appendChild(span);
            board.appendChild(div);
        }

        console.log('Board drawn');
    };

    window.onload = function() {
        console.log('loaded');

        var c = new Board();
    };

})();