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
  cn: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
};
const weekdaysShort = {
  cn: ['日', '一', '二', '三', '四', '五', '六']
};
const months = {
  cn: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
};
const firstDayOfWeek = {
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
  }

  isComingDay(day) {
    return day > new Date();
  }

  render() {
    const props = this.props;
    return (
      <DayPicker
        locale="cn"
        localeUtils={localeUtils}
        //disabledDays={DateUtils.isPastDay}
        disabledDays={DateUtils.isPastDay}
        selectedDays={day => DateUtils.isSameDay(this.state.selectedDay, day)}
        onDayClick={this.props.selectedCallback}
      />
    );
  }

}