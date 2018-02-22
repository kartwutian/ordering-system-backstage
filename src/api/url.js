
function filter(url) {
    return '/order' + url;
}

export default {
    sendSms: filter('/web/login/register/sendSms'),
    register: filter('/web/login/register/user'),
    login: filter('/web/login/login/loginAction'),
    logout: filter('/web/login/login/logout'),
    upFiles: filter('/upload/uploadData'),
    updateShop: filter('/web/client/business/updateBusiness'),
    getShopInfo: filter('/web/client/business/queryBusinessByUserId'),
    getInitData: filter('/web/client/menu/queryInitData'),
    getCategoryList: filter('/web/client/menu/queryMenuCategoryLists'),
    addTheCategory: filter('/web/client/menu/addMenuCategory'),
    addGoods: filter('/web/client/menu/addMenu'),
    getGoodsList: filter('/web/client/menu/queryMenuList'),
    getGoodsListByCategory: filter('/web/client/menu/queryMenuCategoryById'),
    deleteTheCategory: filter('/web/client/menu/deleteMenuCategory'),
    updateTheCategory: filter('/web/client/menu/updateMenuCategory'),

    initMenu: filter('/web/client/menu/queryInitData'),
    addGoods: filter('/web/client/menu/addMenu'),
    updateGoods: filter('/web/client/menu/updateMenu'),
    deleteGoods: filter('/web/client/menu/deleteMenu'),
    addDesk: filter('/web/client/desk/addDesk'),
    getDeskList: filter('/web/client/desk/queryDeskList'),
    deleteDeskList: filter('/web/client/desk/deleteDeskById'),

}
