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
  { id: 5, name: "Вода", quantity: 1 }
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
// 1. Проверка возможности приготовления блюда
function needIngredientsForDish(dishes, ingredients, dishId) {
  let needIngredient = dishes.find((dish) => dishId === dish.id).ingredients;
  return ingredients
    .filter((ingredient) => needIngredient.includes(ingredient.id))
    .every((realIngredient) => realIngredient.quantity > 0)
}

// 2. Обновление запасов ингредиентов:
function updateIngredientsAfterDish(dishId, dishes, ingredients) {
  const dish = dishes.find((dish) => dish.id === dishId);
  if (needIngredientsForDish(dishes, ingredients, dishId)) {
    const needIngredient = dishes.find((dish) => dishId === dish.id).ingredients;
    alert(`Запасы для блюда ${dish.name} уменьшены`)
    return ingredients
      .filter((ingredient) => needIngredient.includes(ingredient.id))
      .forEach((realIngredient) => realIngredient.quantity--)
  }
};

// 3. Изменение статуса заказа:
function changeStatusOrder(orderId, newStatus, orders) {
  orders.find(order => order.orderId === orderId).status = newStatus;
  alert(`Статус заказа ${orderId} изменен на: ${newStatus}`)
};

// 4. Автоматическая обработка заказов
function processOrder(dishes, ingredients, orders) {
  orders.map((order) => {
    if (order.status === 'новый') {
      if (needIngredientsForDish(dishes, ingredients, order.dishId)) {
        updateIngredientsAfterDish(order.dishId, dishes, ingredients);
        changeStatusOrder(order.orderId, 'в процессе', orders)
      } else {
        changeStatusOrder(order.orderId, 'отменен из-за нехватки ингредиентов', orders)
      }

    }
  })
}
console.log(processOrder(dishes, ingredients, orders), ingredients, orders)
