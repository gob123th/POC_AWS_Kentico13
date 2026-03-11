function registerInlineEditor(editorId, elenment) {
    if (!window.kentico.pageBuilder.inlineEditors) {
        window.kentico.pageBuilder.inlineEditors = {};
    }

    if (!window.kentico.pageBuilder.inlineEditors[editorId]) {
        window.kentico.pageBuilder.registerInlineEditor(editorId, {
            init: function (options) {
                var $editor = $(options.editor);
                var $element = $editor.find(`#${elenment.elementId}`);

                if ($element.length) {
                    // Handle different types of elements
                    if (elenment.type === "checkbox") {
                        $element.on("click", function () {
                            var isChecked = $(this).is(":checked");

                            var event = new CustomEvent("updateProperty", {
                                detail: {
                                    value: isChecked,
                                    name: options.propertyName
                                }
                            });

                            $editor[0].dispatchEvent(event);
                        });
                    } else if (elenment.type === "input" || elenment.type === "textarea") {
                        $element.on("contentChanged", function () {
                            var event = new CustomEvent("updateProperty", {
                                detail: {
                                    value: $(this).attr("temp"),
                                    name: options.propertyName
                                }
                            });
                            $editor[0].dispatchEvent(event);
                        });

                    } else if (elenment.type === "button") {
                        $element.on("click", function () {
                            var event = new CustomEvent("updateProperty", {
                                detail: {
                                    value: $(elenment.value).val(),
                                    name: options.propertyName
                                }
                            });
                            $editor[0].dispatchEvent(event);
                        });
                    }
                } else {
                    console.error(`Element with id ${elenment.elementId} not found!`);
                }
            }
        });

        // Mark the editor as registered
        window.kentico.pageBuilder.inlineEditors[editorId] = true;
    }
}
function applyChanges(clientId) {
    var editor = $("#" + clientId + "_editor").data("editorInstance");
    var newContent = editor.getValue();

    $('#' + clientId + '_contentDisplay')
        .attr('temp', newContent) // Add temp attribute with the content value
        .show()
        .trigger('contentChanged');
    // Remove the editor container after applying the changes
    //$("#" + clientId + "_editorContainer").remove();


}

function editMode(clientId,mode = "htmlmixed") {
    // Remove any existing editor container
    $("#" + clientId + "_editorContainer").remove();
   
    // Create a new editor container dynamically
    var editorHtml = `
            <div id="${clientId}_editorContainer" class="editor-container">
                <textarea id="${clientId}_editor"></textarea>
                <div class="row" style="    text-align: center;
                        background: #2B3E50;
                        margin: 0px !important;
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        align-items: center;
                        justify-content: center;padding: 10px 60px;">
                <div class="" style="text-align:center;margin 0 auto;padding: 10px;">
                    <input type="button" class="btn btn-primary" onclick="applyChanges('${clientId}')" value="Apply"/>
                </div>
                <div class=""  style="text-align:center;margin 0 auto;">
                    <input type="button" class="btn" onclick="cancelEditor('${clientId}')" value="Cancel" />
                </div>
                    <button id="${clientId}_autoFormatRange" class="autoFormatRange-btn" onclick="autoFormatCode('${clientId}')">
                       <i class="fa-solid fa-align-left"></i>
                    </button>
                    <button id="${clientId}_fullscreenToggle" class="fullscreen-btn" onclick="FullScreenShow('${clientId}')">
                        <i class="fa-solid fa-expand"></i> 
                    </button>
                     <button id="${clientId}_autoFormatRange" class="autoFormatRange-full-btn" onclick="autoFormatCode('${clientId}')">
                       <i class="fa-solid fa-align-left"></i>
                    </button>
                    <button id="${clientId}_exitFullscreen" class="exit-fullscreen-btn" style="display: none;" onclick="ExitFullScreen('${clientId}')">
                        <i class="fa-solid fa-compress"></i>
                    </button>
                </div>
            </div>
        `;

    // Append the editor container after the content display
    $("#" + clientId + "_contentDisplay").after(editorHtml);

    var editor = CodeMirror.fromTextArea(document.getElementById(clientId + "_editor"), {
        mode: mode,  // Supports HTML + CSS + JS syntax highlighting
        theme: "lucario",   // Dark theme
        lineNumbers: true,
        indentUnit: 4,
        tabSize: 4,
        lineWrapping: true,
        lint: false,
    });
    editor.setOption("extraKeys", {
        "F11": function (cm) {
            cm.setOption("fullScreen", !cm.getOption("fullScreen"));
        },
        "Esc": function (cm) {
            if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
        }
    });
    var totalLines = editor.lineCount();
    editor.autoFormatRange({ line: 0, ch: 0 }, { line: totalLines });
    // Hide the content and show the editor container
    $("#" + clientId + "_contentDisplay").hide();
    $("#" + clientId + "_editorContainer").show();

    
    // Set the editor content to the current HTML content of the content display area
    var currentContent = $("#" + clientId + "_contentDisplay").attr('temp') || '';
    editor.setValue(currentContent);

    // Store the editor instance for future reference
    $("#" + clientId + "_editor").data("editorInstance", editor);
}
function autoFormatCode(clientId) {
    var editor = $("#" + clientId + "_editor").data("editorInstance");
    var totalLines = editor.lineCount();
    editor.autoFormatRange({ line: 0, ch: 0 }, { line: totalLines });
}
function FullScreenShow(clientId) {
    var editor = $("#" + clientId + "_editor").data("editorInstance");
    if (editor) {
        editor.setOption("fullScreen", true); // Enter fullscreen mode
        $("#" + clientId + "_exitFullscreen").show(); // Show Exit Fullscreen button
        $("#" + clientId + "_fullscreenToggle").hide(); // Hide Fullscreen button
    }
}

// Exit fullscreen function
function ExitFullScreen(clientId) {
    var editor = $("#" + clientId + "_editor").data("editorInstance");
    if (editor) {
        editor.setOption("fullScreen", false); // Exit fullscreen mode
        $("#" + clientId + "_exitFullscreen").hide(); // Hide Exit Fullscreen button
        $("#" + clientId + "_fullscreenToggle").show(); // Show Fullscreen button
    }
}
function cancelEditor(clientId) {
    //// Remove the editor container on cancel
    $("#" + clientId + "_editorContainer").hide();
    $("#" + clientId + "_contentDisplay").show();
 
}

function copyToClipboard(element) {
    var textToCopy = $(element).text().trim();

    var tempTextArea = document.createElement("textarea");
    tempTextArea.value = textToCopy;
    document.body.appendChild(tempTextArea);

    tempTextArea.select();
    tempTextArea.setSelectionRange(0, 99999);

    try {
        var successful = document.execCommand('copy');
        if (successful) {
            $(element).addClass("copied");
            setTimeout(() => $(element).removeClass("copied"), 1000);

            $('#m_c_plcMess_alSuccess').removeClass('hidden').fadeIn();;
            $('#m_c_plcMess_alSuccess_lbl').html("Copied: " + textToCopy);

            setTimeout(function () {
                $('#m_c_plcMess_alSuccess').addClass('hidden');
                $('#m_c_plcMess_alSuccess_lbl').html('');
            }, 3000);

        } else {
            $('#errorAlert').text("Failed to copy text").fadeIn();
        }
    } catch (err) {
        $('#errorAlert').text("Failed to copy text: ", err).fadeIn();

    }

    document.body.removeChild(tempTextArea);
}