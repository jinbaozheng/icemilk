'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by cuppi on 2017/2/9.
 */

var homeUrl = exports.homeUrl = {
    main: '/appapi/main' // older
};

var cinemaUrl = exports.cinemaUrl = {
    detail: '/appapi/cinema/detail',
    comparepage: '/appapi/cinema/comparepage',
    screenings: '/appapi/cinema/screenings',
    screeningsdate: '/appapi/cinema/screeningsdate',
    screeningsitem: '/appapi/cinema/screeningsitem',
    realtimeseat: '/appapi/realtimeseats',
    list: '/appapi/cinema/list',
    //  分割
    cinemas: '/appapi/cinemas',
    cinemasbyregion: '/appapi/cinemasbyregion',
    cinemaspage: '/appapi/cinemaspage',
    collectcinema: '/appapi/collectcinema',
    cancelcollectcinema: '/appapi/cancelcollectcinema'
};

var cityUrl = exports.cityUrl = {
    citypage: '/appapi/main/citypage',
    //  分割
    refreshlocation: '/appapi/refreshlocation',
    cities: '/appapi/cities'
};

var filmUrl = exports.filmUrl = {
    detailInfo: '/appapi/film/detailInfo',
    list: '/appapi/film/list',
    //  分割
    hotfilms: '/appapi/hotfilms',
    hotfilmspage: '/appapi/hotfilmspage',
    waitfilmspage: '/appapi/waitfilmspage',
    film: '/appapi/film',
    compareprice: '/appapi/compareprice'
};

var filmViewUrl = exports.filmViewUrl = {
    filmview: '/appapi/filmview',
    foretelldates: '/appapi/foretelldates',
    filmviewitems: '/appapi/filmviewitems'
};

var mineUrl = exports.mineUrl = {
    userorders: '/appapi/userorders',
    collectedcinemalist: '/appapi/collectedcinemalist'
};

var seatUrl = exports.seatUrl = {
    wprealtimeseats: '/appapi/wprealtimeseats',
    sprealtimeseats: '/appapi/sprealtimeseats',
    mzrealtimeseats: '/appapi/mzrealtimeseats',
    dcrealtimeseats: '/appapi/dcrealtimeseats'
};

var accountUrl = exports.accountUrl = {
    login: '/appapi/login',
    logout: '/appapi/logout',
    verifycode: '/appapi/verifycode',
    register: '/appapi/register',
    updatepass: '/appapi/updatepass'
};

var tradeUrl = exports.tradeUrl = {
    lockseat: '/appapi/lockseat',
    applyticket: '/appapi/applyticket',
    prepay: '/appapi/prepay',
    //  分割
    wplockseat: '/appapi/wplockseat',
    splockseat: '/appapi/splockseat',
    mzlockseat: '/appapi/mzlockseat',
    dclockseat: '/appapi/dclockseat',
    wpapplyticket: '/appapi/wpapplyticket',
    spapplyticket: '/appapi/spapplyticket',
    mzapplyticket: '/appapi/mzapplyticket',
    dcapplyticket: '/appapi/dcapplyticket',
    cancelOrder: '/appapi/cancelOrder'
};

var otherUrl = exports.otherUrl = {
    hotquery: '/appapi/main/hotquery',
    banner: '/appapi/main/banner',
    pagebanners: '/tip/banner',
    //  分割
    wxMakePreOrder: '/appapi/wxMakePreOrder',
    search: '/appapi/search'
};