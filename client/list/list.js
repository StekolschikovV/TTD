listHelper = {

    startId: 0,
    startBlock: '',
    timeWork: 0,
    tikWorkTemp: 0,
    tikWorkStatus: '',
    timeRest: 0,
    tikRestTemp: 0,
    allTagsUnique: [],
    pushArr: [],
    clickTagOld: '',

    start(id) {
        console.log('%c start: ' + id, 'background:green;color:#fff;padding:2px 10px 2px 5px')
    },

    getData() {
        console.log('%c getData', 'background:green;color:#fff;padding:2px 10px 2px 5px')

        listHelper.startBlock = $('.added-task-' + listHelper.startId);
        listHelper.timeWork = $(this.startBlock).find('.work-time-input').val()
        listHelper.timeRest = $(this.startBlock).find('.rest-time-input').val()
        listHelper.tikWorkTemp = listHelper.timeWork
    },
    clickBtnStart() {
        console.log('%c clickBtnStart', 'background:green;color:#fff;padding:2px 10px 2px 5px')

        if (listHelper.tikWorkStatus != 'paus' && listHelper.tikWorkStatus != 'start') {
            listHelper.tikWorkStatus = 'start'
            listHelper.getData()
            listHelper.startWork()
        } else
            listHelper.tikWorkStatus = 'start'
    },
    clickBtnStop() {
        console.log('%c clickBtnStop', 'background:green;color:#fff;padding:2px 10px 2px 5px')

        listHelper.tikWorkStatus = 'stop'
        $('.added-task-' + listHelper.startId).find('.rest .circle-spinner-left-def-top').show()
        $('.added-task-' + listHelper.startId).find('.rest .circle-spinner').css('transform', 'rotate(-' + 0 + 'deg)')
    },
    clickBtnPaus() {
        console.log('%c clickBtnPaus', 'background:green;color:#fff;padding:2px 10px 2px 5px')

        listHelper.tikWorkStatus = 'paus'
    },
    openAddedTask(id) {
        console.log('%c openAddedTask: ' + id, 'background:green;color:#fff;padding:2px 10px 2px 5px')

        if ($('.added-task-' + id).hasClass('dop')) {
            $('.added-task-' + id).toggleClass('dop')
        } else {
            listHelper.clickBtnStop()
            listHelper.startId = id;
            listHelper.getData()
            $('*').removeClass("dop");
            $('.added-task-' + id).addClass('dop')
        }
    },
    startWork() {
        console.log('%c startWork', 'background:green;color:#fff;padding:2px 10px 2px 5px')

        if (listHelper.timeWork > 0 && listHelper.timeWork < 99) {
            this.tikWorkTemp = this.timeWork * 60 // TODO: test data
            listHelper.tikWork()
        } else
            console.log('%c Привышение максимальных зачений! listHelper.timeWork: ' + listHelper.timeWork, 'margin-left: 50px;background:red;color:#fff;padding:2px 50px 2px 50px')
    },
    tikWork() {
        console.log('%c tikWork: ' + this.tikWorkTemp, 'background:green;color:#fff;padding:2px 10px 2px 5px')

        if (this.tikWorkTemp > 0 && listHelper.tikWorkStatus == 'start') {
            this.tikWorkTemp = --this.tikWorkTemp
            let oneG = 360 / (this.timeWork * 60)
            let nowG = oneG * this.tikWorkTemp
            $('.added-task-' + this.startId).find('.work .circle-spinner').show()
            $('.added-task-' + this.startId).find('.work .circle-spinner').css('transform', 'rotate(-' + nowG + 'deg)')
            if (nowG < 180) {
                $('.added-task-' + this.startId).find('.work .circle-spinner-right-hover').show()
                $('.added-task-' + this.startId).find('.work .circle-spinner-left-def-top').hide()
            } else {
                $('.added-task-' + listHelper.startId).find('.work .circle-spinner-left-def-top').show()
            }
            setTimeout(function () {
                listHelper.tikWork()
            }, 1000)
        } else if (listHelper.tikWorkStatus == 'paus') {
            setTimeout(function () {
                listHelper.tikWork()
            }, 1000)
        } else {
            S.addWorkedTime(parseInt(listHelper.timeWork))
            $('.added-task-' + this.startId).find('.work .circle-spinner-right-hover').hide()
            $('.added-task-' + this.startId).find('.work .circle-spinner').hide()
            if (this.tikWorkTemp == 0) {
                listHelper.tikRestTemp = listHelper.timeRest * 60
                // listHelper.tikRestTemp = 60
                listHelper.tikRest()
            }
        }
    },
    tikRest() {
        console.log('%c tikRest', 'background:green;color:#fff;padding:2px 10px 2px 5px')

        if (listHelper.tikRestTemp > 0 && listHelper.tikWorkStatus == 'start') {
            listHelper.tikRestTemp = --this.tikRestTemp
            let oneG = 360 / (listHelper.timeRest * 60)
            let nowG = oneG * listHelper.tikRestTemp
            $('.added-task-' + listHelper.startId).find('.rest .circle-spinner').show()
            $('.added-task-' + listHelper.startId).find('.rest .circle-spinner').css('transform', 'rotate(-' + nowG + 'deg)')
            if (nowG < 180) {
                $('.added-task-' + listHelper.startId).find('.rest .circle-spinner-right-hover').show()
                $('.added-task-' + listHelper.startId).find('.rest .circle-spinner-left-def-top').hide()
            } else {
                $('.added-task-' + listHelper.startId).find('.rest .circle-spinner-left-def-top').show()
            }
            setTimeout(function () {
                listHelper.tikRest()
            }, 1000)
        } else if (listHelper.tikWorkStatus == 'paus') {
            setTimeout(function () {
                listHelper.tikRest()
            }, 1000)
        } else {
            S.addBreakTime(parseInt(listHelper.timeRest))
            $('.added-task-' + this.startId).find('.rest .circle-spinner-right-hover').hide()
            $('.added-task-' + this.startId).find('.rest .circle-spinner').hide()
            listHelper.tikWorkStatus = 'stop'
            DBtasks.update(listHelper.startId, {$inc: {sessions: 1}})
            DBtasks.update(listHelper.startId, {$set: {worked: parseInt(DBtasks.findOne(listHelper.startId).worked) + parseInt(listHelper.timeWork)}})
            DBtasks.update(listHelper.startId, {$set: {rested: parseInt(DBtasks.findOne(listHelper.startId).rested) + parseInt(listHelper.timeRest)}})
        }
    },
    tag(val, id) {
        console.log('%c tag', 'background:green;color:#fff;padding:2px 10px 2px 5px')
        console.log('%c ' + id, 'background:yellow;color:#fff;padding:2px 50px')
        console.log('%c ' + val, 'background:yellow;color:#fff;padding:2px 50px')

        if (val.length > 1) {
            let res = val.split(",")
            let newRes = []
            for (let i = 0; i < res.length; i++) {
                let tempStr = res[i].trim()
                if (tempStr.length > 1) {
                    if (i > 0)
                        tempStr = ' ' + tempStr
                    newRes.push(tempStr)
                }
            }
            DBtasks.update(id, {$set: {tags: newRes}})
        }
    },
    clickOnTag(tagName, parentId) {
        console.log('%c clickOnTag:' + tagName, 'background:green;color:#fff;padding:2px 10px 2px 5px')

        if ($('.all-tags .tag-' + tagName.trim()).hasClass('selection')) {
            listHelper.clickTagOld = ''
            $('.all-tags a').removeClass('selection')
            DBtasks.update(parentId, {$set: {tagsIsFilter: !DBtasks.findOne(parentId).tagsIsFilter}})
        } else {
            listHelper.clickTagOld = tagName
            $('.all-tags a').removeClass('selection')
            $('.all-tags .tag-' + tagName.trim()).addClass('selection')
            DBtasks.update(parentId, {$set: {tagsIsFilter: !DBtasks.findOne(parentId).tagsIsFilter}})
        }
    },
    noSelection() {
        console.log('%c noSelection', 'background:green;color:#fff;padding:2px 10px 2px 5px')

        $('.all-tags .selection').click()
    },
    DND(e) {
        console.log('%c DND', 'background:green;color:#fff;padding:2px 10px 2px 5px')

        let id = $(e).data('id')
        let nextE = $(e).next()[0]
        let prevE = $(e).prev()[0]
        if (nextE != undefined) {
            let nextIdposition = $(nextE).data('idposition')
            DBtasks.update(id, {$set: {idPosition: nextIdposition + 1}})
        } else if (prevE != undefined) {
            let prevE = $(e).prev()[0]
            let prevIdposition = $(prevE).data('idposition')
            DBtasks.update(id, {$set: {idPosition: prevIdposition - 1}})
        }
    },
    sort(arr) {
        console.log('%c sort()', 'background:green;color:#fff;padding:2px 10px 2px 5px')

        function compare(a, b) {
            if (a.idPosition < b.idPosition)
                return 1;
            if (a.idPosition > b.idPosition)
                return -1;
            return 0;
        }

        arr.sort(compare);
        return arr
    },
    _isComplete(id) {
        console.log('%c _isComplete(id)', 'background:green;color:#fff;padding:2px 10px 2px 5px')

        if (DBtasks.findOne(id).complete == "") {
            return "checked"
        } else {
            return ""
        }
    },
    _isStar(id) {
        console.log('%c _isStar(id)', 'background:green;color:#fff;padding:2px 10px 2px 5px')

        if (DBtasks.findOne(id).star == "")
            return true
        else
            return false
    }

}

