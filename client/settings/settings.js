settings = {

    start() {
        settings.events()
        settings.__checkNull()
    }, events() {

    },

    _addTest() {
        Meteor._localStorage.setItem("key", "value")
        settings._showTest()
    },
    _removeTest() {
        Meteor._localStorage.setItem("key", null)
        settings._showTest()
    },
    _showTest() {
        console.log(Meteor._localStorage.getItem("key"))
    },

    set(key, value) {
        Meteor._localStorage.setItem(key, value)
    },
    get(key) {
        return Meteor._localStorage.getItem(key)
    },
    remove(key) {
        Meteor._localStorage.setItem(key, null)
    },

    __toBool(v) {
        return v === "false" || v === "null" || v === "NaN" || v === "undefined" || v === "0" ? false : !!v
    },
    __checkNull(){
        if(settings.get('defaultRestTime') == null || settings.get('defaultRestTime') == '' || settings.get('defaultRestTime') < 1)
            settings.set('defaultRestTime', 5)
        if(settings.get('defaultWorkTime') == null || settings.get('defaultWorkTime') == '' || settings.get('defaultWorkTime') < 1)
            settings.set('defaultWorkTime', 25)
    }

}
settings.start()

Template.settings.events({
    "click #timerSoundOnOf": function () {
        if (event.target.checked) {
            settings.set('timerSoundOnOf', true)
        } else {
            settings.set('timerSoundOnOf', false)
        }
    },
    "click #clockTickingSoundOnOf": function () {
        if (event.target.checked) {
            settings.set('clockTickingSoundOnOf', true)
        } else {
            settings.set('clockTickingSoundOnOf', false)
        }
    },
    "keyup #defaultWorkTime": function () {
        settings.set('defaultWorkTime', event.target.value)
    },
    "keyup #defaultRestTime": function () {
        console.log(event.target.value)
        settings.set('defaultRestTime', event.target.value)
    }
})

Template.settings.helpers({
    "isTimerSoundOnOf": function () {
        return settings.__toBool(settings.get('timerSoundOnOf'))
    },
    "isClockTickingSoundOnOf": function () {
        return settings.__toBool(settings.get('clockTickingSoundOnOf'))
    },
    "defaultWorkTime": function () {
        return settings.get('defaultWorkTime')
    },
    "defaultRestTime": function () {
        return settings.get('defaultRestTime')
    }
})