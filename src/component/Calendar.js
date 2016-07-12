/**
 *  Class: Calendar
 *  Author: Niu Xiaoyu
 *  Date: 16/7/12.
 *  Description: 日历
 */
import React from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const weekdaysLong = {
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  cn: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
};
const weekdaysShort = {
  en: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  cn: ['日', '一', '二', '三', '四', '五', '六']
};
const months = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  cn: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
};
const firstDayOfWeek = {
  en: 0,
  cn: 0
};

const localeUtils = {
  formatDay: (d, locale = 'en') =>
    `${weekdaysLong[locale][d.getDay()]}, ${d.getDate()} ${months[locale][d.getMonth()]} ${d.getFullYear()}`,
  formatWeekdayShort: (index, locale = 'en') => weekdaysShort[locale][index],
  formatWeekdayLong: (index, locale = 'en') => weekdaysLong[locale][index],
  getFirstDayOfWeek: (locale) => firstDayOfWeek[locale],
  getMonths: (locale) => months[locale],
  formatMonthTitle: (d, locale) => `${months[locale][d.getMonth()]} ${d.getFullYear()}`,
};

export default class Calendar extends React.Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      selectedDay: new Date(this.props.selected),
    };

    this.handleDayClick = this.handleDayClick.bind(this);
  }

  handleDayClick(e, day, { selected, disabled }) {
    if (disabled) {
      return;
    }
    if (selected) {
      this.setState({selectedDay: null});
    } else {
      this.setState({selectedDay: day});
    }
  }

  todayBefore(day) {
    return !(day > new Date());
  }

  render() {
    return (
      <DayPicker
        locale="cn"
        localeUtils={localeUtils}
        disabledDays={DateUtils.isPastDay}
        selectedDays={day => DateUtils.isSameDay(this.state.selectedDay, day)}
        onDayClick={this.props.selectedCallback}
      />
    );
  }

}