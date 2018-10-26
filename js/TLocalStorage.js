'use strict';
export class TLocalStorage {
	constructor(name) {
		this._nameStorage = name;
		//если в локальном хранилище нет такого ключа, то создаём
		//со значением пустого объекта, иначе ничего не делаем
		if (!localStorage[this._nameStorage]) {
			localStorage[this._nameStorage] = '{}';
		}

	}
	addValue(key, value) {
		//читаем из локального хранилища
		let storage = JSON.parse(localStorage[this._nameStorage]);
		//добавляем информацию в массив
		storage[key] = value;
		//сохраняем информацию в локальном хранилище
		localStorage[this._nameStorage] = JSON.stringify(storage);
	}
	getValue(key) {
		//читаем из локального хранилища
		let storage = JSON.parse(localStorage[this._nameStorage]);
		if (key in storage) {
			//если ключ есть, то возвращаем его значение
			return storage[key];
		} else {
			return false;
		}
	}
	deleteValue(key) {
		//читаем из локального хранилища
		let storage = JSON.parse(localStorage[this._nameStorage]);
		if (key in storage) {
			//если ключ есть, то удаляем его и перезаписываем
			//изменённый список в локальное хранилище
			delete storage[key];
			localStorage[this._nameStorage] = JSON.stringify(storage);
			return true;
		} else {
			return false;
		}
	}
	getKeys() {
		let storage = JSON.parse(localStorage[this._nameStorage]);
		if (Object.keys(storage).length === 0) {
			return 'В базе нет данных';
		} else {
			return Object.keys(storage);
		}

	}
}