// const moment = require('moment');

module.exports = {
  format_date: (date) => {
    // return moment().format('l');

    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
};
