export default class NavigationUtil {
  // 返回上一页
  static goBack() {}
  // 返回主页
  static resetToHomePage(params) {}
  // 跳转到指定页面
  static goPage(page, params) {
    this.navigation.navigate(page, params);
  }
}
