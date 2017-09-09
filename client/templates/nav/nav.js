Template.nav.events({
    "click .nav li": function (e) {
        $('nav *').removeClass('active')
        $(e.currentTarget).addClass('active')
    }
})

nav = {

    goTo(name) {
        console.log(name)
        $('.list, .settings, .statistik').hide()
        $('.' + name).show()
    }

}