Template.list.rendered = function () {
    $("#added-tas-container").sortable({
        placeholder: "ui-state-highlight",
        stop: function (event, ui) {
            setTimeout(
                function () {
                    listHelper.DND(ui.item[0])
                }, 0
            )
        }
    });
    $("#added-tas-container").disableSelection();
}

Template.list.helpers({
    "getTasks": function () {
        if (listHelper.clickTagOld == '') {
            listHelper.pushArr = listHelper.sort(DBtasks.find({}).fetch())
            return listHelper.pushArr
        }
        else {
            let allArr = DBtasks.find({}).fetch()
            let showArr = []
            for (let i = 0; i < allArr.length; i++) {
                let needAdd = false
                for (let j = 0; j < allArr[i].tags.length; j++) {
                    if (allArr[i].tags[j].trim() == listHelper.clickTagOld.trim())
                        needAdd = true
                }
                if (needAdd == true)
                    showArr.push(allArr[i])
            }
            listHelper.pushArr = listHelper.sort(showArr)
            return listHelper.pushArr
        }
    },
    "tags": function () {
        return DBtasks.findOne(this._id).tags
    },
    "allTags": function () {
        let allTags = DBtasks.find({}).fetch()
        let allTagsUnique = []
        let allTagsUniqueClear = []
        listHelper.allTagsUnique = []
        for (let i = 0; i < allTags.length; i++)
            for (let j = 0; j < allTags[i].tags.length; j++) {
                if (jQuery.inArray(allTags[i].tags[j].trim(), allTagsUniqueClear) == -1) {
                    allTagsUniqueClear.push(allTags[i].tags[j].trim())
                    allTagsUnique.push(` <a href="#" class="tag-${allTags[i].tags[j].trim()}" onclick="listHelper.clickOnTag( '${allTags[i].tags[j]}', '${allTags[i]._id}' )">${allTags[i].tags[j].trim()}</a>`.trim())
                }
            }

        listHelper.allTagsUnique = $.unique(allTagsUniqueClear)
        let str = allTagsUnique.toString()
        return str.replace(/\,</g, '<')
    }
})

