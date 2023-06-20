import request from "@/requests/request";

// const ak = 'fdjLW98yyX2vP5ndvu7hynahuDQp9wsh'
const ak = 'fnNTTwnc6Zu0T1rMTG0NvD9GFH17kKik'

export function getPlaceList(pageSize, currentPage) {
    return request({
        url: '/place/v2/search?query=美食&tag=美食&region=杭州&output=json&scope=2&ak=' + ak +
            '&page_size=' + pageSize + '&page_num=' + currentPage + "&city_limit=true",
        method: 'GET',
    })
}

export function getDetailedInfo(uid) {
    return request({
        url: 'place/v2/detail?uid=' + uid + '&output=json&scope=2&ak=' + ak,
        method: 'GET',
    })
}
