export default class GetNext {
  constructor(select, set) {
    this.el = this.getEl(select); //选择元素触发加载分页的元素
    /*
     元素在可视区位置，符合其中一个条件就会触发加载机制
     */
    this.top = set.top || 0; //元素在顶部伸出的距离才加载
    this.right = set.right || 0; //元素在右边伸出的距离才加载
    this.bottom = set.bottom || 0; //元素在底部伸出的距离才加载
    this.left = set.left || 0; //元素在左边伸出的距离才加载
    /*
     回调方法
     */
    this.getNextData = set.getNextData;

    //监听的事件列表
    this.monitorEvent = ['DOMContentLoaded', 'load', 'click', 'touchstart', 'touchend', 'haschange', 'online', 'pageshow', 'popstate', 'resize', 'storage', 'mousewheel', 'scroll'];

    /*
     页面初始化
     */
    this.init();
  }

  /**
   * 初始化插件
   */
  init() {
    this.eachDOM = this.eachDOM.bind(this);
    this.start();
  }

  start() {
    //事件绑定
    const eventList = this.monitorEvent;
    for (let i = 0; i < eventList.length; i++) {
      window.addEventListener(eventList[i], this.eachDOM, false);
    }
    this.eachDOM();
  }
  /**
   * 卸载插件
   */
  end() {
    const eventList = this.monitorEvent;
    for (let i = 0; i < eventList.length; i++) {
      window.removeEventListener(eventList[i], this.eachDOM, false);
    }
  }

  /**
   * 遍历DOM查询是否符合加载条件
   */
  eachDOM() {
    let length = this.el.length;
    for (let i = 0; i < length; i++) {
      if (this.testMeet(this.el[i]) === true) {
        this.getNextData(this.el[i]);
        return;
      }

    }
  }
  /**
   * 检测元素是否在可视区
   * @param {object} el 检测的元素
   */
  testMeet(el) {
    let bcr = el.getBoundingClientRect(); //取得元素在可视区的位置
    let mw = el.offsetWidth; //元素自身宽度
    let mh = el.offsetHeight; //元素自身的高度
    let w = window.innerWidth; //视窗的宽度
    let h = window.innerHeight; //视窗的高度
    let boolX = (!((bcr.right - this.left) <= 0 && ((bcr.left + mw) - this.left) <= 0) && !((bcr.left + this.right) >= w && (bcr.right + this.right) >= (mw + w))); //上下符合条件
    let boolY = (!((bcr.bottom - this.top) <= 0 && ((bcr.top + mh) - this.top) <= 0) && !((bcr.top + this.bottom) >= h && (bcr.bottom + this.bottom) >= (mh + h))); //上下符合条件
    if (el.width != 0 && el.height != 0 && boolX && boolY) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * 获取元素
   * @param   {string} select 选择器
   * @returns {Array}    返回选择的元素
   */
  getEl(select) {
    switch (typeof select) {
      case 'string':
        return document.querySelectorAll(select);
      case 'object':
        if (Object.prototype.toString.call(select) === '[object Array]') {
          return select;
        } else {
          return [select];
        }
      default:
        return document.querySelectorAll(select);
    }
  }
}