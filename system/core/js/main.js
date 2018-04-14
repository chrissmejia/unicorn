jQuery(function ($) {
    // target elements with the "draggable" class
    interact('.app')
        .draggable({
            // enable inertial throwing
            inertia: true,
            // keep the element within the area of it's parent
            restrict: {
                restriction: "parent",
                endOnly: true,
                elementRect: {
                    top: 0,
                    left: 0,
                    bottom: 1,
                    right: 1
                }
            },
            // enable autoScroll
            autoScroll: true,

            // call this function on every dragmove event
            onmove: dragMoveListener,
            // call this function on every dragend event
            onend: function (event) {
                var target = event.target,
                    dragX = parseInt(target.dataset.x, 10) || 0,
                    dragY = parseInt(target.dataset.y, 10) || 0,
                    offsetX = parseInt(target.style.left) || 0,
                    offsetY = parseInt(target.style.top) || 0,
                    y = offsetY + dragY,
                    navOffset = $("header").outerHeight(),
                    serviceOffset = $("footer").outerHeight(),
                    desktopHeight = $("#desktop").height(),
                    appHeight = $("#" + target.id).outerHeight();

                function moveDown() {
                    y = y + 2;
                    target.style.top = y + 'px';
                    if (y < navOffset) {
                        setTimeout(function () {
                            moveDown()
                        }, 1);
                    } else {
                        target.style.top = navOffset + 'px';
                    }
                }

                function moveUp() {
                    y = y - 3;
                    target.style.top = y + 'px';
                    if (y > desktopHeight - (serviceOffset + appHeight)) {
                        setTimeout(function () {
                            moveUp()
                        }, 1);
                    } else {
                        target.style.top = desktopHeight - (serviceOffset + appHeight) + 'px';
                    }
                }

                target.dataset.x = 0;
                target.dataset.y = 0;
                target.style.transform = '';

                if (y < navOffset) {
                    moveDown();
                } else if (y > (desktopHeight - (serviceOffset + appHeight))) {
                    moveUp();
                } else {
                    target.style.top = y + 'px';
                }

                target.style.left = offsetX + dragX + 'px';
            }
        });

    function dragMoveListener(event) {
        var target = event.target,
            // keep the dragged position in the data-x/data-y attributes
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        // translate the element
        target.style.webkitTransform =
            target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';

        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }

    // this is used later in the resizing and gesture demos
    window.dragMoveListener = dragMoveListener;

    $(".app").click(function () {
        $(".app").removeClass("active");
        $(this).addClass("active");
    });
}); // JQuery end