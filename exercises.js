const today = dayjs();
      const five = today.add(30,"days");
      const print = five.format('MMMM, D')
      const minusnine=today.subtract(30,"days");
      const printt=minusnine.format('dddd, MMMM, D');
      console.log(print);
      console.log(printt);

     export function isWeekend(date){
        const dayOfWeek = date.format('dddd');
        return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
      }

      let date = dayjs();
      console.log(date.format('dddd, MMMM D'));
      console.log(isWeekend(date) + " sick");

      date = dayjs().add(2, 'day');
      console.log(date.format('dddd, MMMM D'));
      console.log(isWeekend(date) + " sick");

      date = dayjs().add(9, 'day');
      console.log(date.format('dddd, MMMM D'));
      console.log(isWeekend(date) + " sick");

      date = dayjs().add(6, 'day');
      console.log(date.format('dddd, MMMM D'));
      console.log(isWeekend(date) + " sick");
