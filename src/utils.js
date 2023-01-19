export const isFunction = (f) => f && typeof f === 'function';
export const removeEmojis = (str) => {
  const regex =
    /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
  return str.replace(regex, '');
};
export const dateDiff = (startDate, endDate, format) => {
  const _startDate = !!format && typeof startDate === 'string' ? startDate?.dateFromFormat?.(format) : startDate;
  const _endDate = !!format && typeof endDate === 'string' ? endDate?.dateFromFormat?.(format) : endDate;
  if (!_startDate?.getTime?.()) throw new Error('Invalid Start Date');
  if (!_endDate?.getTime?.()) throw new Error('Invalid End Date');

  return parseInt(
    (new Date(_endDate.getFullYear(), _endDate.getMonth(), _endDate.getDate()).getTime() -
      new Date(_startDate.getFullYear(), _startDate.getMonth(), _startDate.getDate()).getTime()) /
      1000 /
      60 /
      60 /
      24 +
      1
  );
};

export const checkDateDiff = (startDate, endDate, format) => {
  const _startDate = !!format && typeof startDate === 'string' ? startDate?.dateFromFormat?.(format) : startDate;
  const _endDate = !!format && typeof endDate === 'string' ? endDate?.dateFromFormat?.(format) : endDate;
  if (!_startDate?.getTime?.()) throw new Error('Invalid Start Date');
  if (!_endDate?.getTime?.()) throw new Error('Invalid End Date');
  return parseInt((_endDate.getTime() - _startDate.getTime()) / 1000 / 60 / 60 / 24);
};

export const checkTimeDiff = (startDate, endDate) => {
  return parseInt((endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60);
};

export const makeMonthPreset = (date, monthly = 0) => {
  date.setHours(0, 0, 0, 0);
  date.setDate(1);
  const startDate = new Date(date).add('m', monthly);
  const endDate = new Date(startDate).add('m', 1).add('d', -1);
  return {
    startDate,
    endDate,
    totalDates: dateDiff(startDate, endDate)
  };
};

export const splitByZero = (arr) => {
  let storage = [];
  return arr
    .reduce((p, c, i) => {
      if (c == 0) {
        p.push(storage);
        storage = [];
      }
      storage.push(c);
      if (arr.length - 1 == i) p.push(storage);
      return p;
    }, [])
    .filter((e) => e);
};

export const splitByWeekend = (startDate, endDate) => {
  let newArray = Array.from({ length: dateDiff(startDate, endDate) }, (_, i) => (startDate.getDay() + i) % 7);
  return splitByZero(newArray)
    .filter((e) => e && e.length > 0)
    .map((v, i, a) => {
      const constantIndex = i == 0 ? 0 : 1;
      const weekIndex = i <= 1 ? 0 : i - 1;

      const newStartDate =
        i == 0
          ? new Date(startDate)
          : new Date(startDate).add('d', (7 - startDate.getDay()) * constantIndex + 7 * weekIndex);
      const newEndDate =
        i == a.length - 1
          ? new Date(endDate)
          : new Date(newStartDate).add('d', 7 - new Date(newStartDate).getDay() - 1);
      return {
        startDate: newStartDate,
        endDate: newEndDate,
        length: dateDiff(newStartDate, newEndDate)
      };
    });
};

export const isDateInMonth = (sourceDate, startDate, endDate) => {
  if (!sourceDate || !startDate || !endDate) return null;

  const _sourceDate = new Date(sourceDate).setHours(0, 0, 0, 0);
  const _startDate = new Date(startDate).setHours(0, 0, 0, 0);
  const _endDate = new Date(endDate).setHours(0, 0, 0, 0);

  return _sourceDate >= _startDate && _sourceDate <= _endDate;
};

export const timer = (callback, time) => {
  return setTimeout(callback, time);
};
timer.kill = () => clearTimeout(timer);

export const interval = (callback, time) => {
  return setInterval(callback, time);
};
interval.kill = () => clearInterval(interval);
