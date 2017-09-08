S = {

    date: 0,

    start() {
        S._getStartDayTime()
        S._addNewDayToDB()
    },

    events() {
    },

    _getStartDayTime() {
        S.date = new Date().setHours(0, 0, 0, 0)
    },
    _addNewDayToDB() {
        let dataInDB = DBstatistik.find({date: S.date}).fetch()
        if(dataInDB.length == 0){
            DBstatistik.insert({
                "date": S.date,
                "completeTask": 0, // int count
                "workedTime": 0, // int min
                "breakTime": 0 // int min
            })
        }
    },

    completeTask() {
        // DBtasks.update(this._id, {$set: {note: $(event.currentTarget).val()}})
    }

}

S.start()


// let db = DBstatistik.find({}).fetch()