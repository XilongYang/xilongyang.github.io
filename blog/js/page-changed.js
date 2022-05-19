function PageChanged(e) {
    var page_input = e.target;

    var is_number = /^[0-9]+$/.test(page_input.value);

    var number = parseInt(page_input.value);
    var out_of_range = number < page_input.min || number > page_input.max;

    if (!is_number || out_of_range ) {
        page_input.value = page_input.defaultValue;
        return;
    }

    if (number == 1) {
        document.location.href = "/blog";
    } else {
        document.location.href = "/blog/page/" + number;
    }
}
