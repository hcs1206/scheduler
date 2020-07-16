function login() {
    var form = $('#loginForm');
    var method = form.attr('method');
    var url = form.attr('action');
    var data = form.serialize();

    res = callApi(method, url, data);
    if (res.result == 'fail') {
        alert(res.err);
        return;
    }

    if (res.result == 'success') {
        location.href = '/';
    }
}

function join() {
    var form = $('#joinForm');
    var method = form.attr('method');
    var url = form.attr('action');
    var data = form.serialize();

    res = callApi(method, url, data);
    if (res.result == 'fail') {
        alert(res.err);
        return;
    }

    if (res.result == 'success') {
        location.href = '/';
    }
}

function initCalendar() {
    $(document).ready(function() {
        var calendarEl = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarEl, {
            plugins: [ 'interaction', 'dayGrid' ],
            editable: false,
            eventLimit: true, // allow "more" link when too many events
            events: []
        });

        calendar.render();
    });
}

function getDate(strDate) {
    var date = new Date(strDate);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if(month < 10) month = '0' + month;
    var day = date.getDate();
    if(day < 10) day = '0' + day;

    return year + '-' + month + '-' + day;
}

function drawUserCalendar() {
    var res = callApi("get", "/events");
    res.data.map(row => {
        row.startDate = row.start;
        row.endDate = row.end;
    });
    $(document).ready(function() {
        var calendarEl = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarEl, {
            plugins: [ 'interaction', 'dayGrid' ],
            editable: false,
            eventLimit: true, // allow "more" link when too many events
            events: res.data,
            header: {
                center: 'addEventButton'
            },
            customButtons: {
                addEventButton: {
                    text: 'add event',
                    click: function() {
                        $('#addEventModal').modal();
                    }
                }
            },
            eventClick: function(info) {
                $('#eventForm #id').val(info.event.id);
                $('#eventForm #title').val(info.event.title);
                $('#eventForm #desc').val(info.event.extendedProps.desc);
                $('#eventForm #start').val(getDate(info.event.extendedProps.startDate));
                $('#eventForm #end').val(getDate(info.event.extendedProps.endDate));
                $('#eventModal').modal();
            }
        });

        calendar.render();
    });
}

function insertEvent() {
    var form = $('#addEventForm');
    var method = form.attr('method');
    var url = form.attr('action');
    var data = form.serialize();

    res = callApi(method, url, data);
    if (res.result == 'fail') {
        alert(res.err);
        return;
    }

    if (res.result == 'success') {
        location.href = '/';
    }
}

function updateEvent() {
    var form = $('#eventForm');
    var method = form.attr('method');
    var url = form.attr('action');
    var data = form.serialize();

    res = callApi(method, url, data);
    if (res.result == 'fail') {
        alert(res.err);
        return;
    }

    if (res.result == 'success') {
        location.href = '/';
    }
}

function deleteEvent() {
    var form = $('#eventForm');
    var data = form.serialize();

    res = callApi('delete', '/events', data);
    if (res.result == 'fail') {
        alert(res.err);
        return;
    }

    if (res.result == 'success') {
        location.href = '/';
    }
}

function callApi(method, url, data) {
    var res = '';
    $.ajax({
        type: method,
        url: url,
        data: data,
        async: false,
        success: function (result) {
            res = result;
        }
    });
    return res;
}