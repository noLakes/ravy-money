
let budget = 30000;
let split = [0.5, 0.5];

const worker1 = {hours : 10, wage : 0, salary : 0}
const worker2 = {hours : 18, wage : 0, salary : 0}

//elements
const w1 = {
  hours : document.querySelector('.worker1 .hours'),
  wage : document.querySelector('.worker1 .wage'),
  salary : document.querySelector('.worker1 .salary'),
}

const w2 = {
  hours : document.querySelector('.worker2 .hours'),
  wage : document.querySelector('.worker2 .wage'),
  salary : document.querySelector('.worker2 .salary'),
}

const center = {
  budget : document.querySelector('.budget'),
  split : document.querySelector('.split'),
  p1 : document.querySelector('.p1'),
  p2 : document.querySelector('.p2'),
}

//functions
function round(num) {
  return Number(num.toFixed(2));
}

function salary(pcent, budget) {
  return budget * pcent;
}

function wage(salary, hours) {
  return Number(((salary / 52) / hours).toFixed(2)) ;
}

function maxSalary() {
  return budget;
}

function maxWage(hrs) {
  return (budget / 52) / hrs;
}

function calcSplit(sliderVal) {
  let p1 = (100 - sliderVal) / 100;
  let p2 = sliderVal / 100;
  split = [p1, p2];
}

function updateVals() {
  worker1.salary = salary(split[0], budget);
  worker1.wage = wage(worker1.salary, worker1.hours);
  worker2.salary = salary(split[1], budget);
  worker2.wage = wage(worker2.salary, worker2.hours);
}

function updateDisplay() {
  center.budget.value = budget;
  center.split.value = 100 * split[1];
  center.p1.innerHTML = round(split[0] * 100);
  center.p2.innerHTML = round(split[1] * 100);

  w1.hours.value = worker1.hours;
  w1.wage.value = round(worker1.wage);
  w1.wage.max = maxWage(w1.hours);
  w1.salary.value = round(worker1.salary);
  w1.salary.max = maxSalary();

  w2.hours.value = worker2.hours;
  w2.wage.value = round(worker2.wage);
  w2.wage.max = maxWage(w2.hours);
  w2.salary.value = round(worker2.salary);
  w2.salary.max = maxSalary();
}

function update(type='general', value=null, worker=null) {
  switch (type) {
    case 'wage':
      if(worker === 1) {
        worker1.wage = value;
        worker1.salary = (value * worker1.hours) * 52;
        worker2.salary = budget - worker1.salary;
        worker2.wage = (worker2.salary / 52) / worker2.hours;
        split[0] = Number((worker1.salary / budget).toFixed(2));
        split[1] = Number((1 - split[0]).toFixed(2));
      } else {
        worker2.wage = value;
        worker2.salary = (value * worker2.hours) * 52;
        worker1.salary = budget - worker2.salary;
        worker1.wage = (worker1.salary / 52) / worker1.hours;
        split[1] = Number((worker2.salary / budget).toFixed(2));
        split[0] = Number((1 - split[1]).toFixed(2));
      }
      break;
    case 'salary':
      if(worker === 1) {
        worker1.salary = value;
        worker1.wage = (worker1.salary / 52) / worker1.hours;
        worker2.salary = budget - worker1.salary;
        worker2.wage = (worker2.salary / 52) / worker2.hours;
        split[0] = Number((worker1.salary / budget).toFixed(2));
        split[1] = Number((1 - split[0]).toFixed(2));
      } else {
        worker2.salary = value;
        worker2.wage = (worker2.salary / 52) / worker2.hours;
        worker1.salary = budget - worker2.salary;
        worker1.wage = (worker1.salary / 52) / worker1.hours;
        split[1] = Number((worker2.salary / budget).toFixed(2));
        split[0] = Number((1 - split[1]).toFixed(2));
      }
      break;
    default:
      updateVals();
  }
  updateDisplay();
}

//add event listeners
w1.hours.addEventListener('change', (e) => {
  worker1.hours = Number(e.target.value);
  update();
})

w1.wage.addEventListener('change', (e) => {
  update('wage', Number(e.target.value), 1);
})

w1.salary.addEventListener('change', (e) => {
  update('salary', Number(e.target.value), 1);
})

w2.hours.addEventListener('change', (e) => {
  worker2.hours = Number(e.target.value);
  update();
})

w2.wage.addEventListener('change', (e) => {
  update('wage', Number(e.target.value), 2);
})

w2.salary.addEventListener('change', (e) => {
  update('salary', Number(e.target.value), 2);
})

center.budget.addEventListener('change', (e) => {
  budget = e.target.value;
  update();
})

center.split.oninput = function() {
  calcSplit(this.value);
  update();
}

//setup dom
update();