Template.list.events({
    "click .add-new-task-btn": function () {
        let val = $(".add-new-task-input").val()
        DBtasks.insert({
            "idPosition": Math.round(new Date().getTime() / 1000),
            "title": val,
            "complete": "",
            "star": false,
            "date": '' + new Date().getDay() + '.' + new Date().getMonth() + '.' + new Date().getFullYear(),
            "sessions": 0,
            "worked": 0,
            "rested": 0,
            "tags": [],
            "tagsIsFilter": "false",
            "note": ""
        })
        $(".add-new-task-input").val('')
        listHelper.noSelection()
    },
    "click .added-task-remove-btn": function () {
        DBtasks.remove(this._id)
    },
    "click .start-btn": function (event) {
        listHelper.clickBtnStart()
    },
    "click .paus-btn": function (e) {
        listHelper.clickBtnPaus()
    },
    "click .stop-btn": function () {
        listHelper.clickBtnStop()
    },
    "input .added-task": function (event) {
        if ($(event.currentTarget).val())
            DBtasks.update(this._id, {$set: {title: $(event.currentTarget).val()}})
    },
    "input .note-block textarea": function (event) {
        if ($(event.currentTarget).val())
            DBtasks.update(this._id, {$set: {note: $(event.currentTarget).val()}})
    },
    "input .tag-block textarea": function (event) {
        listHelper.tag($(event.currentTarget).val(), this._id)
    },
    "keyup .add-new-task-input": function (event) {
        if (event.keyCode == 13)
            $('.add-new-task-btn').click()
    },
    "click .added-task-dop-btn": function (event) {
        listHelper.openAddedTask($(event.currentTarget).data('id'))
    },
    "click .added-task-star-btn": function (event) {
        DBtasks.update(this._id, {$set: {star: listHelper._isStar(this._id)}})
    },
    "change .added-task-checkbox input": function (event) {
        let isC = listHelper._isComplete(this._id)
        DBtasks.update(this._id, {$set: {complete: isC}})
        if (isC) {
            S.addCompleteTask()
        } else {

            S.removeCompleteTask()
        }
    },
});

