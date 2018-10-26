'use strict';
import {
	TLocalStorage
} from "./TLocalStorage.js";
import {
	AJAXStorage
} from "./AJAXStorage.js";

//находим каждую кнопку
let getDrinkButton = document.getElementById('GET-DRINK'),
	showDrinkButton = document.getElementById('SHOW-DRINK'),
	delDrinkButton = document.getElementById('DEL-DRINK'),
	listDrinkButton = document.getElementById('LIST-DRINK'),

	getFoodButton = document.getElementById('GET-FOOD'),
	showFoodButton = document.getElementById('SHOW-FOOD'),
	delFoodButton = document.getElementById('DEL-FOOD'),
	listFoodButton = document.getElementById('LIST-FOOD');

//и вешаем на них обработчики по клику
getDrinkButton.onclick = () => {
	getInfo('drinks');
};
showDrinkButton.onclick = () => {
	showInfo('drinks');
};
delDrinkButton.onclick = () => {
	deleteItem('drinks');
};
listDrinkButton.onclick = () => {
	getList('drinks');
};

getFoodButton.onclick = () => {
	getInfo('food');
};
showFoodButton.onclick = () => {
	showInfo('food');
};
delFoodButton.onclick = () => {
	deleteItem('food');
};
listFoodButton.onclick = () => {
	getList('food');
};

let drinkLocalStorage = new TLocalStorage('drinks'),
	foodLocalStorage = new TLocalStorage('food'),

	drinkAJAXStorage = new AJAXStorage('DRINKS'),
	foodAJAXStorage = new AJAXStorage('FOOD');

function getInfo(type) {
	if (type === 'drinks') { //если это напиток
		let drinkName = prompt('Введите название напитка');
		if (drinkName) {
			let hasAlcoLocal = confirm('Напиток алкогольный?'),
				recipeLocal = prompt('Введите рецепт напитка');
			(hasAlcoLocal === true) ? hasAlcoLocal = 'Да': hasAlcoLocal = 'Нет';
			//вызываем метод чтобы добавить в локальный список
			drinkLocalStorage.addValue(drinkName, {
				'Алкоголь': hasAlcoLocal,
				'Рецепт': recipeLocal
			});
			//вызываем метод чтобы добавить на сервер
			drinkAJAXStorage.addValue(drinkName, {
				'Алкоголь': hasAlcoLocal,
				'Рецепт': recipeLocal
			});
		}
	} else { //если это еда
		let foodName = prompt('Введите название блюда');
		if (foodName) {
			let vegetableLocal = confirm('Блюдо вегетарианское?'),
				recipeLocal = prompt('Введите рецепт блюда');
			(vegetableLocal === true) ? vegetableLocal = 'Да': vegetableLocal = 'Нет';
			//вызываем метод чтобы добавить в список
			foodLocalStorage.addValue(foodName, {
				'Вегетарианское': vegetableLocal,
				'Рецепт': recipeLocal
			});
			//вызываем метод чтобы добавить на сервер
			foodAJAXStorage.addValue(foodName, {
				'Вегетарианское': vegetableLocal,
				'Рецепт': recipeLocal
			});
		}
	}
}

