// Задача: Система управления заказами в ресторане
// Цель: создать систему для управления заказами в ресторане. Ваша задача - разработать функционал для отслеживания заказов, учета запасов ингредиентов и обновления статуса заказов.
// Базовые требования:
// У вас есть массив объектов ingredients, где каждый объект представляет ингредиент с полями: id (уникальный идентификатор), name (название), и quantity (количество на складе).
// Есть массив объектов dishes, где каждый объект содержит id (уникальный идентификатор), name (название блюда), и ingredients (массив идентификаторов ингредиентов, необходимых для приготовления).
// Есть массив объектов orders, где каждый объект содержит orderId (уникальный идентификатор заказа), dishId (идентификатор заказанного блюда), и status (статус заказа, например, "новый", "в процессе", "готово", "отменено").
// Задачи:
//     1. Проверка возможности приготовления блюда: Напишите функцию, которая принимает dishId и проверяет, достаточно ли ингредиентов на складе для приготовления этого блюда. Функция должна возвращать true, если блюдо можно приготовить, и false - в противном случае.
//     2. Обновление запасов ингредиентов: Разработайте функцию, которая обновляет количество ингредиентов на складе после приготовления блюда.
//     3. Изменение статуса заказа: Создайте функцию, которая изменяет статус заказа в массиве orders на основе переданного orderId и нового статуса.
//     4. Автоматическая обработка заказов: Напишите функцию, которая автоматически обрабатывает все новые заказы, проверяя возможность их приготовления и, в случае возможности, обновляя запасы и статус заказа.
// Пример данных:
const ingredients = [
  { id: 1, name: "Томаты", quantity: 0 },
  { id: 2, name: "Моцарелла", quantity: 5 },
  { id: 3, name: "Базилик", quantity: 2 },
  { id: 4, name: "Чайный пакетик", quantity: 5 },
  { id: 5, name: "Вода", quantity: 5 }
];
const dishes = [
  { id: 1, name: "Маргарита", ingredients: [1, 2, 3] },
  { id: 2, name: "Чай", ingredients: [4, 5] }
];
const orders = [
  { orderId: 1, dishId: 1, status: "новый" },
  { orderId: 2, dishId: 2, status: "новый" },
  { orderId: 3, dishId: 2, status: "готов" }
];

// Требования к выполнению:
// Используйте циклы для обхода массивов.
// Примените условные конструкции для проверки наличия ингредиентов и изменения статусов заказов.
// Управляйте объектами для обновления их состояния в соответствии с логикой приложения.

// 1. Проверка возможности приготовления блюда: Напишите функцию, которая принимает dishId и проверяет, достаточно ли ингредиентов 
//на складе для приготовления этого блюда. Функция должна возвращать true, если блюдо можно приготовить, и false - в противном случае.
function needIngredientsForDish(dishId) {
  // вытаскиваем массив с ингредиентами, которые нужны для конкретного блюда
  let needIngredient;
  for (let i = 0; i < dishes.length; i++) {
    if (dishes[i].id === dishId) {
      needIngredient = dishes[i].ingredients
    }
  }
  console.log(needIngredient)
  // вытаскиваем массив с объектами, где хранятся остатки ингредиентов
  let needQuantityIngred = [];
  for (let i = 0; i < ingredients.length; i++) {
    if (needIngredient.includes(ingredients[i].id)) {
      needQuantityIngred.push(ingredients[i])
    }
  }
  console.log(needQuantityIngred)
  // проверка, чтобы нужные ингредиенты были больше 0
  let needQuantity = needQuantityIngred.every(ing => {
    return ing.quantity > 0;
  })
  console.log(needQuantity)
}
// needIngredientsForDish(2)

// 2. Обновление запасов ингредиентов: Разработайте функцию, которая обновляет количество ингредиентов на складе после приготовления блюда.
function updateIngredientsAfterDish(dishId) {
  // вытаскиваем массив с ингредиентами, которые нужны для конкретного блюда
  let needIngredient;
  for (let i = 0; i < dishes.length; i++) {
    if (dishes[i].id === dishId) {
      needIngredient = dishes[i].ingredients
    }
  }
  console.log(needIngredient)
  // вытаскиваем массив с объектами, где хранятся остатки ингредиентов
  let needQuantityIngred = [];
  for (let i = 0; i < ingredients.length; i++) {
    if (needIngredient.includes(ingredients[i].id)) {
      needQuantityIngred.push(ingredients[i])
    }
  }
  console.log(needQuantityIngred)
  //уменьшаем запасы на 1 в тех, которые нужны для блюда
  let newQuanity;
  newQuanity = needQuantityIngred.map((value) =>
    value.quantity = value.quantity - 1
  )
  return newQuanity
}
// updateIngredientsAfterDish(_)

// console.log(ingredients)
//  3. Изменение статуса заказа: Создайте функцию, которая изменяет статус заказа в массиве orders на основе переданного orderId
//  и нового статуса. status (статус заказа, например, "новый", "в процессе", "готово", "отменено")
function changeStatusOrder(orderIdent, newStatus) {
  let needOrder;
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].orderId === orderIdent) {
      needOrder = orders[i]
    }
  }
  needOrder.status = newStatus;
  return needOrder
}
// console.log(changeStatusOrder(_, 'в процессе'))

// 4. Автоматическая обработка заказов: Напишите функцию, которая автоматически обрабатывает все новые заказы, проверяя
//возможность их приготовления и, в случае возможности, обновляя запасы и статус заказа.
function processOrder(mass) {
  // let newOrders = mass.filter((value) => {
  //   value.status == 'новый'
  // });
  let newOrders = [];
  newOrders = mass.filter((value) => {
    return value.status == "новый";
  });
  console.log(newOrders);
  for (let i = 0; i < newOrders.length; i++) {
    let currentOrder = newOrders[i];
    // console.log(currentOrder);
    let currentDish = currentOrder.dishId;
    // console.log(currentDish);
    // вытаскиваем массив с ингредиентами, которые нужны для конкретного блюда
    let needIngredient;
    for (let i = 0; i < dishes.length; i++) {
      if (dishes[i].id === currentDish) {
        needIngredient = dishes[i].ingredients
      }
    }
    // console.log(needIngredient)
    // вытаскиваем массив с объектами, где хранятся остатки ингредиентов
    let needQuantityIngred = [];
    for (let i = 0; i < ingredients.length; i++) {
      if (needIngredient.includes(ingredients[i].id)) {
        needQuantityIngred.push(ingredients[i])
      }
    }
    // console.log(needQuantityIngred)
    // проверка, чтобы нужные ингредиенты были больше 0
    let needQuantity = needQuantityIngred.every(ing => {
      return ing.quantity > 0;
    })
    // console.log(needQuantity)
    // переход в статус отменен или в порцессе в зависиммости от остатков
    if (needQuantity == true) {
      let newQuanity;
      newQuanity = needQuantityIngred.map((value) =>
        value.quantity = value.quantity - 1
      )
      currentOrder.status = 'в процессе';
      alert(`Запас ингредиентов обновлен, заказ ${currentOrder.orderId} в процесс приготовления`);
    } else {
      alert(`Не хватает ингредиентов, заказ ${currentOrder.orderId} отменен`);
      currentOrder.status = 'отменен'
    }
  }
}
processOrder(orders)
console.log(orders)
console.log(ingredients)