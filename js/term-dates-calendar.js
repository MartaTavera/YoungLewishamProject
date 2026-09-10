// Term dates page — mini calendar generator
// Edit RANGES / BANK_HOLIDAYS below when next year's dates are published.
// Everything else (weekday layout, month lengths, leap years) is computed.

(function () {
    const RANGES = [
      { start: '2026-09-02', end: '2026-09-04', type: 'inset' },
      { start: '2026-09-07', end: '2026-10-23', type: 'term' },
      { start: '2026-10-26', end: '2026-10-30', type: 'half' },
      { start: '2026-11-02', end: '2026-12-18', type: 'term' },
      { start: '2026-12-21', end: '2027-01-01', type: 'holiday' },
  
      { start: '2027-01-04', end: '2027-01-04', type: 'inset' },
      { start: '2027-01-05', end: '2027-02-12', type: 'term' },
      { start: '2027-02-15', end: '2027-02-19', type: 'half' },
      { start: '2027-02-22', end: '2027-03-25', type: 'term' },
      { start: '2027-03-26', end: '2027-04-09', type: 'holiday' },
  
      { start: '2027-04-12', end: '2027-04-12', type: 'inset' },
      { start: '2027-04-13', end: '2027-05-28', type: 'term' },
      { start: '2027-05-31', end: '2027-06-04', type: 'half' },
      { start: '2027-06-07', end: '2027-07-22', type: 'term' },
    ];
  
    const BANK_HOLIDAYS = ['2027-05-03'];
  
    const MONTH_NAMES = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
  
    function iso(y, m, d) {
      return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    }
  
    function categoryFor(dateIso) {
      for (const r of RANGES) {
        if (dateIso >= r.start && dateIso <= r.end) return r.type;
      }
      return null;
    }
  
    function renderMonth(year, monthIdx) {
      const first = new Date(year, monthIdx, 1);
      const startDow = (first.getDay() + 6) % 7; // Monday = 0
      const numDays = new Date(year, monthIdx + 1, 0).getDate();
  
      let cells = '';
      for (let i = 0; i < startDow; i++) cells += `<div class="day empty"></div>`;
      for (let d = 1; d <= numDays; d++) {
        const dIso = iso(year, monthIdx, d);
        const dow = new Date(year, monthIdx, d).getDay();
        const isWeekend = dow === 0 || dow === 6;
        const cat = categoryFor(dIso);
        const isBank = BANK_HOLIDAYS.includes(dIso);
  
        let cls = 'day';
        if (isWeekend) cls += ' weekend';
        else if (cat) cls += ' ' + cat;
        if (isBank) cls += ' bank';
  
        cells += `<div class="${cls}">${d}</div>`;
      }
  
      return `<div class="month">
        <div class="month-name">${MONTH_NAMES[monthIdx]} ${year}</div>
        <div class="dow-row">${['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((x) => `<span>${x}</span>`).join('')}</div>
        <div class="days">${cells}</div>
      </div>`;
    }
  
    function fill(id, months) {
      const el = document.getElementById(id);
      if (el) el.innerHTML = months.map(([y, m]) => renderMonth(y, m)).join('');
    }
  
    document.addEventListener('DOMContentLoaded', function () {
      fill('cal-autumn', [[2026, 8], [2026, 9], [2026, 10], [2026, 11]]);
      fill('cal-spring', [[2027, 0], [2027, 1], [2027, 2], [2027, 3]]);
      fill('cal-summer', [[2027, 3], [2027, 4], [2027, 5], [2027, 6]]);
    });
  })();