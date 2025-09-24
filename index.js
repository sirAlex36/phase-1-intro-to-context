// Your code here
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(arr) {
    return arr.map(createEmployeeRecord);
}

function createTimeInEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(' ');
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });
    return employee;
}

function createTimeOutEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(' ');
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });
    return employee;
}

function hoursWorkedOnDate(employee, soughtDate) {
    const timeIn = employee.timeInEvents.find(e => e.date === soughtDate);
    const timeOut = employee.timeOutEvents.find(e => e.date === soughtDate);
    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
    const hours = hoursWorkedOnDate(employee, date);
    return hours * employee.payPerHour;
}

function allWagesFor(employee) {
    const dates = employee.timeInEvents.map(e => e.date);
    const totalWages = dates.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
    return totalWages;
}

function calculatePayroll(employees) {
    return employees.reduce((total, emp) => total + allWagesFor(emp), 0);
}