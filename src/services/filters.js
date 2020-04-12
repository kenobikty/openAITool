import _moment from 'moment'
import Vue from 'vue'
import {get} from 'lodash'

let dateFormat = 'YYYY/MM/DD (ddd)'
let datetimeFormat = 'YYYY/MM/DD (ddd) HH:mm'
let timeFormat = 'HH:mm'
let defaultDecimals = 2
let defaultDollarSign = '$'

export {dateFormat, datetimeFormat, timeFormat, defaultDecimals, defaultDollarSign}

export function moment(v, format = datetimeFormat) {
  if (v == null) {
    return ''
  }
  return _moment(v).format(format)
}

export function relativeDateTime(v, format = datetimeFormat) {
  if (v == null) {
    return ''
  }
  const targetStart = +_moment(v).startOf('d')
  const nowStart = +_moment().startOf('d')
  if (targetStart == nowStart) {
    return '今日' + _moment(v).format(timeFormat)
  } else if (+_moment(targetStart).add(1, 'd') == nowStart) {
    return '昨日' + _moment(v).format(timeFormat)
  } else {
    return _moment(v).format(format)
  }
}

export function duration(v, format) {
  if (v == null) {
    return ''
  }
  return _moment.duration(v).format(format)
}

export function datePrettify(v, longFormat = datetimeFormat, now = new Date()) {
  if (v == null) {
    return ''
  }
  v = _moment(v)
  return Math.abs(v.diff(now, 'day', true)) > 2 ? v.format(longFormat) : v.from(now)
}

function parseDateRange(v, startProp, endProp) {
  if (v == null) {
    return false
  }
  const s = _moment(get(v, startProp, null))
  const e = _moment(get(v, endProp, null)).add(-1, 'ms')
  return {
    s: s.isValid() ? s : null,
    e: e.isValid() ? e : null,
  }
}

export function dateRange(v, startProp, endProp, pretty = true) {
  const {s, e} = parseDateRange(v, startProp, endProp)
  if (!s && !e) {
    return ''
  }
  const sD = s ? s.format(dateFormat) : ''
  const eD = e ? e.format(dateFormat) : ''
  if (pretty && sD === eD && sD) {
    return sD
  }
  return `${sD} - ${eD}`
}

export function timeRange(v, startProp, endProp) {
  const {s, e} = parseDateRange(v, startProp, endProp)
  if (!s && !e) {
    return ''
  }
  const sT = s ? s.format(timeFormat) : ''
  const eT = e ? e.format(timeFormat) : ''
  return `${sT} - ${eT}`
}

export function datetimeRange(v, startProp, endProp, pretty = true) {
  const {s, e} = parseDateRange(v, startProp, endProp)
  if (!s && !e) {
    return ''
  }
  const sD = s ? s.format(dateFormat) : ''
  const eD = e ? e.format(dateFormat) : ''
  // const sT = s ? s.format(timeFormat) : ''
  const eT = e ? e.format(timeFormat) : ''
  const sDT = s ? s.format(datetimeFormat) : ''
  const eDT = e ? e.format(datetimeFormat) : ''
  const exact = `${sDT} - ${eDT}`
  let short = sD
  if (sD !== eD) {
    short = exact
  } else {
    short = `${sDT} - ${eT}`
  }
  return pretty ? short : exact
}

export function currency(
  v,
  dollar = defaultDollarSign,
  decimals = defaultDecimals,
  accountingFormat = false,
) {
  if (v == null) {
    return ''
  }
  const display = dollar + Math.abs(v).toFixed(decimals)
  if (accountingFormat) {
    return signed(v, '({v})', ' {v} ', undefined, display)
  }
  return signed(v, undefined, undefined, undefined, display)
}

export function amount(
  v,
  dollar = defaultDollarSign,
  decimals = defaultDecimals,
  accountingFormat = false,
) {
  if (v == null) {
    return ''
  }
  const prefix = v.currency
    ? Vue.i18n.translate(
      `currencies.${v.currency.toLowerCase()}.shortcode`,
      v.currency.toUpperCase() + dollar,
    )
    : ''
  return currency(v.value, prefix, decimals, accountingFormat)
}

/**
 * format a value with specific +ve/-ve/0 templates
 * @param {*} value numeric value
 * @param {string} negative template
 * @param {string} positive template
 * @param {string} zero template
 * @param {string|*} displayValue string value to substitute
 * @returns {string|*}
 */
export function signed(
  value,
  negative = '-{v}',
  positive = '{v}',
  zero = '{v}',
  displayValue = Math.abs(value),
) {
  const sign = parseFloat(value)
  if (isNaN(sign)) {
    return value
  }
  const template = sign === 0 ? zero : sign < 0 ? negative : positive
  return template.replace(/{v}/g, String(displayValue))
}

export function round(v, decimals = defaultDecimals) {
  if (v == null) {
    return ''
  }
  const order = Math.pow(10, decimals)
  return Math.round(order * v) / order
}

export function siUnit(value, units, zeroIndex, base, decimals = defaultDecimals) {
  decimals = Math.pow(10, decimals)
  let order = Math.floor(Math.log(value) / Math.log(base))
  order = Math.min(Math.max(order + zeroIndex, 0), units.length - 1) - zeroIndex
  const round = Math.round((value / Math.pow(base, order)) * decimals) / decimals
  return `${round} ${units[order + zeroIndex]}`
}

export function byte(value, decimals = defaultDecimals) {
  return siUnit(value, ['B', 'KB', 'MB', 'GB', 'TB'], 0, 1024, decimals)
}

export function objectId(v) {
  if (v == null) {
    return ''
  }
  return v.substr(-6).toUpperCase()
}

export function status(v) {
  if (v == null) {
    return ''
  }
  v = v.split('$').reverse()[0]
  return Vue.i18n.translate('statuses.' + v, v[0].toUpperCase() + v.slice(1))
}

export function thousandSeparator(v) {
  if (v == null) {
    return ''
  }
  return Number(v).toLocaleString()
}

export function million(v) {
  if (v == null) {
    return ''
  }
  const d = v / 1000000
  return 'M  ' + Number(d).toLocaleString()
}

export function handleMinutes(v, format) {
  if (v == null) {
    return ''
  }
  let factor = 1
  if (format) {
    if (format === 'h') factor = 60
    if (format === 'd') factor = 60 * 24
  }
  const d = v / factor;
  return Number(d).toLocaleString()
}


