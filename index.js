const createEmployeeRecord = (employee) => {
  return {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: [],
  }
}

const createEmployeeRecords = (employees) => {
  return employees.map(employee => { return createEmployeeRecord(employee) });
}

const createTimeInEvent = (record, dateStamp) => {
  let [date, hour] = dateStamp.split(' ');
  record.timeInEvents.push({
    type: 'TimeIn',
    date: date,
    hour: parseInt(hour, 10),
  });
  return record;
}

const createTimeOutEvent = (record, dateStamp) => {
  let [date, hour] = dateStamp.split(' ');
  record.timeOutEvents.push({
    type: 'TimeOut',
    date: date,
    hour: parseInt(hour, 10),
  });
  return record;
}

const hoursWorkedOnDate = (record, date) => {
  let timeIn = record.timeInEvents.find(record => { return record.date  === date });
  let timeOut = record.timeOutEvents.find(record => { return record.date  === date });

  return (timeOut.hour - timeIn.hour) / 100;
}

const wagesEarnedOnDate = (record, date) => {
  return hoursWorkedOnDate(record, date) * record.payPerHour;
}

const allWagesFor = (record) => {
  let workDates = record.timeInEvents.map(record => { return record.date });
  return workDates.reduce((total, date) => { return total + wagesEarnedOnDate(record, date) }, 0);
}

const findEmployeeByFirstName = (srcArray, firstName) => {
  return srcArray.find(record => { return record.firstName === firstName });
}

const calculatePayroll = (records) => {
  return records.reduce((total, record) => { return total + allWagesFor(record) }, 0);
}