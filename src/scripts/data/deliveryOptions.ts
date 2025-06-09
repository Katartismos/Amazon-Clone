import { LocalDate, DateTimeFormatter, DayOfWeek } from '@js-joda/core';
import { Locale as EnglishLocale } from '@js-joda/locale_en';

type deliveryOption = {
  id: string,
  deliveryDays: number,
  priceCents: number
}

export const deliveryOptions: deliveryOption[] = [
  {
    id: '1',
    deliveryDays: 7,
    priceCents: 0,
  }, {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
  }, {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
  }
];

export function getDeliveryOption(deliveryOptionId: string) {
  const deliveryOption = deliveryOptions.find(option => option.id === deliveryOptionId);

  return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption: deliveryOption): string {
  let remainingDays = deliveryOption.deliveryDays;
  let deliveryDate = LocalDate.now();

  while (remainingDays > 0) {
    deliveryDate = deliveryDate.plusDays(1);

    if (!isWeekend(deliveryDate)) {
      remainingDays--;
    }
  }

  const formatter = DateTimeFormatter.ofPattern('EEEE MMMM d').withLocale(EnglishLocale.ENGLISH);

  const dateString = deliveryDate.format(formatter);

  return dateString;
}

export function isWeekend(date: LocalDate): boolean {
  const day = date.dayOfWeek();
  return day === DayOfWeek.SATURDAY || day === DayOfWeek.SUNDAY;
}