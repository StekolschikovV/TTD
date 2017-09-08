S = {

    date: 0,
    tempDB: '',

    start() {
        console.log('%c S.start()', 'background:blue;color:#fff;padding:2px 10px 2px 5px')

        S._getStartDayTime()
        S._addNewDayToDB()
        S.tempDB = DBstatistik.find().fetch()
    },

    events() {},

    _getStartDayTime() {
        console.log('%c S._getStartDayTime()', 'background:blue;color:#fff;padding:2px 10px 2px 5px')

        S.date = new Date().setHours(0, 0, 0, 0)
    },
    _addNewDayToDB() {
        console.log('%c S._addNewDayToDB()', 'background:blue;color:#fff;padding:2px 10px 2px 5px')

        let dataInDB = DBstatistik.find({date: S.date}).fetch()
        if (dataInDB.length == 0) {
            DBstatistik.insert({
                "date": S.date,
                "completeTask": 0, // int count
                "workedTime": 0, // int min
                "breakTime": 0 // int min
            })
        }
    },
    _showDay(){
        console.log(DBstatistik.findOne({date: S.date}))
    },

    addCompleteTask() {
        console.log('%c S.completeTask()', 'background:blue;color:#fff;padding:2px 10px 2px 5px')

        DBstatistik.update(DBstatistik.findOne({date: S.date})._id, {$inc: {completeTask: 1}})
    },
    removeCompleteTask(){
        console.log('%c S.removeCompleteTask()', 'background:blue;color:#fff;padding:2px 10px 2px 5px')

        DBstatistik.update(DBstatistik.findOne({date: S.date})._id, {$inc: {completeTask: -1}})
    },
    addWorkedTime(time) {
        console.log('%c S.completeTask()', 'background:blue;color:#fff;padding:2px 10px 2px 5px')

        DBstatistik.update(DBstatistik.findOne({date: S.date})._id, {$inc: {workedTime: time}})
    },
    addBreakTime(time) {
        console.log('%c S.completeTask()', 'background:blue;color:#fff;padding:2px 10px 2px 5px')

        DBstatistik.update(DBstatistik.findOne({date: S.date})._id, {$inc: {breakTime: time}})
    }

}


$(document).ready(function () {
    setTimeout(function () {
        S.start()
    }, 3000)
})

Template.statistik.helpers({
    "test": function () {
        console.log('test')
        return 'test'
    },
    "statistikLine": function () {
        let arr = DBstatistik.find().fetch()
        for ( let i = 0; i < arr.length; i++){

            let data = new Date(arr[i].date)
            arr[i].date = `${data.getDay()}.${data.getMonth()}.${data.getFullYear()}`
        }
        return arr
    },
})


