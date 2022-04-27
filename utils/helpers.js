const moment = require('moment');

module.exports = {
  format_date: () => {
    return moment().format('l');
  },
};
