const isJson = function (str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

const getInfo = params => {
    $.ajax({
        url: '//tools.corecommerce.com.br:8000/layer',
        type: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            store: params.tenant,
            method: params.method,
            id: $.trim(params.id)
        })
    }).done(response => {
        let properties = [];
        for (var [key, value] of Object.entries(response)) {
            if (typeof (value) == 'object') {
                if (value == null) {
                    value += '';
                } else if (value.length == 0) {
                    value = '[]';
                } else if (isJson(JSON.stringify(value))) {
                    value = `<pre>${JSON.stringify(value)}</pre>`;
                }
            }
            properties.push({
                key,
                value
            })
        }
        var source = $("#template-data-table").html();
        var template = Handlebars.compile(source);
        var html = template({
            properties,
            response: JSON.stringify(response)
        });

        $('#content .result').html(html);
        $('#content #json-output').html(JSON.stringify(response));

        $('pre').each(function (k, i) {
            var parent = $(this).closest('.pre'),
                idx = parent.data('idx');
            try {
                JsonView.renderJSON(JSON.parse($(this).text()), $(`div[data-idx="${idx}"]`)[0]);
            } catch (e) { }
        });

        const tree = JsonView.renderJSON(JSON.parse($('.json .pre').html()), $(`.json div`)[0]);
        JsonView.expandChildren(tree);
    }).fail(response => {
        $('#content .result').html(`<div class="alert alert-danger" role="alert">${response.responseJSON.message}</div>`);
    });
};

const copyToClipboard = (el) => {
    var copyText = document.getElementById(el);
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert('JSON copiado para área de transferência!');
};

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});

$(function () {
    $('.bar-mobile').on('click', () => {
        $('body').toggleClass('menu-opened');
    });

    $('.change-format').on('click', () => {
        $('body').toggleClass('show-json')
    });

    $('.copy-json').on('click', () => {
        copyToClipboard('json-output');
    });
});