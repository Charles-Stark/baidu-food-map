import request from "@/requests/request";

const ak = 'fnNTTwnc6Zu0T1rMTG0NvD9GFH17kKik'

export function getPlaceList(pageSize, currentPage) {
    return request({
        url: '/place/v2/search?query=美食&tag=美食&region=杭州&output=json&scope=2&ak=' + ak +
            '&page_size=' + pageSize + '&page_num=' + currentPage + "&center=30.327401,120.369036&filter=sort_name:distance|sort_rule:1",
        method: 'GET',
    })
}

export function getDetailedInfo(uid) {
    return request({
        url: 'place/v2/detail?uid=' + uid + '&output=json&scope=2&ak=' + ak,
        method: 'GET',
    })
}