function showInfo(type) {
	if (type === 'drinks') {
		let drinkName = prompt('Введите название напитка'),
			hasAlcoLocal = drinkLocalStorage.getValue(drinkName)['Алкоголь'],
			recipeLocal = drinkLocalStorage.getValue(drinkName)['Рецепт'],
			hasAlcoAJAX = drinkAJAXStorage.getValue(drinkName)['Алкоголь'],
			recipeAJAX = drinkAJAXStorage.getValue(drinkName)['Рецепт'];

		if (drinkLocalStorage.getValue(drinkName)) {
			console.log(
				'Локальное хранилище:' +
				'\nНапиток: ' + drinkName +
				'\nалкогольный: ' + hasAlcoLocal +
				'\nрецепт приготовления: ' + recipeLocal);
			//если отменили ввод, то ничего не делаем
		} else if (drinkName === null) {
			//если нет такого напитка
		} else {
			console.log('Нет такого напитка в локальном хранилище');
		}

		if (drinkAJAXStorage.getValue(drinkName)) {
			console.log(
				'Данные в хранилище на сервере:' +
				'\nНапиток: ' + drinkName +
				'\nалкогольный: ' + hasAlcoAJAX +
				'\nрецепт приготовления: ' + recipeAJAX);
			//если отменили ввод, то ничего не делаем
		} else if (drinkName === null) {
			//если нет такого напитка
		} else {
			console.log('Нет такого напитка в хранилище на сервере');
		}

	} else {
		let foodName = prompt('Введите название блюда'),
			vegetableLocal = foodLocalStorage.getValue(foodName)['Вегетарианское'],
			recipeLocal = foodLocalStorage.getValue(foodName)['Рецепт'],
			vegetableAJAX = foodAJAXStorage.getValue(foodName)['Вегетарианское'],
			recipeAJAX = foodAJAXStorage.getValue(foodName)['Рецепт'];

		if (foodLocalStorage.getValue(foodName)) {
			console.log(
				'Локальное хранилище:' +
				'\nБлюдо: ' + foodName +
				'\nвегетарианское: ' + vegetableLocal +
				'\nрецепт приготовления: ' + recipeLocal);
		} else if (foodName === null) {} else {
			console.log('Нет такого блюда в локальном хранилище');
		}

		if (foodAJAXStorage.getValue(foodName)) {
			console.log(
				'Данные в хранилище на сервере:' +
				'\nБлюдо: ' + foodName +
				'\nвегетарианское: ' + vegetableAJAX +
				'\nрецепт приготовления: ' + recipeAJAX);
		} else if (foodName === null) {} else {
			console.log('Нет такого блюда в хранилище на сервере');
		}
	}

}

function deleteItem(type) {
	if (type === 'drinks') {
		let drinkName = prompt('Введите название напитка'),
			resultOfLocalDel = drinkLocalStorage.deleteValue(drinkName),
			resultOfAJAXDel = drinkAJAXStorage.deleteValue(drinkName);

		(drinkName === null) ? {} : (resultOfLocalDel) ?
		console.log(`Напиток ${drinkName} удалён из локального хранилища`):
			console.log('Нет такого напитка чтобы удалить из локального хранилища');

		(drinkName === null) ? {} : (resultOfAJAXDel) ?
		console.log(`Напиток ${drinkName} удалён из хранилища на сервере`):
			console.log('Нет такого напитка чтобы удалить с хранилища на сервере');

	} else {
		let foodName = prompt('Введите название блюда'),
			resultOfLocalDel = foodLocalStorage.deleteValue(foodName),
			resultOfAJAXDel = foodAJAXStorage.deleteValue(foodName);

		(foodName === null) ? {} : (resultOfLocalDel) ?
		console.log(`Блюдо ${foodName} удалено из локального хранилища`):
			console.log('Нет такого блюда чтобы удалить с хранилища на сервере');

		(foodName === null) ? {} : (resultOfAJAXDel) ?
		console.log(`Блюдо ${foodName} удалено из локального хранилища`):
			console.log('Нет такого блюда чтобы удалить с хранилища на сервере');
	}

}


function getList(type) {
	if (type === 'drinks') {
		let listofLocalStorage = drinkLocalStorage.getKeys(),
			listofAJAXStorage = drinkAJAXStorage.getKeys();
		console.log(
			'Сервер: ' + listofAJAXStorage +
			'\nЛокальное хранилище: ' + listofLocalStorage);
	} else {
		let listofLocalStorage = foodLocalStorage.getKeys(),
			listofAJAXStorage = foodAJAXStorage.getKeys();
		console.log(
			'Сервер: ' + listofAJAXStorage +
			'\nЛокальное хранилище: ' + listofLocalStorage);
	}

}