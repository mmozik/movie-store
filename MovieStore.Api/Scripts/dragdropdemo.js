if (window.reactdemo != undefined)
{
    (function (dragdrop, $, undefined) {
        function setDragDropEvents() {
            $("body").on("dragover", function (event) {
                var dropId = $(event.target).attr("Id");
                if (dropId != "fileDropTarget" && dropId != "fileDropTargetSpan") {
                    event.preventDefault();
                    return false;
                }
            });

            $("body").on("drop", function (event) {
                var dropId = $(event.target).attr("Id");
                if (dropId != "fileDropTarget" && dropId != "fileDropTargetSpan") {
                    event.preventDefault();
                    return false;
                }
            });

            $("#fileDropTarget").on("dragover dragenter", function (event) {
                $(event.target).addClass("dragHiLight");
                event.preventDefault();
            });

            $("#fileDropTarget").on("dragleave", function (event) {
                $(event.target).removeClass("dragHiLight");
            });

            $("#fileDropTarget").on("drop", fileDropped);
            //ecos.common.validationEx.onForm("#registerForm");
        }

        function fileDropped(event) {
            event.preventDefault();

            $(event.target).removeClass("dragHiLight");

            var dropId = $(event.target).attr("Id");
            if (dropId != "fileDropTarget" && dropId != "fileDropTargetSpan") return false;

            var fileList = event.originalEvent.dataTransfer.files;

            if (fileList && fileList.length > 0) {

                var form_data = new FormData();

                for (var c = 0; c < fileList.length; c++)
                    form_data.append('files', fileList[c]);

                $.ajax(
                    {
                        type: "POST",
                        method: "POST",
                        cache: false,
                        contentType: false,
                        processData: false,
                        url: dragdrop.BaseUrl + 'Home/HandleUpload',
                        data: form_data,
                        success: function (data)
                        {
                            if(data.msg) alert(data.msg);
                        }
                    }
                );
            }
        }

        dragdrop.init = function () {
            setDragDropEvents();
        };

    }(window.reactdemo.dragdrop = window.reactdemo.dragdrop || {}, jQuery));
}