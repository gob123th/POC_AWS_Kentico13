function realtimeValidation(e) {
    var form_group = $(this).closest(".form-group");
    var input_id = $(this).attr('id');
    if ($(this).attr('type') == "submit" || $(this).attr('id') == "g-recaptcha-response") {
        return;
    }
    if (e.type == 'blur') {
        $(this).val($(this).val().trim());
    }
    if ($(this).val().trim() == "" && e.type == 'blur') {
        DisplayShow(form_group.find('.err').get(0).id, input_id);
    }
    else if ($(this).val().trim() != "" && e.type == 'blur') {
        $(this).val($(this).val().replace(/^\s+/, ""));
        DisplayHide(form_group.find('.err').get(0).id, input_id);
    }
}
function realtimeValidationCheckbox(e) {
    var form_group = $(this).closest(".form-group");
    var checkbox_collection = form_group.find("input[type='checkbox']");
    var error_group_checkbox = form_group.find(".err:not([input-checkbox-group]");
    var error_input_checkbox = form_group.find(".err[input-checkbox-group]");
    var input_other_checkbox = form_group.find("input[type='text'][input-checkbox-group]");

    if (checkbox_collection.filter(":checked").length === 0) {

        DisplayShow(error_group_checkbox.attr("id"));
        DisplayHide(error_input_checkbox.attr("id"), input_other_checkbox.attr("id"));
        input_other_checkbox.val('');
    } else {
        DisplayHide(error_group_checkbox.attr("id"));

    }
    checkbox_collection.each(function () {

        var input_checkbox_group = $(this).attr("input-checkbox-group");
        if (typeof input_checkbox_group !== "undefined") {
            var input = form_group.find("input[type='text'][input-checkbox-group='" + input_checkbox_group + "']")
            var err = form_group.find(".err[input-checkbox-group='" + input_checkbox_group + "']")

            if ($(this).filter(":checked").length != 0) {
                if (input.val() === "") {
                    DisplayShow(err.attr("id"), input.attr("id"));
                } else {
                    if (/^[-@&()_+|:/,. ]*$/.test(input.val())) {
                        DisplayShow(err.attr("id"), input.attr("id"));
                    } else {
                        DisplayHide(err.attr("id"), input.attr("id"));
                    }
                }
            } else {
                DisplayHide(err.attr("id"), input.attr("id"));
                input.val("");
            }
        }
    });

}
function realtimeValidationCheckboxWithOther(e) {
    var form_group = $(this).closest(".form-group");
    var checkbox_others = form_group.find("input[type='checkbox'][input-checkbox-group]");
    var error_group_checkbox = form_group.find(".err:not([input-checkbox-group]");
    var input_other_checkbox = form_group.find("input[type='text'][input-checkbox-group], textarea[input-checkbox-group]");

    if (checkbox_others.is(":checked")) {
        if (input_other_checkbox.is(":hidden")) {
            input_other_checkbox.show().focus();
        } else {
            if (input_other_checkbox.val().trim() == "") {
                input_other_checkbox.addClass("ddl-danger");
                error_group_checkbox.fadeIn();
            } else {
                input_other_checkbox.removeClass("ddl-danger");
                error_group_checkbox.fadeOut();
            }
        }
    } else {
        input_other_checkbox.val("");
        input_other_checkbox.removeClass("err");
        input_other_checkbox.hide();
        var selector = "[name*=" + checkbox_others.attr("name") + "]:checked";
        if (checkCheckbox(selector) == "") {
            error_group_checkbox.fadeIn();
        } else {
            error_group_checkbox.fadeOut();
        }
    }
}
function realtimeValidationSelection(e) {
    var group = $(this).closest(".form-group");

    if ($(this).val() == 0) {
        DisplayShow(group.find('.err').attr('id'), group.find('.selection').attr('id'))
        group.find('.selection').addClass("danger");
    } else {
        DisplayHide(group.find('.err').attr('id'), group.find('.selection').attr('id'))
        group.find('.selection').removeClass("danger");
    }
}
function realtimeValidationMobile(err_req, err_fm) {
    return function (e) {
        var length = $(this).val().replace(/-/g, '').length;
        var valid = $(this).attr('valid');
        var id = $(this).attr('id');

        var err_require = err_req;
        var err_format = err_fm;

        if (!checkmobile($(this).val().replace(/-/g, ''))) {
            if (length <= 0) {
                if (e.type == "blur") {
                    DisplayHide(err_format, id);
                    DisplayShow(err_require, id);
                }
            } else {
                if (e.type == "blur") {
                    DisplayHide(err_require, id);
                    DisplayShow(err_format, id);
                }
            }
        } else {
            if (e.type == "blur") {
                txtresult_1 = true;
                DisplayHide(err_format, id);
                DisplayHide(err_require, id);
            }
        }
    }
}
function realtimeValidationPhone(err_req, err_fm) {
    return function (e) {
        var length = $(this).val().replace(/-/g, '').length;
        var valid = $(this).attr('valid');
        var id = $(this).attr('id');

        var err_require = err_req;
        var err_format = err_fm;

        if (!checktelephone($(this).val().replace(/-/g, ''))) {
            if (length <= 0) {
                debugger
                if (e.type == "blur") {
                    DisplayHide(err_format, id);
                    DisplayShow(err_require, id);
                }
            } else {
                if (e.type == "blur") {
                    DisplayHide(err_require, id);
                    DisplayShow(err_format, id);
                }
            }
        } else {
            txtresult_1 = true;
            DisplayHide(err_format, id);
            DisplayHide(err_require, id);
        }
    }
}
function realtimeValidationCitizen(err_req, err_fm) {
    return function (e) {
        var length = $(this).val().replace(/-/g, '').length;
        var valid = $(this).attr('valid');
        var id = $(this).attr('id');

        var err_require = err_req;
        var err_format = err_fm;

        if (!checkcitizen($(this).val().replace(/-/g, ''))) {
            if (length <= 0) {
                if (e.type == "blur") {
                    DisplayHide(err_format, id);
                    DisplayShow(err_require, id);
                }
            } else {
                if (e.type == "blur") {
                    DisplayHide(err_require, id);
                    DisplayShow(err_format, id);
                }
            }
        } else {
            if (e.type == "blur") {
                txtresult_1 = true;
                DisplayHide(err_format, id);
                DisplayHide(err_require, id);
            }
        }
    }
}
function realtimeValidationEmail(err_req, err_fm) {
    return function (e) {
        var result = checkEmail($(this).val());
        var err_require = err_req;
        var err_format = err_fm;
        if (result) {
            if (e.type == 'blur') {
                DisplayHide(err_require, $(this).attr("id"));
                DisplayHide(err_format, $(this).attr("id"));
            }
        } else {
            if (e.type == 'blur') {
                if ($(this).val() == '') {
                    DisplayHide(err_format, $(this).attr("id"));
                    if (err_require) {
                        DisplayShow(err_require, $(this).attr("id"));
                    }
                } else {
                    DisplayShow(err_format, $(this).attr("id"));
                    DisplayHide(err_require);
                }
            }
        }
    }
}
function realtimeValidationAccountNumber(err_req, err_fm) {
    return function (e) {
        var length = $(this).val().replace(/-/g, '').length;
        var id = $(this).attr('id');

        var err_require = err_req;
        var err_format = err_fm;

        if (length > 0 && length < 10) {
            if (e.type == "blur") {
                DisplayHide(err_require, id);
                DisplayShow(err_format, id);
            }
        } else if (length == 0) {
            if (e.type == "blur") {
                DisplayHide(err_format, id);
                DisplayShow(err_require, id);
            }
        }
        else if (length == 10) {
            if (e.type == "blur") {
                DisplayHide(err_format, id);
                DisplayHide(err_require, id);
            }
        }
    }
}
function DisplayShow(errid, inputid = null) {

    if (inputid) {
        $("#" + inputid).addClass("danger");
    }
    $("#" + errid).show();
}
function DisplayHide(param, inputid) {
    if (inputid) {
        $("#" + inputid).removeClass("danger");
    }
    $("#" + param).hide();
}
function ReplaceText(type) {
    return function (e) {
        var regular_ex;
        switch (type) {
            case "eng":
                regular_ex = /[^A-Za-z0-9@_/, .&|():+ -]/g;
                break;
            case "number":
                regular_ex = /[^0-9]/g;
                break;
            case "text_non_special":
                regular_ex = /[^¡-ùA-Za-z0-9 .()-]/g;
                break;
            case "eng_non_special":
                regular_ex = /[^A-Za-z0-9 .()-]/g;
                break;
            case "eng_non_number":
                regular_ex = /[^A-Za-z .()-]/g;
                break;
            case "money":
                regular_ex = /[^0-9-,.]/g;
                break;
            case "eng_special":
                regular_ex = /[^A-Za-z0-9 /.,:-]/g;
                break;
            case "email":
                regular_ex = /[^a-zA-Z0-9.@_-]+|\.[.]+/g;
                break;
            case "custom":
                regular_ex = new RegExp($(this).attr('regex'), 'g');
                break;
            default:
                regular_ex = /[<>&]/g;
                break;
        }
        if (e.type != "input" && e.type != "paste") {

            var elenment = $(this);
            var key = e.keyCode || e.which || e;
            var keychar = (e.keyCode || e.which) ? String.fromCharCode(key) : e
            var result = (type === 'money' && ($(this).val().match(/\./g) || []).length >= 1 && keychar === '.') ? false : !(regular_ex.test(keychar));
            return result;
        } else {
            // e.preventDefault();
            // var elenment = $(this);
            // const text = (e.originalEvent || e).clipboardData.getData('text/plain');
            // var pastedText = (type === "number" || type === "money") ? text.replace("-", "") : text;

            // var maxLength = elenment.attr('maxlength');
            // var newLength = pastedText.length + elenment.val().length;

            // setTimeout(function () {
            //   // var filteredText = elenment.val() + pastedText.replace(regular_ex, '');
            //   var filteredText = pastedText.replace(regular_ex, '');
            //   if (newLength > maxLength) {
            //     var trimmedText = elenment.val() + filteredText.substring(0, maxLength);
            //     var newText = trimmedText;
            //     elenment.val(newText.trim());
            //   } else {
            //     return;
            //     //elenment.val(filteredText.trim());
            //   }
            // });
            var $input = $(this);
            var trimmedValue = $input.val().substring(0, $input.attr('maxlength'));

            $input.val(trimmedValue.replace(regular_ex, ''));
        }
    };
}
function Format_CidNumber(e) {
    inputval = $(this).val().replace('-', '');
    var string = inputval.replace(/[^0-9]/g, "");
    var pos1 = string.substring(0, 1);
    var pos2 = string.substring(1, 5);
    var pos3 = string.substring(5, 10);
    var pos4 = string.substring(10, 12);
    var pos5 = string.substring(12, 13);
    var dat = '-';
    var string = (pos1 + ((pos1.length === 1) ? "-" : '')
        + pos2 + ((pos2.length === 4) ? "-" : '')
        + pos3 + ((pos3.length === 5) ? "-" : '')
        + pos4 + ((pos4.length === 2) ? "-" : '') + pos5);

    $(this).val(string);
}
function Format_PassportNumber(e) {
    inputval = $(this).val();

    var letters = inputval.replace(/[^A-Za-z]/g, '').substring(0, 2);
    var digits = inputval.replace(/[^0-9]/g, '').substring(0, 6);

    $(this).val(letters + "-" + digits);
}
function checkmobile(mobile) {
    if ((mobile.substr(0, 2).replace(/-/g, '') == '06' || mobile.substr(0, 2).replace(/-/g, '') == '08' || mobile.substr(0, 2).replace(/-/g, '') == '09') && mobile.replace(/-/g, '').length == 10) {
        return true;
    } else {
        return false;
    }
}
function checktelephone(mobile) {
    if ((mobile.substr(0, 2).replace(/-/g, '') == '02' || mobile.substr(0, 2).replace(/-/g, '') == '03' || mobile.substr(0, 2).replace(/-/g, '') == '05') && mobile.replace(/-/g, '').length == 9) {
        return true;
    } else {
        return false;
    }
}
function Format_Mobile(e) {
    var phone = $(this).val().replace(/[^0-9]/g, "");
    $(this).val(phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"));
}
function Format_Telephone(e) {
    var phone = $(this).val().replace(/[^0-9]/g, "");
    $(this).val(phone.replace(/(\d{2})(\d{3})(\d{4})/, "$1-$2-$3"));
}
function checkcitizen(id) {
    var idNumber = id.replace(/[-]/g, '');
    for (i = 0, sum = 0; i < 12; i++) {
        sum += parseFloat(idNumber.charAt(i)) * (13 - i);
    }
    if ((11 - sum % 11) % 10 != parseFloat(idNumber.charAt(12))) {
        return false;
    }
    else {
        return true;
    }
}
function checkPassport(passportNumber) {
    return /^[A-PR-WY][1-9]\d\s?\d{4}[1-9]$/.test(passportNumber);
}
function checkCheckbox(id) {
    var result = "";
    $(id).each(function (e) {
        var comma = result.length === 0 ? "" : ",";
        result += comma + $(this).val();
    });
    return result;
}
function checkEmail(email) {
    var emailFilter = /^\s*[^@\s]+@[^@\s]+\.[a-zA-Z]{2,3}\s*$/;
    return emailFilter.test(email);
}
function addCommas(e, allowzero = false) {
    var replace = $(this).val().replace(/,/g, '');

    var nStr = '';
    if (/^0$/.test(replace)) {
        nStr = replace;
    } else {
        nStr = replace.replace(/^(-)?0+/, '$1').replace(/[^0-9-,.]/g, '');
    }
    if ($(this).val().indexOf('-') !== -1) {
        x0 = '-';
    } else {
        x0 = '';
    }
    nStr += '';
    x = nStr.trim().split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    x1 = x0 + x1.replace(/[-]/g, '');
    // Get the maxlength attribute value dynamically
    var maxLength = parseInt($(this).attr('maxlength'));

    // Calculate the total length considering commas
    var totalLengthWithCommas = x1.length + x2.length;

    // Check if the total length exceeds the maxlength
    if (totalLengthWithCommas > maxLength) {
        var allowedLengthX1 = maxLength - x2.length;
        x1 = x1.substr(0, allowedLengthX1 > 0 ? allowedLengthX1 : 0);
    }
    if (e.type == 'blur' && x2 == '.') {
        x2 = '';
    }
    if (e.type == 'blur' && x1 == '' && x2.replace(/[.]/g, '') > 0) {
        x1 = '0';
    }
    $(this).val(x1 + x2.substr(0, 3).replace(/[-]/g, ''));
}
function addCommas_v2(errMoney) {
    return function (e) {
        var form_group = $(this).closest(".form-group");
        $(this).attr('valid', '');
        DisplayHide(form_group.find('.err').get(0).id, $(this).attr('id'));

        var sanitizedValue = $(this).val().replace(/[^\d.-]/g, '');
        if (sanitizedValue.indexOf('-') !== -1) {
            x0 = '-';
        } else {
            x0 = '';
        }
        // Remove ".00" if the input field is focused
        if (e.type === 'focus') {
            sanitizedValue = sanitizedValue.replace(".00", "");
        }

        // If the input consists of only '-', set the value to empty string
        if (sanitizedValue === '-' && e.type !== 'blur') {
            x0 = '-';
            sanitizedValue = sanitizedValue.replace(/[-]/g, '');
        }

        // Handle the keypress event separately to allow entering '-'
        if (e.type === 'keypress') {
            // Allow entering '-' only if the cursor is at the beginning of the input
            if (this.selectionStart !== 0 || sanitizedValue.includes('-')) {
                e.preventDefault();
                return;
            }
        }

        // Split the sanitized value into integer and decimal parts
        var parts = sanitizedValue.split(".");

        // If the event type is 'blur' and the input is empty, set it to ".00"
        if (e.type === 'blur' && $(this).val() === "") {
            if (typeof errMoney != "undefined") {
                $(this).val('');
                var form_group = $(this).closest(".form-group");
                DisplayShow(form_group.find('.err').get(0).id, $(this).attr('id'));
                return;
            }
            return;
        }

        // If the event type is 'blur' and the integer part is '0' and the decimal part is not '0', set integer part to '0'
        if (e.type === 'blur' && ((parseInt(parts[0]) === 0 && parts[0].length > 1) || parts[0] === '-') && (parts[1] !== '0' || parts[1] !== '00') && /[^0]/.test($(this).val())) {
            parts[0] = '0';
        } else {
            if (isNaN(parseInt(parts[0])) && parts[0] !== '-') {
                parts[0] = '';
            } else {
                parts[0] = parseInt(parts[0].toString().replace(/[-]/g, ''));
            }
        }

        if (isNaN(parts[0])) {
            parts[0] = '0';
        }

        parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (parts[1] != null) {
            parts[1] = parts[1].toString().replace(/[-]/g, '');
        }

        // If the event type is 'blur' and the decimal part is null or '0', append ".00"
        if (e.type === 'blur' && (parts[1] == null || parts[1] === '0' || parts[1] === '')) {
            if (parts[0] === '0' || parts[0] === '') {
                parts[0] = '0';
            }
            parts[1] = '00';
        } else if (e.type === 'blur' && parts[1] != null && parts[1].length > 2) {
            // If the decimal part has more than two digits, truncate it to two digits
            parts[1] = parts[1].substring(0, 2);
        } else if (e.type === 'blur' && parts[1] != null && parts[1].length === 1) {
            // Pad the decimal part with zeros to ensure it has two digits
            parts[1] = parts[1].padEnd(2, '0');
        }

        // If only a period is entered without any decimal digits, append ".00"
        if (e.type === 'blur' && $(this).val().endsWith('.') && (parts[1] === undefined || parts[1] == '')) {
            parts[1] = '00';
        }

        if (e.type === 'blur' && parts[0] == '0' && parts[1] == '00') {
            x0 = '';
            if (typeof errMoney != "undefined") {
                $(this).val('');
                var form_group = $(this).closest(".form-group");
                $(this).attr('valid', 'true');
                DisplayShow(form_group.find('.err').get(0).id, $(this).attr('id'));
                return;
            }
        } else if (e.type === 'blur' && parts[1] != '00' && parts[0] == '') {
            parts[0] = '0';
        }
        if (e.type === 'blur' && $(this).attr('valid') == 'true') {
            $(this).val('');
            var form_group = $(this).closest(".form-group");
            DisplayShow(form_group.find('.err').get(0).id, $(this).attr('id'));
            return;
        }
        parts[0] = x0 + parts[0];
        // Join the integer and decimal parts
        $(this).val(parts.join("."));

        // If the input already contains a period, prevent further periods from being entered
        if ($(this).val().split(".").length > 2) {
            $(this).val($(this).val().replace(/\.(?=.*\.)/g, ''));
        }

    }
}
var bayUploadFile = function (e) {
    function enableElements(e) {
        $.each(e.fileUploaderDisabledElements, function (index, value) {
            $(e.elements[value]).prop('disabled', false);
        });
    }
    return {
        attachScript: function (i) {
            var $inputID = $('#' + i.fileInputId),
                $placeHolderID = $('#' + i.fileInputId + '-placeholder'),
                $replaceID = $('#' + i.fileInputId + '-replacement'),
                $DeleteBtnID = $('#' + i.fileInputId + '-button'),
                $FileIcon = $('#' + i.fileInputId + '-icon'),
                $UploadBtnID = $('#' + i.fileInputId + '-upload-button'),
                $TempFileInputID = $('#' + i.tempFileIdentifierInputId),
                $SystemFileNameID = $('#' + i.systemFileNameInputId),
                $OriginFileNameID = $('#' + i.originalFileNameInputId),
                $DeletePersisID = $('#' + i.deletePersistentFileInputId),
                $maxsizeErrorMessage = i.maxFileSizeExceededErrorMessage,
                $invalidFileTypeMessage = i.invalidFileTypeMessage,
                $fileTypeProp = i.fileTypeProp,
                $ErrID = $('#' + i.fileInputId + '-err'),
                d = i.tempFileOriginalName,
                p = i.deleteFileIconButtonTitle;

            $placeHolderID.data('originalText', $placeHolderID.text());
            $DeleteBtnID.data('originalText', $DeleteBtnID.html());

            if ($OriginFileNameID.val() || d && $DeletePersisID.val().toUpperCase() === "FALSE") {
                $placeHolderID.val(i.originalFileNamePlain || d);
                $placeHolderID.attr('disabled', 'disabled')
                $DeleteBtnID.show();
                $UploadBtnID.hide();
                $FileIcon.attr('data-icon', 'remove').attr('title', p);
                $replaceID.show();
                $inputID.hide();
            }

            function deleteFile() {
                if ($TempFileInputID.val()) {
                    $.ajax({
                        url: i.deleteEndpoint + "&tempFileIdentifier=" + $TempFileInputID.val(),
                        type: 'POST',
                        success: function (response) {
                            $TempFileInputID.val('');
                        },
                        error: function (xhr, status, error) {
                            console.error("Error deleting the file: " + error);
                        }
                    });
                }
            }

            function handleFileUpload() {
                if ($SystemFileNameID.val()) {
                    $DeletePersisID.val(true);
                }
                deleteFile();

                $inputID.val(null).show();
                $replaceID.hide();
                $DeleteBtnID.hide();
                $UploadBtnID.show();
                $placeHolderID.val('');
                $FileIcon.data('icon', 'select').removeAttr('title');
            }

            $DeleteBtnID.on('click', handleFileUpload);
            $FileIcon.on('click', function (e) {
                if ($FileIcon.data('icon') === 'remove') {
                    e.preventDefault();
                    handleFileUpload();
                }
            });

            $inputID.on('change', function () {
                var FileTypeProp = $fileTypeProp; // e.g., 'pdf;png;jpg'
                var plainOriginalFileName = $inputID[0].files[0].name; // e.g., 'file.png'
                var fileExtension = plainOriginalFileName.split('.').pop().toLowerCase();
                var allowedExtensions = FileTypeProp.split(';').map(function (ext) { return ext.toLowerCase(); });

                if ($inputID.val()) {
                    if (!allowedExtensions.includes(fileExtension)) {
                        $inputID.val(null);
                        $TempFileInputID.val('');
                        $OriginFileNameID.val('');
                        $ErrID.html($invalidFileTypeMessage);
                        $FileIcon.data('icon', 'select');
                        $placeHolderID.addClass('danger');
                        $ErrID.show();
                        return;
                    }

                    var $DeletePersisIDorm = $inputID.closest('form');
                    $DeletePersisIDorm.find('input, button, select').prop('disabled', true);

                    var file = $inputID[0].files[0];
                    if (file && file.size > 1024 * i.maxFileSize) {
                        $inputID.val(null);
                        $TempFileInputID.val('');
                        $OriginFileNameID.val('');
                        $ErrID.html($maxsizeErrorMessage);
                        $ErrID.show();
                        $placeHolderID.addClass('danger');
                        $FileIcon.data('icon', 'select');
                        $DeletePersisIDorm.find('input, button, select').prop('disabled', false);
                        return;
                    }
                    $DeleteBtnID.show();
                    $FileIcon.attr('data-icon', 'loading');
                    var formData = new FormData();
                    formData.append('file', file);

                    $.ajax({
                        url: i.submitEndpoint,
                        type: 'POST',
                        data: formData,
                        contentType: false,
                        processData: false,
                        dataType: 'json',
                        xhr: function () {
                            var xhr = $.ajaxSettings.xhr();
                            if (xhr.upload) {
                                xhr.upload.addEventListener('progress', function (e) {
                                    if (e.lengthComputable) {
                                        $DeleteBtnID.text(Math.round((e.loaded / e.total) * 100) + '%');
                                    }
                                }, false);
                            }
                            return xhr;
                        },
                        success: function (response) {
                            if (response.errorMessage) {
                                $inputID.val(null);
                                alert(response.errorMessage);
                                $FileIcon.data('icon', 'select');
                                $DeleteBtnID.hide();
                            } else {
                                $SystemFileNameID.val() && $DeletePersisID.val(true);
                                deleteFile();
                                var fileName = $inputID[0].files[0].name;
                                $TempFileInputID.val(response.fileIdentifier);
                                $placeHolderID.val(fileName);
                                $DeleteBtnID.show();
                                $UploadBtnID.hide();
                                $FileIcon.attr('data-icon', 'remove').attr('title', p);
                                $replaceID.text(fileName).show();
                                $ErrID.hide();
                                $inputID.hide();
                            }
                        },
                        error: function (xhr) {
                            alert('Error sending file: ' + xhr.statusText);
                            $FileIcon.data('icon', 'select');
                            $DeleteBtnID.hide();
                        },
                        complete: function () {
                            $DeleteBtnID.html($DeleteBtnID.data('originalText'));
                            $DeletePersisIDorm.find('input, button, select').prop('disabled', false);
                            $placeHolderID.attr('disabled', 'disabled').removeClass('danger');
                        }
                    });
                }
            });
        }
    };
}(document);