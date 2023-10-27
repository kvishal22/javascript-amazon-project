import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions=[{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
},{
  id: '2',
  deliveryDays: 5,
  priceCents: 49
},{
  id:'3',
  deliveryDays: 1,
  priceCents: 99
}];

export function getDeliveryOption(deliveryOptionId){
  let deliveryOption;

      deliveryOptions.forEach((option)=>{
          if(option.id===deliveryOptionId){
            deliveryOption=option;
          }
      });
      return deliveryOption;
}

export function calculateDeliveryDate(deliveryOption) {
  const today = dayjs();
  let deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
  let dateString = deliveryDate.format('dddd, MMMM D');
  
  if (isWeekend(deliveryDate)) {
    if (deliveryDate.format('dddd') === 'Saturday') {
      deliveryDate = deliveryDate.add(2, 'days');
    } else if (deliveryDate.format('dddd') === 'Sunday') {
      deliveryDate = deliveryDate.add(1, 'days');
    }
    dateString = deliveryDate.format('dddd, MMMM D');
  }

  return dateString;
}
export function isWeekend(date){
  const dayOfWeek = date.format('dddd');
  return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}